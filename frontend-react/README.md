## Frontend Design + React

---

### React Vanilla Install

1. Initialize package management with `npm init`. We are using NPM but there are other options avalible. Follow the default prompts, customizing where you see fit. This will generate a `package.json`.

2. Install dependancies `npm i`:
    - React - Modern frontend library
      - `react`
      - `react-dom`
    - Webpack - Bundles JS files into a single file (see `frontend-vanilla` for why this matters)
      - `webpack`
      - `webpack-cli`
    - Babel
      - `@babel/core`
      - `@babel/preset-env`
      - `@babel/preset-react`
      - `babel-loader`
    - CSS Loaders
      - `css-loader`
      - `style-loader`

3. Create a foundational file structure in our root directory.
    - `/src`
    - `/public`

4. Create an `index.html` file within `/public` and an entry file `index.js` within `/src`. These files form the foundation of our React app.
   
5. Navigate to `/public/index.html` and populate it with a simple HTML structure. Within the `body` tag, add a single `div` with `id='root`, this should look familiar. Put some text within the tags, I went with `Hello World` because I'm very creative.

6. Add a `start` script to our `package.json`. This will allow us to spin up our frontend with a single command. 

    ~~~js
    // package.json
        "scripts": {
            // ...
           "start": "webpack -w --mode=development",
            // ...
        },
    ~~~
    
7. Create a `webpack.config.js` file in root `/` and configure as follows. Keeping in mind, there is no magic happening here, it's just JavaScript.

    ~~~js
        const path = require('path');

        module.exports = {
          context: __dirname,
          entry: path.resolve(__dirname, './src/index.js'),
          output: {
            path: path.resolve(__dirname, './public'),
            filename: 'bundle.js',
          },
          module: {
            rules: [
              {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                  loader: 'babel-loader',
                  query: {
                    presets: ['@babel/env', '@babel/react']
                  },
                },
              },
            ]
          },
        };

    ~~~