### TQC Wallet Desktop Apps

<br/>

## Install

First, clone the repo via git:

```bash
git clone --depth=1 https://github.com/veritas-shine/TQC-Wallet.git
```

And then install dependencies with npm.

```bash
$ cd TQC-Wallet
$ npm i
```
**Note**: If you can't install electron-chromedriver, see [here](https://github.com/electron/chromedriver).

## Run

Start the app in the `dev` environment. 

```bash
$ npm run dev
```

Alternatively, you can run the renderer and main processes separately. This way, you can restart one process without waiting for the other. Run these two commands **simultaneously** in different console tabs:

```bash
$ npm run start-renderer-dev
$ npm run start-main-dev
```

## Packaging

To package apps for the local platform:

```bash
$ npm run package
```

To package apps for all platforms:

First, refer to [Multi Platform Build](https://www.electron.build/multi-platform-build) for dependencies.

Then,
```bash
$ npm run package-all
```

To package apps with options:

```bash
$ npm run package -- --[option]
```

To run End-to-End Test

```bash
$ npm run build
$ npm run test-e2e
```

:bulb: You can debug your production build with devtools by simply setting the `DEBUG_PROD` env variable:
```bash
DEBUG_PROD=true npm run package
```

## License
MIT © [Veritas Shine](https://github.com/veritas-shine)

