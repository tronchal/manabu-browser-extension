import { context } from 'esbuild';
import { WebSocketServer } from 'ws';
import { execSync } from 'node:child_process';
import { WS_PORT, srcDir, distDir, assetsDir, entryHTML, buildConfig } from './config.js';
import { injectHotReload } from './inject-hotreload.js';
import fs from 'node:fs';
import path from 'node:path';
import chokidar from 'chokidar';

// Inject hot reload client script to index.html
function injectHotReloadToIndex() {
    const html = fs.readFileSync(path.join(srcDir, entryHTML), 'utf-8');
    const injectedHTML = injectHotReload(html, WS_PORT);
    fs.writeFileSync(path.join(distDir, entryHTML), injectedHTML);
}

export async function serve(devExtension) {
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));

    if (!devExtension) {
        injectHotReloadToIndex();
        // Create WebSocket server for hot reload
        const wsServer = new WebSocketServer({ port: WS_PORT });
        const clients = [];
        wsServer.on('connection', (ws) => {
            console.log('[Hot Reload] Client connected');
            clients.push(ws);
            ws.on('close', () => {
                console.log('[Hot Reload] Client disconnected');
                const index = clients.indexOf(ws);
                if (index > -1) {
                    clients.splice(index, 1);
                }
            });
        });

        // Watch for file changes in the destination folder
        chokidar.watch(distDir, {ignoreInitial: true}).on('all', (e, file) => {
            if (file) {
                console.log(`[Hot Reload] File changed: ${file}`);
                // Notify all clients to reload
                clients.forEach(client => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send('reload');
                    }
                });
            }
        });
    }

    const ctx = await context(buildConfig);
    await ctx.watch();
    await ctx.serve({ servedir: distDir });
    console.log('Started dev server at http://localhost:8000');
    // Watch for source changes
    chokidar.watch('.', {ignoreInitial: true, cwd: srcDir}).on('all', (e, file) => {
        const fileSrc = path.join(srcDir, file);
        console.log(e, fileSrc);  // eslint-disable-line no-console
        if (file?.endsWith('.css')) {
            execSync(`${pkg.scripts['build:css']} ${fileSrc}`);
        // Watch for changes in the main HTML
        } else if (file === entryHTML && !devExtension) {
            injectHotReloadToIndex();
        // Copy assets
        } else if (file?.endsWith('.html')) {
            fs.copyFileSync(fileSrc, fileSrc.replace(srcDir + path.sep, distDir + path.sep));
            // Trigger CSS if a Tailwind class has been modified
            execSync(pkg.scripts['build:css']);
        } else if (file?.includes(`${assetsDir}${path.sep}`)) {
            fs.copyFileSync(fileSrc, path.join(distDir, file));
        }
    });
}
