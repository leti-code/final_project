import mongoose from 'mongoose';

/*Structure of the schema of a Flag (stop in the map).
It contents different variables with its type and also the required option (to work similar to SQL with some required fields)
If we make the petition to the service of the database withous any of the required fields, the query will be refused. */
const FlagSchema = new mongoose.Schema({
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
        required: [true, 'Please provide a clue to catch next flag or to finish the map.']
    },
    img: {
        type: String
    },
    who_has_hit_this_flag: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }],
});

export default mongoose.models.Flag || mongoose.model('Flag', FlagSchema);
