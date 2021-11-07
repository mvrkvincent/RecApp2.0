import mongoose from 'mongoose';
const Schema = mongoose.Schema;

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

export const Question = mongoose.model('Question', QuestionSchema);