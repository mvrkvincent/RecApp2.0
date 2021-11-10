# Frontend Design + DOM Manipulation
---

## React Vanilla Install

> "No Magic, Just JavaScript"

3. Create a foundational file structure in our root directory.
    - `/src`
    - `/public`

4. Create an `index.html` file within `/public` and an entry file `index.js` within `/src`. These files form the foundation of our application.
   
5. Navigate to `/public/index.html` and populate it with a simple HTML structure. Within the `body` tag, add a single `div` with `id='root`, this should look familiar. Put some text within the tags, I went with `Hello World` because I'm very creative. Don't forget to include a `defer`ed script tag in `head` that links to `index.js`.

    ~~~html 
    <!-- /public/index.html -->
        <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta http-equiv="X-UA-Compatible" content="IE=edge">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <!-- we will include our soon to be created index.js file, being sure to `defer` this code until after our HTML file has rendered -->
                <script src="index.js" defer></script> 
                <title>Questions App</title>
            </head>
            <body>
                <!-- we have consolidated an entire application down to a single div! -->
                <div id='root'>Hello World</div>

                <!-- we COULD continue to build our entire question app here, but that would be inefficient, wouldn't scale, and ultimately would lead to a very...early 90's experience -->
            </body>
        </html>
    ~~~

(NB: What we have just created is an HTML `document`, every `element` you see above is actually a node on a tree we call the **Document Object Model**, this **DOM** will be manipulated by JS directly.)

6. Copy the path of your `/public/index.html` file and paste it into your browser. `Hello World` should appear!

7. Now, navigate to `/src/index.js` and create a `render` function to assemble the nodes of our DOM Tree for us and insert the result between the opening and closing tags of our `root` div. As we do not have a database (yet!) we will create a mutable `questions` array with some placeholder data matching our system requirements. 
   
8. We will then use JS to create a top level node for our DOM Tree, this will be a `div` simply called `App`. Since our `document` is just an object, we can use normal object syntax to call built in methods and amend properties!

    ~~~js
    // /src/index.js

        const render = () => {
            // create a mutable array to hold our data. I gave it some seeds to start. 
            let questions = [
                { _id: 1, name: 'Vladimir Harkonnen', content: 'Am I the drama?' },
                { _id: 2, name: 'Lady Jessica', content: 'Is Paul the Kwisatz Haderach?' },
                { _id: 3, name: 'Paul Atreides', content: 'Why are my dreams so sandy?' },
            ];

            // we are using the `createElement` function built onto `document` to create an empty `div` and set it equal to `app`. since `div` is ALSO an object, we can append everything on to this. 
            const App = document.createElement('div');
            // let's add some text inside `App` for now.
            App.innerHTML = 'Hello World (Now w/ 100% more JavaScript!)';

        };

    ~~~

9. Now that we have our `App`, we will create an **Event Listener** to run some code once we are sure our **DOM** content has loaded. The code can be anything we want it to be, but in this case, we will be using it to call our `render` function, assembling a DOM Tree and inserting `App` between the opening and closing tags of our `root` div.  

    ~~~js
    // /src/index.js
        const render = () => {
            // ...

            const root = document.getElementById('root');
            root.append(App);
        };

        document.addEventListener('DOMContentLoaded', () => {
          // We will use JavaScript to build a DOM Tree rather than hard code each component directly in our `index.html`
          render();
        });

    ~~~

10. Refresh your browser, you should see `Hello World (Now w/ 100% more JavaScript!)` appear below `Hello World`now! We can go ahead and remove `Hello World` from `/public/index.html`, it served us well but we are moving on. 

11. Everything is going according to plan, let's build out the key functionality of our form. We will call this `QuestionForm` for clarity and append it to `App`. 

    ~~~js
    // /src/index.js

        const render = () => {
            // ...

            const QuestionForm = document.createElement('form');
            const h1 = document.createElement('h1');
            const name = document.createElement('input');
            const content = document.createElement('textarea');
            const submit = document.createElement('button');

            QuestionForm.append(h1);
            QuestionForm.append(name);
            QuestionForm.append(content);
            QuestionForm.append(submit)

            App.append(QuestionForm);
        };

    ~~~

(NB: Order matters here, A LOT. This is where our skills as developers really come in, thinking through this data structure and modeling it out in our minds (or on a whiteboard if you need!)).

12. Refresh the page and view your new form! You will want to refresh after every step moving forward to view/debug your changes.

