module.exports = {
    devServer: {
        disableHostCheck: true,
        proxy: {
            "/": {
                target: 'https://api.example.com',
                secure: false
            }
        }
    }
}