import { build } from 'esbuild';
import { serve } from './serve.js';
import { srcDir, distDir, assetsDir, buildConfig } from './config.js';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2); // Skip first two default arguments
const doServe = args.indexOf('--serve') > -1;

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy assets
fs.globSync(path.join(srcDir, '**', '*.html'))
    .forEach((file) => {
        fs.copyFileSync(file, path.join(distDir, path.basename(file)));
    });
fs.copyFileSync('node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm', path.join(distDir, 'sqlite3.wasm'));
fs.cpSync(path.join(srcDir, assetsDir), path.join(distDir, assetsDir), { recursive: true });

if (doServe) {
    serve();
}
else {
    console.log('Build process started...');
    let result = await build({
        ...buildConfig,
        sourcemap: false,
        minify: true,
    });
    console.log('Built finished', result);
}
