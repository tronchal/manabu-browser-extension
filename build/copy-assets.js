import { srcDir, distDir, assetsDir } from './config.js';
import fs from 'node:fs';
import path from 'node:path';
import fsextra from 'fs-extra';

function copyFileToDist(filepath, outputFile) {
    outputFile ??= path.join(distDir, path.basename(filepath));
    fs.copyFileSync(filepath, outputFile || outputFile);
    console.log('[Assets] Asset copied to', outputFile);
}

fs.globSync(path.join(srcDir, '**', '*.html'))
    .forEach(async (file) => {
        const outputFile = file.replace(srcDir + path.sep, distDir + path.sep);
        await fsextra.ensureDir(path.dirname(outputFile));
        copyFileToDist(file, outputFile);
    });
copyFileToDist('node_modules/@sqlite.org/sqlite-wasm/sqlite-wasm/jswasm/sqlite3.wasm');
copyFileToDist('manifest.json');
fs.cpSync(path.join(srcDir, assetsDir), path.join(distDir, assetsDir), { recursive: true });
console.log('[Assets] Copied folder to', path.join(distDir, assetsDir));
