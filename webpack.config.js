const path = require('path');

module.exports = {
    mode: "development", // "production" | "development" | "none"
    // Chosen mode tells webpack to use its built-in optimizations accordingly.
    entry: "./src/game.ts", // string | object | array
    // defaults to ./src
    // Here the application starts executing
    // and webpack starts bundling
    output: {
        path: path.resolve(__dirname, "dist"), // string
        filename: "game.js", // string
    },
    module: {
        // configuration regarding modules
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        // options for resolving module requests
        // (does not apply to resolving to loaders)
        modules: [
            "node_modules",
            path.resolve(__dirname, "src")
        ],
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    devtool: "source-map", // enum
    plugins: [
        // ...
    ],
}