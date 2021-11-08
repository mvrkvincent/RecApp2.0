# Backend Design
--- 

## mongoDB Cluster Setup

1. Go to this [link](https://www.mongodb.com/try), fill out and submit the form to get started for free and verify your email.
2. If you already have a MongoDB account, sign in. 
3. You will be prompted to `Build a Database`. Select `Shared (Free)`.
4. Choose `AWS` and then the North American Region closest to you. 
5. Skip all other options and select `Create Cluster`. This will take up to 5 minutes. 
6. Navigate to `Connect` and select `Allow Access from Anywhere` and click `Add IP Address`.
7. Create a username and password - ***COPY AND PASTE BOTH INTO A TXT FILE***.
8. Click `Choose a connection method` and select `MongoDB Compass`.
9. Ignore the download suggestion in step 1. Copy your `CONNECTION STRING` and save it with your username and password.
10. PROFIT.

## Server Configuration

> "No Magic, Just JavaScript"

1. Initialize package management with `npm init` and follow the default prompts (customizing where desired). This will generate a `package.json`.

2. Install dependencies `npm i`:
    - Express - Straight forward backend framework
      - `express`
    - Mongoose - An Object Document Mapper
      - `mongoose`
    - Cors - This will help us handle Cross-Origin requests.
      - `cors`
    - Request - Lets us make HTTP requests in VSCode. 
      - `request`
      - INSTALL VSCode Extension: REST Client
    - Nodemon
      - `nodemon --save-dev`

3. Let's configure our `package.json` with a few start scripts. We will also add a `type` flag to allow ES6 modules. This will allow us to use modern `import` statements rather than `require()` throughout:

    ~~~js
    // /package.json

       // ...
       "type": "module",
       "scripts": {
           // ...
           "start": "node index.js",
           "start:dev": "nodemon --inspect index.js",
           // ...
       },
       //  ...
    ~~~

4. Create a foundational file structure in our root directory.
    - `.gitignore` - include `/node_modules`
    - `index.js`

5. Now that we are all set up, let's configure our server using `express` in our `index.js`. This is exceedingly simple, which is why I love Express. 

    ~~~js
    // /index.js

        import express from 'express';

        // express is a function imported from the `express` module. here invoke `express` with no arguments, setting it's return equal to an arbitrary value `app`.
        const app = express();

        // we then declare a port value, i chose 5000.
        const port = process.env.PORT || 5000;

        // finally let's use the `listen` function provided by our `app` instance. this function, when invoked with a port and callback function, will maintain an open connection to your new server. 
        app.listen(port, () => console.log(`Server is running on port ${port}`))

    ~~~

(NB: There is nothing special about `app`, it is simply the return value of the `express` function. Since this return value of `express` is just JavaScript, `console.dir(app)` and see what's happening under the hood.)

1. After completing the code above, let's spin up our server with `start:dev`. `Server is running on port 5000` should now appear in the console. See, easy!
   
## Routes

1. Our server could be used for a great many things, but we know we are eventually going to build a web application. Let's use our new server to interact with data via our browser.

2. We know we can use our server's open connection to send instructions via `HTTP` `requests` and `responses`. Let's open up the browser and head over to `localhost:5000` and see...absolutely nothing interesting. Our server is serving, but we haven't given it any code to execute. 

3. Lucky for us, our `app` object has built in functions that give us access to the most common `HTTP` methods used for CRUD'ing data: `GET`, `POST`, `PUT`, `PATCH`, `DELETE`. These built in functions are named for the methods they utilize. Convenient! Let's use the `get` function to do some work when requested by ou4 client (browser).

    ~~~js
    // /index.js

        // ...

        // we want our app to utilize JSON in our responses for the sake of uniformity. let's tell `app` to `use` json formatting by invoking the `json` function provided by express.
        app.use(express.json());

        // the `get` function accepts a string and a callback function. The string or `route` is simply the pattern that, when included in an `HTTP` `request` will cause the callback function to be invoked. 
        app.get('/firstwordsentontheinternet', (req, res) => {
            // i've decided to create a route that returns the first word sent via internet connection as a response but we could just as easily do some math, return the code for a whole new application, etc.  
            res.send('lo');
        });

        // ...
    ~~~

(ASIDE: `get` abstracts away a lot of work for us. Feel free to `console.log(req)` and `console.log(res)` to see what exactly is getting passed to our callback function. Once again, I will reiterate we can do ANYTHING when our `route` is followed so long as we do it with JavaScript. This includes using other JS libraries to help us do our work...we are heading somewhere fun.)

4. Congrats! Not only have we created a server but we have also set up a full blown `API`!!! What does this `API` do? It provides a client with a single **API Endpoint** with a `route` that returns the first word sent on the internet. We have a `First Word Sent On The Internet` API. Not exactly profitable, but there you go. 

5. Let's think about the `Questions` application we've theorized. We know that we want a user to be able to `Create` a question, `Read` a list of questions, and `Destroy` a question through their browser all while persisting these interactions to some sort of database. Let's take our simple `First Word Sent On The Internet` API and create a `Questions` API.

6. We will need to create additional **API Endpoints** with specifically named `routes` to handle each of the `CRUD` actions required by our app. While it is technically possible to build all of our functionality in one file, we will start by creating a new directory at our root `/` called `routes` to house these functions. 

7. Here we will take advantage of the more robust `Router` class provided by Express, however the concept and pattern is exactly the same as above. Create a new file `questions.js` within `routes` and build out a simple route for each action.

    ~~~js
    // /routes/questions.js
        import express from 'express';

        const router = express.Router();

        router.get('/', (_, res) => {
            // return a list of questions. for now, placeholders
            const questions = [
                { _id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
                { _id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
                { _id: 3, name: 'Paul Atreides', content: 'Why are my dreams so sandy?' },
            ]   
            res.json(questions)
        });

        router.post('/', (req, res) => {
            // return the question we created. for now, we will just return the request body which contains the question data.
            const question = req.body;
            res.json(question);
        });

        router.delete('/:question_id', (req, res) => {
            // return the id of the deleted question. for now, we will just return the request params which contain the id. 
            const id = req.params.question_id;
            res.json(id);
        });

        export const questions = router;
    ~~~

8. Now, let's import our questions into `/index.js` and use a special function from our `app` to `use` these methods as routes. (NB: include the files extension, in this case `.js`) 

    ~~~js
    // /index.js

        // ...

        import {questions} from './routes/questions.js';

        // the `use` function works the same as any of our other `HTTP` based functions, however, allows us to bundle several `routes` under one top level `route` string by passing our imported `routes` as a second argument.

        app.use('/api/questions', questions);

        // ...
    ~~~


9. We can test our `get` route right now by navigating to `localhost:5000/api/questions`. `A list of questions` should appear in the browser. In order to test out other routes, we will take a quick aside and discuss one of my favorite VSCode extensions `REST Client`:

   1.  Create a new directory called `requests`
   2.  Create a new file within `requests` called `api.http`
   3.  Paste the following code exactly:
        ~~~js

        ### Submit Question

        POST http://127.0.0.1:5000/api/questions
        Content-Type: application/json

        {
            "name": "Herald of the Change",
            "content": "Can everyone hear me?"
        }

        ### Get All Questions

        GET http://127.0.0.1:5000/api/questions
        Content-Type: application/json


        ### Delete a Question

        DELETE http://127.0.0.1:5000/api/questions/123
        Content-Type: application/json

        ~~~

    4. You should see small `Send Request` buttons appear above the comments for each request. Click these to test your routes. 

10. Good! We now have active API endpoints that can be accessed via routes added to our `app`. This is all well and good, but we are missing the final piece of our API Pie (I'm so sorry for that). As it stands, our routes just return placeholder data or the request itself as a `response`. We need to persist our data in a database and use our `routes` to manipulate that data. 

## Models + Schema

1. We will be using a non-relational database called mongoDB to handle our questions along with an Object Document Mapping called Mongoose to map our `question` data into a format that mongoDB will accept. Mongoose behaves almost identically to ORM's such as Sequelize or SQLAlchemy so the learning curve here is shallow. 

2. Create a new directory at the root `/` level called `models` for us to model our `question` data. 

3. Within `/models` create a file `question.js` within `/models`. The singular naming convention alludes to the fact that a `model` **IS** a single `question`, or more philosophically, what it **MEANS** to be a `question`.

    ~~~js
    // models/question.js

      import mongoose from 'mongoose';
      const Schema = mongoose.Schema;

      // create a `mongoose` schema by invoking the `Schema` function with an object with keys representing the items that make up a `Question` and values which are also objects defining the data type of the item and whether or not the item itself is required. 
      // you may also pass an optional options object, here i've turned on `timestamps`. 
      const QuestionSchema = Schema({
          name: {
              type: String,
              required: true
          },
          content: {
              type: String,
              required: true
          },
      }, {
          timestamps: true,
      });
      
      // finally pass the return value of the `Schema` function (set to `QuestionSchema`) and pass it to the `model` creator function given to us by mongoose along with a string that represents the name of the entity we are modeling, in this case a `Question`.
      export const Question = mongoose.model('Question', QuestionSchema);

    ~~~

4. While a schema dictates the shape of our `question`, the `model` **IS** a question. The `Question` that is exported from `/models/question.js` is a class that not only constructs a new instance of a `question` but contains within it all of the functions necessary to `Create`, `Read`, `Update`, and `Destroy` questions in our mongoDB database. 

5. Let's take advantage of the power of our `Question` class by revisiting `/routes/question.js` and replacing our placeholder responses with the work needed to manipulate data in our database. 

    ~~~js
    // /routes/questions.js
        import express from 'express';

        // import our newly created `Question` model.
        import {Question} from '../models/question.js';

        const router = express.Router();

        router.get('/', (req, res) => {
            // use the `find` function provided by mongoose to find all questions.
            Question.find()
                // the return value of the `find` function is all found questions, let's send that list back in our response as JSON.
                .then(questions => res.json(questions))
                    .catch(err => res.status(404).json(err));
        });

        router.post('/', (req, res) => {
            // our http request (`req`) brought with it the `body` of the question we are asking. we use the values in this object to construct a new Question.
            const newQuestion = new Question({
                name: req.body.name,
                content: req.body.content,
            });
            // we then `save` this question and, if successful, return it with our response.
            newQuestion.save().then(question => res.json(question))
                .catch(err => res.status(404).json(err));
            
        });

        router.delete('/:question_id', (req, res) => {
            // for our delete function, we will simply pass the id of the `question` we want to remove as part of the parameters to our URI. we then find and delete the matching question in our database.
            Question.findOneAndDelete({_id: req.params.question_id})
                //what we do next is up to us, i've decided to return the id of the question as a confirmation.
                .then(question => res.json({_id: question._id}))
                    .catch(err => res.status(404).json(err));
        });

        export const questions = router;
    ~~~

6. We are almost done! If we test our `routes` in our `/requests/api.http` file we should now get 404 errors as specified by our `catch` above. 

## Connecting the mongoDB Cluster

0. This is our last step! If you have not created your `mongoDB Cluster`, please return to the section above. Create a new directory at the root `/` level called `config` and add it to your `.gitignore` immediately. Add a new file to `config` called `keys.js` and paste the following code: 

    ~~~js
        export const MONGO_URI = 'paste your mongoDB connection string here'
    ~~~

(NB: It is very important never to commit your config or any `private key`)

1. Let's navigate back to `/index.js` and use `mongoose` to open a connection to mongoDB. 

    ~~~js
    // /index.js

        // ...

        import mongoose from 'mongoose';
        import {MONGO_URI} from './config/keys.js';

        mongoose
            .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
            .then(() => console.log("MongoDB connected"))
            .catch(err => console.log(err));

        // ...
    ~~~

2. Restart your server and test your `routes` via `/requests/api.http`.

## Finishing Up

That's it! We've created an Express server via Node and connected it to our mongoDB non-relational/nosql database!


