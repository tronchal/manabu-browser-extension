import tailwindcss from '@tailwindcss/postcss';
import cssnano from 'cssnano';

/** @type {import('postcss-load-config').Config} */
export default {
    plugins: [
        tailwindcss,
        cssnano({
            preset: 'default'
        })
    ]
};
