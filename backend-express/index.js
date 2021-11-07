import express from 'express';
import {questions} from './routes/questions.js';

const app = express();

app.use(express.json());

app.get('/firstwordsentontheinternet', (req, res) => res.send('lo'));

app.use('/api/questions', questions)

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`))