const path = require('path');

module.exports = {
  // Deployment base directory
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',
  // Output directory for built files
  outputDir: 'dist',
  // Directory for static assets
  assetsDir: 'assets',
  // Disable source maps in production
  productionSourceMap: false,
  // Configure webpack-dev-server behavior
  devServer: {
    allowedHosts: ['all'], // Changed to array format
    port: 8080,
    host: 'localhost',
    https: false,
    open: true,
    proxy: {
      '/api': {
        target: process.env.VUE_APP_API_URL || 'http://localhost:3000',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  },
  // Configure webpack
  configureWebpack: {
    // Set performance hints
    performance: {
      hints: process.env.NODE_ENV === 'production' ? 'warning' : false,
      maxEntrypointSize: 512000,
      maxAssetSize: 512000
    },
    // Configure resolve aliases
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src'),
        '@components': path.resolve(__dirname, 'src/components'),
        '@views': path.resolve(__dirname, 'src/views'),
        '@assets': path.resolve(__dirname, 'src/assets'),
        '@utils': path.resolve(__dirname, 'src/utils')
      }
    },
    // Optimize splitting
    optimization: {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 250000
      }
    }
  },
  // Configure css
// Update this section in your config
css: {
  sourceMap: process.env.NODE_ENV !== 'production',
  loaderOptions: {
    sass: {
      prependData: `
        @use "sass:math";
        @use "sass:color";
        @use "@/assets/styles/_variables.scss" as *;
        @use "@/assets/styles/_mixins.scss" as *;
      `
    }
  }
},
  // Configure chain webpack
  chainWebpack: config => {
    // Set document title from environment variable
    config
      .plugin('html')
      .tap(args => {
        args[0].title = process.env.VUE_APP_TITLE;
        return args;
      });
    // Remove prefetch plugin
    config.plugins.delete('prefetch');
    // Configure SVG loader
    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
      .options({
        svgo: {
          plugins: [{ removeViewBox: false }]
        }
      });
    // Add compression for production
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compression').use(require('compression-webpack-plugin'), [{
        filename: '[path][base].gz',
        algorithm: 'gzip',
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
      }]);
    }
  }
};