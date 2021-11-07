# Backend Design + Express
--- 

# Server Configuration

> "No Magic, Just JavaScript"

1. Initialize package management with `npm init` and follow the default prompts (customizing where desired). This will generate a `package.json`.

2. Install dependencies `npm i`:
    - Express - Straight forward backend framework
      - `express`
    - Mongoose - An Object Document Mapper
      - `mongoose`
    - Cors - This will help us handle Cross-Origin requests.
      - `cors`
    - Request - Let's us make HTTP requests in VSCode. 
      - `request`
      - INSTALL VSCode Extension: REST Client
    - Nodemon
      - `nodemon --save-dev`

3. Let's configure our `package.json` with a few start scripts:

    ~~~js
       // /package.json
       "scripts": {
           // ...
           "start": "node index.js",
           "start:dev": "nodemon --inspect index.js",
           // ...
       },
    ~~~

4. Create a foundational file structure in our root directory.
    - `.gitignore` - include `/node_modules`
    - `index.js`

5. 
   

