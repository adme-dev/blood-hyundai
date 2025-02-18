const CompressionPlugin = require('compression-webpack-plugin');
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

const COMPRESSION_TEST = /\.(js|css|html|svg)$/;
const COMPRESSION_THRESHOLD = 10240;
const COMPRESSION_MIN_RATIO = 0.8;

const createCompressionPlugin = (filename, algorithm, compressionOptions = {}) => {
  return new CompressionPlugin({
    filename: filename,
    algorithm: algorithm,
    test: COMPRESSION_TEST,
    threshold: COMPRESSION_THRESHOLD,
    minRatio: COMPRESSION_MIN_RATIO,
    compressionOptions: compressionOptions,
  });
};

module.exports = {
  runtimeCompiler: true,
  productionSourceMap: false,

  configureWebpack: (config) => {
    if (process.env.NODE_ENV === 'production') {
      config.plugins.push(
        createCompressionPlugin('[path].gz[query]', 'gzip'),
        createCompressionPlugin('[path].br[query]', 'brotliCompress', { level: 11 }),

        new ImageMinimizerPlugin({
          minimizerOptions: {
            plugins: [
              ['gifsicle', { interlaced: true }],
              ['jpegtran', { progressive: true }],
              ['optipng', { optimizationLevel: 5 }],
              ['svgo', { plugins: [{ removeViewBox: false }] }],
              ['imagemin-mozjpeg', { quality: 75 }],
            ],
          },
          loader: true,
        }),

        // HardSourceWebpackPlugin for caching
        new HardSourceWebpackPlugin()
      );
    }
  },

  chainWebpack: (config) => {
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    config.optimization.splitChunks({
      chunks: 'async',
      minChunks: 2,
      name: 'commons',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
        styles: {
          name: 'styles',
          test: /\.css$/,
          chunks: 'all',
          enforce: true,
        },
      },
    });

    config.performance
      .maxAssetSize(244 * 1024)
      .maxEntrypointSize(244 * 1024);

    config.plugin('html').tap((args) => {
      args[0].title = process.env.VUE_APP_TITLE;

      if (process.env.NODE_ENV === 'production') {
        args[0].minify = {
          minifyCSS: true,
          minifyJS: true,
          minifyURLs: true,
          removeComments: true,
          collapseWhitespace: true,
          collapseBooleanAttributes: true,
          removeScriptTypeAttributes: true,
          removeAttributeQuotes: true,
          removeEmptyAttributes: true,
          removeStyleLinkTypeAttributes: true,
        };
      }

      return args;
    });

    
    config.optimization.usedExports(true);

    config.output
      .filename('[name].js')
      .chunkFilename('js/[name].js');

    // Adjusting preload plugin
    if (config.plugins.has('preload')) {
      config.plugin('preload').tap((args) => {
        args[0].include = 'initial';
        return args;
      });
    }

    // Adjusting prefetch plugin
    if (config.plugins.has('prefetch')) {
      config.plugin('prefetch').tap((options) => {
        options[0].fileBlacklist = options[0].fileBlacklist || [];
        options[0].fileBlacklist.push(/myasyncRoute(.)+?\.js$/);
        return options;
      });
    }

  },
};
