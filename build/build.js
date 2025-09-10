import { build } from 'esbuild';
import { serve } from './serve.js';
import { distDir, buildConfig } from './config.js';
import fs from 'node:fs';
import path from 'node:path';

const args = process.argv.slice(2); // Skip first two default arguments
const doServe = args.indexOf('--serve') > -1;

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

// Copy assets
fs.globSync('src/**/*.html')
    .forEach((file) => {
        fs.copyFileSync(file, path.join(distDir, path.basename(file)));
    });
fs.copyFileSync('node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm', path.join(distDir, 'sqlite3.wasm'));

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