13. Think for a moment about the properties we add to HTML elements like `button`, `input`, etc. We've discussed how these elements are just objects, let's add some key:value pairs to them now.

    ~~~js
    // /src/index.js

            // ...

            const QuestionForm = document.createElement('form');
            const h1 = document.createElement('h1');
            h1.innerHTML = 'Ask a Question';
            const name = document.createElement('input');
            name.name = 'name'
            name.type = 'text';
            name.placeholder = 'Name';
            const content = document.createElement('textarea');
            content.rows = 3; 
            content.name = 'content';
            content.type = 'text';
            content.placeholder = 'Ask Away...';
            const submit = document.createElement('button');
            submit.type = 'submit';
            submit.innerHTML = 'Submit';

            // ...
        };

    ~~~


14. We will want to create a way to render our individual `questions` (right now, the contents of `questions`). We will need to do this dynamically since we will be `CREATE`ing and `DESTROY`ing them. 

    ~~~js
    // /src/index.js

        const render = () => {

            // ...your QuestionForm is here.
            
            // this will be the list of all of our questions
            const Questions = document.createElement('div');

            const generateQuestionsList = () => {
                // if there are no questions, tell us that!
                if (!questions.length) return Questions.innerHTML = 'No Questions Yet';

                // remove previous displayed questions.
                Questions.innerHTML = '';

                // take each individual question and format it. Reverse the `questions` array if we want the most recent `question` to appear on top.
                questions.reverse().map((question, i) => {
                    const formattedQuestion = document.createElement('div');
                    formattedQuestion.key = i;
                    const h3 = document.createElement('h3');
                    h3.innerHTML = question.content;
                    const span = document.createElement('span');
                    span.innerHTML = question.name;
                    const button = document.createElement('button');
                    button.innerHTML = 'Delete';


                    // append each question element to the formattedQuestion.
                    formattedQuestion.append(h3);
                    formattedQuestion.append(span);
                    formattedQuestion.append(button);

                    // `append` each `formatedQuestion` to the `Questions` div.
                    Questions.append(formattedQuestion);

                });

            };

            // ...

            // append our questions below the form
            App.append(QuestionForm);
            App.append(Questions);

            //... 

            // we want our render to call this function when called the first time, so we will invoke it at the very end of the function. 
            generateQuestionsList();
        };

    ~~~

15. Whew, ok refresh and view your questions! This file is getting long. We could separate these concerns if we want to, but we'd have to be sure to import each file into the `body` of `/public/index.html`. I don't want to. 

16. We have a couple more things left to do. 1) Build a handler for `CREATE`ing an `question` and 2) build a handler for `DESTROY`ing a question. 

    ~~~js
    // /src/index.js

        const render = () => {


            // ...write this just above the code for your `QuestionForm`.

            const submitQuestion = question => {
                questions.push(question);
                generateQuestionsList()
            };

            const deleteQuestion = _id => {
                questions = questions.filter(question => question._id !== _id);
                generateQuestionsList();
            };

            //...

        };

    ~~~

17. Once these are built, we just need to connect our `deleteQuestion` function to the rendered `question`, and add an **Event Listener** to listen for submission of our form. The code should look like this:

    ~~~js
    // /src/index.js

        const render = () => {


            // ...write this just below your `delete` button creator in `generateQuestionsList`.
            button.onclick = () => deleteQuestion(question._id);


            //... the following should be below the code that build your `QuestionForm`

            QuestionForm.addEventListener('submit', e => {
                e.preventDefault();
                // a tiny bit of error handling here.
                if (content.value === '') return content.placeholder = 'Question required...';

                let data = {
                    // generates a unique _id for each question (not infallible).
                    _id: Math.floor(Math.random() * 1000),
                    content: content.value.trim(),
                    name: name.value.trim(),
                };

                // call our `submitQuestion` function and reset our form data.
                submitQuestion(data);
                name.value = '';
                content.value = '';
                content.placeholder = 'Ask Away...';
            });

        };

    ~~~

18. Ok, let's make it pretty. Create a `css_reset.css` (copy the one from this repo) and `index.css` file in `/src`. Add a `link` tag for each of these files to the `head` of `/public/index.html`. 

19. Style as you please by creating classes and adding them to you components like this `[component].classList.add("component-class")`! Do this directly below the components declaration statement. I've also removed the placeholder text we initially gave `App` and replaced it with an `append`ed `header`a simple title.
Here are the additions: 

    ~~~js

        // to App
        const App = document.createElement('div');
        App.classList.add('App');
        const header = document.createElement('header');
        header.innerHTML = 'RecApp2.0: Frontend + DOM Manipulation';

        // to QuestionForm
        QuestionForm.classList.add('module');

        // to formattedQuestion
        formattedQuestion.classList.add('module');

    ~~~

21. Be sure to add your styles to your `/src/index.css` file and that's it! We have a fully functional (albeit frontend only) application, built with nothing more than JavaScript, HTML, and CSS!

