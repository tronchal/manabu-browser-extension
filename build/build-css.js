import fs from 'node:fs';
import path from 'node:path';
import fsextra from 'fs-extra';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import { srcDir, distDir } from './config.js';

fs.globSync(path.join(srcDir, '**', '*.css'))
    .forEach(async (inputFile) => {
        const file = fs.readFileSync(inputFile, 'utf8');
        const outputFile = inputFile.replace(srcDir + path.sep, distDir + path.sep);
        console.log('[PostCSS] Processing file', inputFile);  // eslint-disable-line no-console
        const result = await postcss([tailwindcss])
            .process(file, { from: inputFile, to: outputFile });
        await fsextra.ensureDir(path.dirname(outputFile));
        fs.writeFileSync(outputFile, result.css);
        if (result.map) {
            fs.writeFileSync(outputFile + '.map', result.map.toString())
        }
        console.log('[PostCSS] Generated file', outputFile);  // eslint-disable-line no-console
    });
