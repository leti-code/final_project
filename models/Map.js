//bcrypt Y JWT? interesa saber si estamos en el mapa activo?
import mongoose from 'mongoose';

const MapSchema = new mongoose.Schema({
    mapname: {
        type: String,
        required: [true, 'Please provide a mapname.'],
        maxlength: [100, 'Mapname cannot be more than 100 characters'],
    },
    description: {
        type: String,
        required: [true, 'Please provide a description.']
    },
    firstClue: {
        type: String,
        required: [true, 'Please provide a first clue to begin the game.']
    },
    flags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flag',
        required: [true, 'Please provide at least a flag.']
    }],
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'Please provide an owner.']
    },
    img: {
        type: String
    }
    /*enhacement: dificultad, idioma, categoría */
});


export default mongoose.models.Map || mongoose.model('Map', MapSchema);
