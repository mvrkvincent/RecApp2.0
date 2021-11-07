# State & State Management
---

## State

> "A single source of truth"

1. Let's turn our attention back to `/src/components/App.js`. Currently, our application is small enough that it's entire state (i.e. all of the data currently available to the application) is housed within a single array `questions` in the local state of the top level `App` component. 

      ~~~js
          // /src/components/App.js

          // ...

          const [questions, setQuestions] = useState([
            { _id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
            { _id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
            { _id: 3, name: 'Paul Atreides', content: 'Why am I always dreaming of Arrakis?' },
          ]);

        // ...
      ~~~

2. Changes to the `questions` array are handled by simple setter functions and, together with the array itself, are passed along to the applications other components directly as props. 

     ~~~html
       <!-- /src/components/App.js -->
       
       <!-- ... -->

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

       <!-- ... -->
   ~~~

3. Now imagine we want to extend the functionality of our application with a few new features:
    - Current user's name appears in the `HeaderComponent`.
    - Current user's name appears as the question asker.
    - Answers are submitted and listed within a `question` card. 
    - Current user's name appears as an answerer. 
    - Answers by `Admin` users appear with a blue boarder. 
    - Dark mode changes styling throughout the app. 
    - Dark mode toggle button in HeaderComponent appears as either a Sun or Moon depending on current mode. 


5. This is a lot of data to manage and we run the risk that changes in data are not reflected across all components. This is where the concept of `Global State` comes in. A single object that is not modified, but replaced entirely when changes are made. 

6. Let's refactor our `questions` constant in `App.js` into a something much closer to this `Global State` Object. Pay attention to the organizational structure of this new object. As developers, we have a lot of freedom here, but consistency is key. 

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

7. Next, let's refactor the action functions for our `questions` to modify `GLOBAL_STATE`. We will want to create an entirely new object `NEW_STATE` from our `GLOBAL_STATE` prior to making any changes. This way, we are never *modifying* state directly but replacing it with a new single source of truth with each change.

Notice that we have also changed the configuration of our `questions` from an array to an object with the `_id` as a key. This will give us a boost in the time complexity of our `deleteQuestion` action (O(n) => O(1)).

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

(NB: we could modify these actions slightly so that we are not replacing our entire `GLOBAL_STATE` but rather a "slice" of state such as the `GLOBAL_STATE.entities` object.)


8. Now, let's make sure these changes are reflected across our application. Being sure to pass `GLOBAL_STATE` and the appropriate action functions where needed. We will not bother with actually implementing the other features we've discussed.

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

           // ...
         };
    ~~~

8. We are now getting much closer to a stateful application!. 


9. Before we move on, let's take a look at what our `App` component WOULD return if we go ahead and implement the features we've discussed in the previous section. Every component retured from `App` needs access to at least 4 of these variables. In fact, it's likely that some variables will need to be passed down once more from `Questions` to whatever component we build to manage `Answers`.
   
     ~~~html
       <!-- /src/components/App.js -->
       
       <!-- ... -->

       <div className="App">
          <HeaderComponent 
             userName={GLOBAL_STATE.session.user.username}
             adminStatus={GLOBAL_STATE.session.user.isAdmin}
             isDark={GLOBAL_STATE.ui.isDark} 
             toggleDarkMode={toggleDarkMode}
          />
          <QuestionForm 
             userName={GLOBAL_STATE.session.user.username}
             adminStatus={GLOBAL_STATE.session.user.isAdmin}
             isDark={GLOBAL_STATE.ui.isDark}
             submitQuestion={submitQuestion}
          />
          <Questions
             userName={GLOBAL_STATE.session.user.username}
             answers={GLOBAL_STATE.entities.answers}
             adminStatus={GLOBAL_STATE.session.user.isAdmin} 
             questions={GLOBAL_STATE.entities.questions}
             isDark={GLOBAL_STATE.ui.isDark}
             submitAnswer={submitAnswer}
             deleteQuestion={deleteQuestion}
          />
        </div>

       <!-- ... -->
   ~~~

This is confusing. And ugly. And bad. Also, our `GLOBAL_STATE` object is simply the local state of the top level component. I wonder if there is a better way.
