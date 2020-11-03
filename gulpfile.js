const pkg = require('./package.json');
const yargs = require('yargs');
const tailwindcss = require('tailwindcss');
require('dotenv').config({
  path: 'presentation.env'
});

const { rollup } = require('rollup');
const { terser } = require('rollup-plugin-terser');
const babel = require('@rollup/plugin-babel').default;
const commonjs = require('@rollup/plugin-commonjs');
const resolve = require('@rollup/plugin-node-resolve').default;

const gulp = require('gulp');
const zip = require('gulp-zip');
const gulpif = require('gulp-if');
const workbox = require('workbox-build');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const header = require('gulp-header');
const minify = require('gulp-clean-css');
const connect = require('gulp-connect');
const autoprefixer = require('gulp-autoprefixer');
const concat = require('gulp-concat');
const browserSync = require('browser-sync').create();
const nodemon = require('gulp-nodemon');

const root = yargs.argv.root || '.';
const port = yargs.argv.port || 8000;

const banner = `/*!
* reveal.js ${pkg.version}
* ${pkg.homepage}
* MIT licensed
*
* Copyright (C) 2020 Hakim El Hattab, https://hakim.se
*/\n`;

// Prevents warnings from opening too many test pages
process.setMaxListeners(20);

const babelConfig = {
  babelHelpers: 'bundled',
  ignore: ['node_modules'],
  compact: false,
  extensions: ['.js', '.html'],
  plugins: ['transform-html-import-to-string'],
  presets: [
    [
      '@babel/preset-env',
      {
        corejs: 3,
        useBuiltIns: 'usage',
        modules: false
      }
    ]
  ]
};

// Our ES module bundle only targets newer browsers with
// module support. Browsers are targeted explicitly instead
// of using the "esmodule: true" target since that leads to
// polyfilling older browsers and a larger bundle.
const babelConfigESM = JSON.parse(JSON.stringify(babelConfig));
babelConfigESM.presets[0][1].targets = {
  browsers: [
    'last 2 Chrome versions',
    'not Chrome < 60',
    'last 2 Safari versions',
    'not Safari < 10.1',
    'last 2 iOS versions',
    'not iOS < 10.3',
    'last 2 Firefox versions',
    'not Firefox < 60',
    'last 2 Edge versions',
    'not Edge < 16'
  ]
};

let cache = {};

// Creates a bundle with broad browser support, exposed
// as UMD
gulp.task('js-es5', () => {
  return rollup({
    cache: cache.umd,
    input: './assets/js/index.js',
    plugins: [resolve(), commonjs(), babel(babelConfig), terser()]
  }).then((bundle) => {
    cache.umd = bundle.cache;
    return bundle.write({
      name: 'Reveal',
      file: './dist/reveal.js',
      format: 'umd',
      banner: banner,
      sourcemap: false
    });
  });
});

// Creates an ES module bundle
gulp.task('js-es6', () => {
  return rollup({
    cache: cache.esm,
    input: './assets/js/index.js',
    plugins: [resolve(), commonjs(), babel(babelConfigESM), terser()]
  }).then((bundle) => {
    cache.esm = bundle.cache;
    return bundle.write({
      file: './dist/reveal.esm.js',
      format: 'es',
      banner: banner,
      sourcemap: false
    });
  });
});
gulp.task('js', gulp.parallel('js-es5', 'js-es6'));

// Creates a UMD and ES module bundle for each of our
// built-in plugins
gulp.task('plugins', () => {
  return Promise.all(
    [
      {
        name: 'RevealHighlight',
        input: './plugin/highlight/plugin.js',
        output: './dist/plugin/highlight/highlight'
      },
      {
        name: 'RevealMarkdown',
        input: './plugin/markdown/plugin.js',
        output: './dist/plugin/markdown/markdown'
      },
      {
        name: 'RevealSearch',
        input: './plugin/search/plugin.js',
        output: './dist/plugin/search/search'
      },
      {
        name: 'RevealNotes',
        input: './plugin/notes/plugin.js',
        output: './dist/plugin/notes/notes'
      },
      {
        name: 'RevealChartJS',
        input: './plugin/chart/plugin.js',
        output: './dist/plugin/chart/chart'
      },
      {
        name: 'RevealParticles',
        input: './plugin/particles.js/plugin.js',
        output: './dist/plugin/particles.js/particles'
      },
      {
        name: 'RevealZoom',
        input: './plugin/zoom/plugin.js',
        output: './dist/plugin/zoom/zoom'
      },
      {
        name: 'RevealMath',
        input: './plugin/math/plugin.js',
        output: './dist/plugin/math/math'
      },
      {
        name: 'Client',
        input: './plugin/server/client.js',
        output: './dist/plugin/server/client'
      },
      {
        name: 'Guest',
        input: './plugin/server/guest.js',
        output: './dist/plugin/server/guest'
      },
      {
        name: 'Admin',
        input: './plugin/server/admin.js',
        output: './dist/plugin/server/admin'
      }
    ].map((plugin) => {
      return rollup({
        cache: cache[plugin.input],
        input: plugin.input,
        plugins: [
          resolve({ browser: true }),
          commonjs(),
          babel({
            ...babelConfig,
            ignore: [/node_modules\/(?!(highlight\.js|marked)\/).*/]
          }),
          terser()
        ]
      }).then((bundle) => {
        cache[plugin.input] = bundle.cache;
        bundle.write({
          file: `${plugin.output}.esm.js`,
          name: plugin.name,
          format: 'es'
        });

        bundle.write({
          file: `${plugin.output}.js`,
          name: plugin.name,
          format: 'umd'
        });
      });
    })
  );
});

