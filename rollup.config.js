const { ENV } = process.env;

export default {
    input: './src/index.ts',
    output: {
        name: 'ModifyElement',
        file: './dist/modify-element.js',
        format: 'iife',
        sourcemap: ENV !== 'production',
    },
    watch: {
        clearScreen: false,
    },
    plugins: [
        require('rollup-plugin-node-resolve')({
            browser: true,
        }),
        require('rollup-plugin-commonjs')({
            include: /node_modules/,
        }),

        require('rollup-plugin-typescript2')({
            rollupCommonJSResolveHack: true,
        }),

        ...(ENV === 'production'
            ? [require('rollup-plugin-uglify').uglify()]
            : []),
    ],
};
