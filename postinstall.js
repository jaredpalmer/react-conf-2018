'use strict';

/**
 * create-react-app-typescript currently has issues with absolute imports, see:
 *   https://github.com/wmonk/create-react-app-typescript/issues/122
 *
 * As a workaround, this monkeypatch modifies webpack, jest, and tsconfig to ensure that the
 * src/common folder is a shared absolute import path usable throughout the app.
 */

const fs = require('fs');
const path = require('path');

const paths = {
  webpackDev: path.resolve(
    `./node_modules/react-scripts/config/webpack.config.dev.js`
  ),
  webpackProd: path.resolve(
    `./node_modules/react-scripts/config/webpack.config.prod.js`
  ),
  jestConfig: path.resolve(
    `./node_modules/react-scripts/scripts/utils/createJestConfig.js`
  ),
};

function patchFile(file, fn) {
  const config = fs.readFileSync(file, 'utf8');
  fs.writeFileSync(file, fn(config), 'utf8');
}

// Patches
function modifyWebpackAlias(webpackConfig) {
  if (!webpackConfig.includes(`alias: {'@common':`)) {
    webpackConfig = webpackConfig.replace(
      `alias: {`,
      `alias: {'@common': paths.appSrc,`
    );
  }
  return webpackConfig;
}

function modifyWebpackPlugins(webpackConfig) {
  if (
    !webpackConfig.includes(
      '// new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),'
    )
  ) {
    webpackConfig = webpackConfig.replace(
      `new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),`,
      `// new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),`
    );
  }
  return webpackConfig;
}

function modifyJestModulePath(jestConfig) {
  if (!jestConfig.includes(`modulePaths: ['src/'],`)) {
    jestConfig = jestConfig.replace(
      `moduleNameMapper: {`,
      `modulePaths: ['src/'],
      moduleNameMapper: {
        "@common/(.*)": "<rootDir>/src/$1",`
    );
  }
  if (!jestConfig.includes(`'modulePaths',`)) {
    jestConfig = jestConfig.replace(
      `'snapshotSerializers',`,
      `'snapshotSerializers',
       'modulePaths',`
    );
  }
  return jestConfig;
}

patchFile(paths.webpackDev, modifyWebpackAlias);
patchFile(paths.webpackProd, modifyWebpackAlias);
patchFile(paths.webpackDev, modifyWebpackPlugins);
patchFile(paths.webpackProd, modifyWebpackPlugins);
patchFile(paths.jestConfig, modifyJestModulePath);
console.log('Done patching react-scripts!');
