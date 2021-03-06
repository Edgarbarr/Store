module.exports = {
    entry: "./client/src/index.jsx",
    output: {
        path: __dirname + "/client/dist",
        filename: "bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [ "@babel/preset-env", "@babel/preset-react" ]
                }
            }
        ]
    }
}