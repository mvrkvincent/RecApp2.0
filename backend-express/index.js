import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import {questions} from './routes/questions.js';
import {MONGO_URI} from './config/keys.js';

const app = express();

app.use(cors());

mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));


app.use(express.json());

app.get('/firstwordsentontheinternet', (req, res) => res.send('lo'));

app.use('/api/questions', questions);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));