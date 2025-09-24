import fs from 'node:fs';
import path from 'node:path';
import fsextra from 'fs-extra';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';
import { srcDir, distDir } from './config.js';

const isProd = process.env.NODE_ENV === 'production';

fs.globSync(path.join(srcDir, '**', '*.css'))
    .forEach(async (inputFile) => {
        const file = fs.readFileSync(inputFile, 'utf8');
        const outputFile = inputFile.replace(srcDir + path.sep, distDir + path.sep);
        const result = await postcss([
            tailwindcss,
            isProd ? cssnano : null
        ].filter(Boolean))
            .process(file, { from: inputFile, to: outputFile });
        await fsextra.ensureDir(path.dirname(outputFile));
        fs.writeFileSync(outputFile, result.css);
        if (result.map) {
            fs.writeFileSync(outputFile + '.map', result.map.toString())
        }
        console.log('[CSS] Generated file', outputFile);  // eslint-disable-line no-console
    });
