import { build } from 'esbuild';
import { serve } from './serve.js';
import { distDir, buildConfig } from './config.js';
import fs from 'node:fs';

const args = process.argv.slice(2); // Skip first two default arguments
const doServe = args.indexOf('--serve') > -1;
const devExtension = args.indexOf('--extension') > -1;
const isProd = process.env.NODE_ENV === 'production';

// Create dist directory if it doesn't exist
if (!fs.existsSync(distDir)) {
    fs.mkdirSync(distDir, { recursive: true });
}

if (doServe) {
    serve(devExtension);
}
else {
    console.log('[JS] Build process started...');
    let result = await build({
        ...buildConfig,
        sourcemap: !isProd,
        minify: isProd,
    });
    console.log('[JS] Built finished', result);
}
