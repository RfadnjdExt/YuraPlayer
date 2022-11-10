const path = require('path')

module.exports = {
    devServer: {
        static: {
            directory: path.join(__dirname, 'public')
        },
        compress: true,
        port: 9000
    },
    devtool: 'inline-source-map',
    entry: './src/js/index.ts',
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"]
            }
        ]
    },
    output: {
        filename: 'yuraPlayer.js',
        path: path.resolve(__dirname, 'dist')
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    }
}