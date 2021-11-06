# State Management + Redux
---

## Global State

> "A single source of truth"

1. Let's turn our attention back to `./App.js`. 

      ~~~js
          // /src/components/App.js

          // ...

          const [GLOBAL_STATE, setGlobalState] = useState({
             session: {
               user: {
                 username: 'Gaius Helen Mohiam',
                 isAdmin: true,
               }
             },
             entities: {
               questions: {
                 123: {_id: 123, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
                 124: {_id: 124, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
                 125: {_id: 125, name: 'Paul Atreides', content: 'Why am I always dreaming of Arrakis?' },
               },
               answers: {}
             },
              ui: {
                isDark: false,
              },
        });

        // ...

      ~~~


2. Next let's create some functions that carry out the *action* of CR(U)D'ing our Questions. We will want to create an entirely new object `NEW_STATE` from our `GLOBAL_STATE` prior to making any changes. This way, we are never *modifying* state directly.

      ~~~js
          // ...

          // since our questions live within the App component itself, there is no need for a READ action.

          const submitQuestion = question => {
            // create new object prior to modification.
            const NEW_STATE = {...GLOBAL_STATE};
            NEW_STATE.entities.questions[question._id] = question;
            setGlobalState(NEW_STATE);
          };

          const deleteQuestion = _id => {
            const NEW_STATE = {...GLOBAL_STATE};
            delete NEW_STATE.entities.questions[_id];
            setGlobalState(NEW_STATE);
          };

          // ...

      ~~~

3. Now that we have the a handle on the the bones of our app, navigate to `/src/components` and create two new component files:
   - `Questions.js` - An index of Question Items.
   - `QuestionForm.js` - Create a Question Item. 
   - `QuestionForm.jsx` - OPTIONAL - Create a Question Item, but from a Class Component. I did this because I can do whatever I want.

4. Since we have taken a top down approach to building our application, create simple component functions to start and import them into `./App.js` immediately. Being sure to pass `GLOBAL_STATE` and the appropriate action functions where needed. 

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
               GLOBAL_STATE={GLOBAL_STATE}
             />
           </div>
         );

         // /src/components/Questions.js

         export const Questions = ({GLOBAL_STATE, deleteQuestion}) => {
           // we want to iterate through an array of questions eventually.
           const questions = Object.values(GLOBAL_STATE.entities.questions)
           return 'Questions Go Here'
         };

         // /src/components/QuestionForm.js

         export const QuestionForm = ({submitQuestion}) => {
           return 'Form Goes Here'
         };

    ~~~

5. Now, build out your components and check your work. It's not pretty, but it's functional.

6. Ok, let's make it pretty. Create a `css_reset.css` (copy the one from this repo) and `app.css` file in `/src/components`. Style as you please!

