import mongoose from 'mongoose';

const FlagSchema = new mongoose.Schema({
    //qr o position? check what to choose
    qr: {
        type: String,
        required: [true, 'Please provide a QR/url/id.']
    },
    question: {
        type: String,
        required: [true, 'Please provide a question.']
    },
    answer: [{
        type: String,
        required: [true, 'Please provide an answer.']
    }],
    correctAnswer: {
        type: Number,
        required: [true, 'Please provide the correct answer.']
    },
    score : {
        type: Number,
        required: [true, 'Please provide the score of this flag.']
    },
    clueToNextFlag: {
        type: String,
        required: [true, 'Please provide a clue to catch next flag or to finish the game.']
    },
    img: {
        type: String
    }
});

export default mongoose.models.Flag || mongoose.model('Flag', FlagSchema);
