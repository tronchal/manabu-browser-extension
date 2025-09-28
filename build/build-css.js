import fs from 'node:fs';
import path from 'node:path';
import fsextra from 'fs-extra';
import postcss from 'postcss';
import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';
import { srcDir, distDir, componentsDir, entryHTML } from './config.js';

const isProd = process.env.NODE_ENV === 'production';
const args = process.argv.slice(2); // Skip first two default arguments

let indexHtml = fs.readFileSync(path.join(distDir, entryHTML), 'utf-8');

async function buildFile(filepath) {
    const file = fs.readFileSync(filepath, 'utf8');
    const outputFile = filepath.replace(srcDir + path.sep, distDir + path.sep);
    const result = await postcss([
        tailwindcss,
        isProd ? cssnano : null
    ].filter(Boolean))
        .process(file, { from: filepath, to: outputFile });

    if (isProd && filepath.includes(path.join(componentsDir, path.sep))) {
        const component = path.basename(filepath, path.extname(filepath));
        const m = indexHtml.match(new RegExp(`(<${component}[^>]*?>).*?(<\/${component}>)`, 's'));
        if (m) {
            indexHtml = indexHtml.replace(m[0], `${m[1]}<template>${result.css}</template>${m[2]}`);
            console.log(`[CSS] Injected CSS into component <${component}>`);
        }
    } else {
        await fsextra.ensureDir(path.dirname(outputFile));
        fs.writeFileSync(outputFile, result.css);
        if (result.map) {
            fs.writeFileSync(outputFile + '.map', result.map.toString())
        }
        console.log('[CSS] Generated file', outputFile);  // eslint-disable-line no-console
    }
}

const inputFiles = args.length ? args : fs.globSync(path.join(srcDir, '**', '*.css'));
await Promise.all(inputFiles.map((filepath) => buildFile(filepath)));
if (isProd) {
    fs.writeFileSync(path.join(distDir, entryHTML), indexHtml);
}

