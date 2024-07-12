//bcrypt Y JWT? interesa saber si estamos en el mapa activo?
import mongoose from "mongoose";

/*Structure of the schema of a Map (any of the games to play in the app).
It contents different variables with its type and also the required option (to work similar to SQL with some required fields)
If we make the petition to the service of the database withous any of the required fields, the query will be refused. */
const MapSchema = new mongoose.Schema({
    mapname: {
        type: String,
        required: [true, "Please provide a mapname."],
        //You can also provide the max length of the field
        maxlength: [100, "Mapname cannot be more than 100 characters"],
    },
    description: {
        type: String,
        required: [true, "Please provide a description."]
    },
    firstClue: {
        type: String,
        required: [true, "Please provide a first clue to begin the map."]
    },
    flags: [{
        /*In this case, we indicate here that flags is variable that contents an array. 
        Concretely it stores the ObjectId (single identificator of a mongo document) of the flag
        To keep this instead other info of the flag, will allow us to display full info of the document we made referenced to (with this id we can display the qr, question, answers... of the concrete flag)*/
        type: mongoose.Schema.Types.ObjectId,
        ref: "Flag",
    }],
    owner: {
        //In this case, we indicate here that owner is variable that contents an ObjectId (single identificator of a mongo document) of the user
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: [true, "Please provide an owner."]
    },
    img: {
        type: String
        //this is an optional variable (you can upload an image or not)
    }
});


export default mongoose.models.Map || mongoose.model("Map", MapSchema);
