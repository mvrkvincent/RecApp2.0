# The Full Stack
---

> "A single line of code"

## Get Started

1. In separate Terminal tabs, navigate to the root of your backend directory and frontend directory respectively. 

2. Start each development server. 

## Backend Refactor

1. For security purposes, clients and servers adhere to a `same-origin` policy in which `request`s for resources must be shared from the same `protocol` (e.g. `http` vs. `https`), `port` (e.g. `3000` vs `8080`), and `host` (device). Since our **Express Server** and **React Client** are running on two different `port`s we will need to adjust our server's policy to allow for `cross-origin` `request`s and `response`s.

2. Let's visit our backend `/index.js` and configure our `app` to allow `Cross-Origin Resource Sharing` or `CORS`. For this we will use a module we installed earlier, aptly named `cors`.

  ~~~js
  // /index.js
    // ...
    import cors from 'cors';

    const app = express();

    app.use(cors());
    // ...
  ~~~

3. `cors` accepts optional arguments allowing us to restrict `Cross-Origin` access to specific `port`s or `ip addresses`. For now, we will opt out of passing these arguments and allow access from all origins. 

4. Not only will our server accept `request`s from all origins, any `response` will include special `HTTP` `Headers` that indicate this policy to the browser.  

## Frontend Refactor

1. Now it's time to tie it all together. To start, we will remove some of the default values we've been using as placeholders on the frontend. Navigate to `/src/index.js` and comment out the contents of our `questions` object in `preloadedState`.

  ~~~js
  // /src/index.js
    // ...
    let initialState = {
      questions: {
        // 1: {_id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?'},
        // 2: {_id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?'},
        // 3: {_id: 3, name: 'Paul Atreides', content: 'Why are my dreams so sandy?'},
      },
  };
    // ...
  ~~~

2. Once that's done, let's return to `src/store/store.js` and build out `reducer` logic for handling a `GET` that returns more than one `question`.
   
  ~~~js
  // /src/store/store.js
    // ...
    const questionReducer = createReducer(initialState, builder => {
     builder
       .addCase('RECEIVE_QUESTIONS', (state, action) => {
         // turn our array of `question` objects into an object with `_id`s as keys.
         const questions = {};
         action.payload.map(question => questions[question._id] = question);
         state.questions = questions;
       })
        .addCase('RECEIVE_QUESTION', (state, action) => {
          state.questions[action.payload._id] = action.payload;
        })
        .addCase('REMOVE_QUESTION', (state, action) => {
          // depending on how test `_id` was being passed before this refactor, you may need to key into payload to retrieve the `_id`.
          delete state.questions[action.payload._id];
        });
    // ...
  ~~~

3. Next, let's decide on a method of initiating API calls to our **Express Server**. There are a few popular approaches such as `ajax` (a jquery function) or the `fetch` API available natively in more recent versions of JavaScript. Knowing these options are available, let's return to our root `/` directory and install `axios`.
   - `npm i axios`
 
4. It's time to write the single line of code that represents the entire connection between our **Frontend** and **Backend**. Navigate to `/src/actions/question_actions.js` and let's use `axios` to make some `async` API calls to our **Express Server**.

  ~~~js
  // /src/actions/question_actions
    import axios from 'axios';
    // ...

    export const fetchQuestions = () => async dispatch => {
        try {
          // `get` requests are the most straight forward. 
          const res = await axios.get('http://localhost:5000/api/questions')
          dispatch(receiveQuestions(res.data))
        } catch (err) {
          console.log(`${err} - in fetchQuestions`)
        };
    };

    export const submitQuestion = question => async dispatch => {
        try {
          // `post` requests take a second argument, in this case our question object.
          const res = await axios.post('http://localhost:5000/api/questions', question)
          dispatch(receiveQuestion(res.data));
        } catch (err) {
            console.log(`${err} - in submitQuestion`)
        };
    };

    export const deleteQuestion = _id => async dispatch => {
        try {
            // to delete, simply interpolate the `_id` directly into our URI
            const res = await axios.delete(`http://localhost:5000/api/questions/${_id}`)
            dispatch(removeQuestion(res.data));
        } catch (err) {
            console.log(`${err} - in deleteQuestion`)
        };
    };
    // ...
  ~~~

5. Our `question` data will be nested under `data` in the `res` object, be sure to pass **ONLY** that `data` to our **Action Creators**.

6. Our last step is to connect our `Questions` component to this newly active `fetchQuestion` and set a `useEffect` that will invoke it on initial render. 

7. That's it! Whenever we discuss "connecting" our front end to our back end, the lines of code that generate our `res` above are all we mean. 


