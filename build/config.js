import { join } from 'node:path';

export const WS_PORT = 3000;
export const srcDir = 'src';
export const distDir = 'dist';
export const entryHTML = 'index.html';
export const assetsDir = 'assets';
export const buildConfig = {
    entryPoints: [join(srcDir, 'main.ts')],
    outdir: distDir,
    bundle: true,
    sourcemap: true,
    minify: false,
    format: 'esm',
    target: 'es2022'
};
