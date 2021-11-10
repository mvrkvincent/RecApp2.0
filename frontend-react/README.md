# Frontend Design + React
---

## React Vanilla Install

> "No Magic, Just JavaScript"

1. Initialize package management with `npm init`. We are using NPM but there are other options available. Follow the default prompts, customizing where you see fit. This will generate a `package.json`.

2. Install dependencies `npm i`:
    - React - Modern frontend library
      - `react`
      - `react-dom`
    - Webpack - Bundles JS files into a single file (see `frontend-vanilla` for why this matters)
      - `webpack`
      - `webpack-cli`
      - `webpack-dev-server --save-dev`
    - Babel
      - `@babel/core`
      - `@babel/preset-env`
      - `@babel/preset-react`
      - `babel-loader`
    - CSS Loaders - Bundle CSS together with the components that require it. Eliminating the need for style scripts in your `index.html`. Again, see `frontend-vanilla` for the foundational concepts. 
      - `css-loader`
      - `style-loader`

3. Add a `dev` script to our `package.json`. This will allow us to spin up our frontend with a single command `npm run dev`. 

    ~~~js
    // package.json
        "scripts": {
            // ...
            "dev": "webpack serve --config ./webpack.config.js --mode development",
            // ...
        },
    ~~~
    
4. Create a `webpack.config.js` file in root `/` and configure as follows. Keeping in mind, there is no magic happening here, it's just JavaScript.

    ~~~js
    // /webpack.config.js

        const path = require('path');

        module.exports = {
          context: __dirname,
          // your entry file is the single js file from which all others will be accessed, think of it like a root node. 
          entry: path.resolve(__dirname, './src/index.js'),
          // once packed by Webpack, the resulting "bundle" will be a single, publicly accessible file.
          output: {
            path: path.resolve(__dirname, './public'),
            filename: 'bundle.js',
          },
          // Webpack will run a development server through which your files will be viewable in the browser. The server will find your application's JS bundle in ./public.
          devServer: {
            static: path.resolve(__dirname, './public'),
          },
          module: {
            // we must tell Webpack how to read the various JS files we create. since React uses a special flavor of JS we know as JSX, it must be translated into the most basic JS syntax. This is true of some features of newer JS versions as well such as ES2021^. 
            rules: [
              {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/env', '@babel/react']
                  },
                },
              },
              // as mentioned earlier, css files will need to be bundled via our style loaders.
              { 
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
              }
            ]
          },
          // resolve the file extensions we will use in this application.
          resolve: {
            extensions: [".js", ".jsx", "*"]
          },
        };

    ~~~


5. At this stage, let's run our start script and navigate to the open port on your browser of choice (Chrome, it's Chrome). (NB: Check Webpacks terminal output for your port number, mine is `8080`). `Hello World` should appear. You will also notice that a `bundle.js` file has appeared in `/public`. You will be tempted to think this is magic, it is not, Webpack has simply executed the `output` key of your `webpack.config.js` file.

6. Return to your `/public/index.html` file and replace `index.js` with `bundle.js` in your script tag. 

7. Now, let's utilize the `React` library to generate HTML for us. Let's create a new directory `components` and add a new file `App.js` as our primary component.

    ~~~js
    // /src/components/App.js

        import React from 'react';
       
        export const App = () => {
           // The primary benefit of React is its ability to return HTML elements from JS functions, abstracting away the likes of `document.append()`.
          return <div className="App">Hello World (Now w/ 100% more React!)</div>
        };

    ~~~


8.  Now, let's modify `/src/index.js`, this time using React to assemble the nodes of our DOM Tree for us and insert the result between the opening and closing tags of our `root` div.  

    ~~~js
    // /src/index.js

        import React from 'react';
        import ReactDOM from 'react-dom';
        import {App} from './components/App';

        document.addEventListener('DOMContentLoaded', () => {
          // ReactDOM has a render() function that takes 2 arguments: 1. A single JSX element from which all of our other JSX elements will extend, and 2. a single HTML element within which our JSX element will be inserted. 
          ReactDOM.render(<App />, document.getElementById('root'));
        });

    ~~~

9.  Finally, check your browser. You may need to kill your server and restart, but if all has gone to plan `Hello World` will be replaced by `Hello World (Now w/ 100% more React!)` 

Congratulations - You're a wizard `${firstName}` ! Or at least the wizard that is `create-react-app`. 

## Adding Functionality

The core feature of our application allows users to Create, Read, and Destroy a Question. We will use React to help us generate the visual elements that allow users to interact with this functionality. 

Before we build out our components, let's head back to `./App.js` and plan out the overall architecture and business logic of our application.

1. Since our application currently only renders one set of data, we will start by storing our questions in a simple array. I've added some seed data to get us started.

      ~~~js
          // /src/components/App.js

          // ...

          const [questions, setQuestions] = useState([
            { _id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
            { _id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
            { _id: 3, name: 'Paul Atreides', content: 'Why are my dreams so sandy?' },
          ]);

        // ...

      ~~~


2. Next let's create some functions that carry out the *action* of CR(U)D'ing our Questions. In this case, adding and removing questions from our `questions` array.  

      ~~~js
          // /src/components/App.js
          
          // ...

          // since our questions live within the App component itself, there is no need for a READ action.

          const submitQuestion = question => {
            setQuestions([...questions, question]);
          };

         const deleteQuestion = _id => {
           setQuestions(questions.filter(question => question._id !== _id));
         };

          // ...

      ~~~

3. Now that we have the a handle on the the bones of our app, navigate to `/src/components` and create two new component files:
   - `Questions.js` - An index of Question Items.
   - `QuestionForm.js` - Create a Question Item. 
   - `QuestionForm.jsx` - OPTIONAL - Create a Question Item, but from a Class Component. I did this because I can do whatever I want.

4. Since we have taken a top down approach to building our application, create simple component functions to start and import them into `./App.js` immediately. Being sure to pass `questions` and the appropriate action functions where needed. 

    ~~~js
         // /src/components/App.js

         import { QuestionForm } from './QuestionForm';
         import { Questions } from './Questions';

         // ...

         return (
           <div className="App">
             <header>RecApp2.0</header>
             <QuestionForm 
               submitQuestion={submitQuestion}
             />
             <Questions 
               deleteQuestion={deleteQuestion}
               questions={questions}
             />
           </div>
         );

         // /src/components/Questions.js

         export const Questions = ({questions, deleteQuestion}) => {
           return 'Questions Go Here'
         };

         // /src/components/QuestionForm.js

         export const QuestionForm = ({submitQuestion}) => {
           return 'Form Goes Here'
         };

    ~~~

5. Now, build out your components using the same `classes` used previously for your QuestionForm and `Questions`. Check your work. We should be all done!

