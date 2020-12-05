module.exports = {
    publicPath: './',
    lintOnSave: false,
    pwa: {
        iconPaths: {
            favicon32: 'favicon.ico',
            favicon16: 'favicon.ico',
            appleTouchIcon: 'favicon.ico',
            maskIcon: 'favicon.ico',
            msTileImage: 'favicon.ico'
        }
    },
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'btn-primary-bg': '#0870fe',
                    'btn-primary-color': '#fff'
                },
                javascriptEnabled: true
            }
        }
    },
    transpileDependencies: ['ant-design-vue'],
    devServer: {
        port: 9000,
        https: false,
        open: true
    }
};
