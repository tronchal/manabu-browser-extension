import { context } from 'esbuild';
import { WebSocketServer } from 'ws';
import { execSync } from 'node:child_process';
import { WS_PORT, srcDir, distDir, entryHTML, buildConfig } from './config.js';
import { injectHotReload } from './inject-hotreload.js';
import fs from 'node:fs';
import path from 'node:path';

// Inject hot reload client script to index.html
function injectHotReloadToIndex() {
    const html = fs.readFileSync(path.join(srcDir, entryHTML), 'utf-8');
    const injectedHTML = injectHotReload(html, WS_PORT);
    fs.writeFileSync(path.join(distDir, entryHTML), injectedHTML);
}

export async function serve() {
    injectHotReloadToIndex();
    // Create WebSocket server for hot reload
    const wsServer = new WebSocketServer({ port: WS_PORT });
    const clients = [];
    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf-8'));
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

    const ctx = await context(buildConfig);
    await ctx.watch();
    await ctx.serve({ servedir: distDir });
    console.log('Started dev server at http://localhost:8000');

    // Watch for file changes in the destination folder
    fs.watch(distDir, { recursive: true }, (eventType, file) => {
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
    // Watch for source changes
    fs.watch(srcDir, { recursive: true }, (eventType, file) => {
        if (file?.endsWith('.css')) {
            console.log(`Processing file ${file}`);
            execSync(pkg.scripts['build:css']);
        // Watch for changes in the main HTML
        } else if (file === entryHTML) {
            injectHotReloadToIndex();
        // Copy assets
        } else if (file?.endsWith('.html')) {
            fs.copyFileSync(path.join(srcDir, file), path.join(distDir, path.basename(file)));
            // Trigger CSS if a Tailwind class has been modified
            execSync(pkg.scripts['build:css']);
        }
    });
}
