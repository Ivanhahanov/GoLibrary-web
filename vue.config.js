module.exports = {
    devServer: {
        proxy: {
            "/": {
                target: 'https://api.example.com',
                secure: false
            }
        }
    }
}