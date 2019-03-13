import nodeResolve from 'rollup-plugin-node-resolve';
import commonJs from 'rollup-plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import babel from 'rollup-plugin-babel';

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
        nodeResolve({ browser: true }),
        commonJs({ include: /node_modules/ }),

        typescript({
            rollupCommonJSResolveHack: true,
        }),

        babel({
            exclude: 'node_modules/**',
        }),
    ],
};
