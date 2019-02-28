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

        // TODO: Uglify cannot minify ES6 code
        // https://github.com/webpack/webpack/issues/2972#issuecomment-261705632
        ...(ENV === 'production'
            ? [require('rollup-plugin-uglify').uglify()]
            : []),
    ],
};