gulp.task('css-themes-plugins', () =>
  gulp
    .src([
      'node_modules/highlight.js/scss/monokai.scss',
      'node_modules/highlight.js/scss/zenburn.scss'
    ])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify({ compatibility: 'ie9' }))
    .pipe(gulp.dest('./dist/plugin/highlight'))
);

gulp.task('css-themes-fonts', () =>
  gulp
    .src(['./assets/css/theme/source/fonts/**/*'])
    .pipe(
      gulpif((file) => {
        return file.extname === '.css';
      }, minify({ compatibility: 'ie9' }))
    )
    .pipe(gulp.dest('./dist/theme/fonts'))
);

gulp.task(
  'css-themes',
  gulp.series('css-themes-fonts', () =>
    gulp
      .src(['./assets/css/theme/source/*.{sass,scss}'])
      .pipe(sass())
      .pipe(autoprefixer())
      .pipe(minify({ compatibility: 'ie9' }))
      .pipe(gulp.dest('./dist/theme'))
  )
);

gulp.task('css-themes-stream', () =>
  gulp
    .src(['./assets/css/theme/source/*.{sass,scss}'])
    .pipe(sass())
    .pipe(gulp.dest('./dist/theme'))
    .pipe(browserSync.stream())
);

gulp.task('css-core', () =>
  gulp
    .src(['./assets/css/reveal.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify({ compatibility: 'ie9' }))
    .pipe(header(banner))
    .pipe(gulp.dest('./dist'))
);

gulp.task('css-custom', () =>
  gulp
    .src([
      './assets/css/custom.scss',
      './assets/css/helper.scss',
      './assets/css/reset.scss'
    ])
    .pipe(sass())
    .pipe(postcss([tailwindcss()]))
    .pipe(autoprefixer())
    .pipe(minify({ compatibility: 'ie9' }))
    .pipe(concat('custom.css'))
    .pipe(gulp.dest('./dist'))
);

gulp.task('css-custom-stream', () =>
  gulp
    .src([
      './assets/css/custom.scss',
      './assets/css/helper.scss',
      './assets/css/reset.scss'
    ])
    .pipe(sass())
    .pipe(postcss([tailwindcss()]))
    .pipe(autoprefixer())
    .pipe(minify({ compatibility: 'ie9' }))
    .pipe(concat('custom.css'))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.stream())
);

gulp.task('css-server', () =>
  gulp
    .src(['./assets/css/server.scss'])
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(minify({ compatibility: 'ie9' }))
    .pipe(gulp.dest('./dist'))
);

gulp.task(
  'css',
  gulp.parallel(
    'css-themes',
    'css-core',
    'css-custom',
    'css-server',
    'css-themes-plugins'
  )
);

gulp.task('generate-service-worker', () => {
  return workbox
    .generateSW({
      globDirectory: './',
      globPatterns: [
        'dist/**/*.{png,js,json,css,svg,jpg,jpeg,gif,ttf,woff,eot}'
      ],
      runtimeCaching: [
        {
          urlPattern: new RegExp(process.env.REVEAL_URL),
          handler: 'StaleWhileRevalidate'
        }
      ],
      swDest: `./sw.js`,
      clientsClaim: true,
      skipWaiting: true,
      sourcemap: false,
      maximumFileSizeToCacheInBytes: 4194304
    })
    .then(({ warnings }) => {
      // In case there are any warnings from workbox-build, log them.
      for (const warning of warnings) {
        console.warn(warning);
      }
      console.info('Service worker generation completed.');
    })
    .catch((error) => {
      console.warn('Service worker generation failed:', error);
    });
});

gulp.task('image', async () => {
  return gulp.src('./assets/img/**/*').pipe(gulp.dest('./dist/img'));
});

gulp.task('video', async () => {
  return gulp.src('./assets/video/**/*').pipe(gulp.dest('./dist/video'));
});

gulp.task(
  'default',
  gulp.series(
    gulp.parallel('js', 'css', 'plugins', 'image', 'video'),
    'generate-service-worker'
  )
);

gulp.task(
  'build',
  gulp.parallel(
    'js',
    'css',
    'plugins',
    'image',
    'video',
    'generate-service-worker'
  )
);

gulp.task(
  'package',
  gulp.series('default', () =>
    gulp
      .src([
        './index.html',
        './dist/**',
        './lib/**',
        './images/**',
        './plugin/**',
        './**.md'
      ])
      .pipe(zip('reveal-js-presentation.zip'))
      .pipe(gulp.dest('./'))
  )
);

gulp.task('reload', () => gulp.src(['*.html', '*.md']).pipe(connect.reload()));
gulp.task('nodemon', (cb) => {
  let started = false;
  return nodemon({
    script: './plugin/server'
  }).on('start', () => {
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task(
  'serve',
  gulp.series('nodemon', () => {
    browserSync.init(null, {
      proxy: 'http://localhost:1947',
      browser: 'google chrome',
      port: 9000
    });
    gulp.watch(['*.html', '*.md']).on('change', browserSync.reload);
    gulp
      .watch(['./assets/js/**'], gulp.series('js'))
      .on('change', browserSync.reload);
    gulp
      .watch(['plugin/**/plugin.js'], gulp.series('plugins'))
      .on('change', browserSync.reload);
    gulp.watch(
      [
        './assets/css/theme/source/*.{sass,scss}',
        './assets/css/theme/template/*.{sass,scss}'
      ],
      gulp.series('css-themes-stream')
    );
    gulp.watch(
      [
        './assets/css/custom.scss',
        './assets/css/helper.scss',
        './assets/css/reset.scss'
      ],
      gulp.series('css-custom-stream')
    );
  })
);
