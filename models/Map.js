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
    img: {
        type: String
    },
    /*check: flag is correct? */
    flags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Flag'
    }]
    /*enhacement: dificultad, idioma, categoría */
});


export default mongoose.models.Map || mongoose.model('Map', MapSchema);
