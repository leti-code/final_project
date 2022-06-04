import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';

/*Structure of the schema of a User.
It contents different variables with its type and also the required option (to work similar to SQL with some required fields)
If we make the petition to the service of the database withous any of the required fields, the query will be refused. */
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'This username is taken. Provide another username.'],
    required: [true, 'Please provide an username.'],
    maxlength: [20, 'Name cannot be more than 20 characters'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
  },
  email: {
    type: String,
    unique: [true, 'This email already has an account. Provide another email'],
    required: [true, 'Please provida an email']
  },
  img: {
    type: String
  },
  active_maps: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Map'
  }],
  actual_flag: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Flag'
  }],
  scores : [{
    type: Number
  }],
  /*the index in the last three fields makes a correspondency between the map, flag and score
  In this way, if you go to a concrete map (active_maps[0]) you can have it score with scores[0] and the actual flags with actual_flag[0]*/
  maps_owned : [{
    /*In this case, we indicate here that maps_owned is variable that contents an array. 
        Concretely it stores the ObjectId (single identificator of a mongo document) of all maps created by this user.
        It will allow us to display full info of the document we made referenced to*/
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Map'
  }]
});

/*We can also create methos asociated to this schema */
UserSchema.methods.checkPassword = async function(passForCheck) { //uses bcrypt library to check if the encrypted password is the same as the one in the database
  return await bcrypt.compare(passForCheck, this.password);
}

/*This function is called just before the save method of the schema is called */
UserSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next();

  /*If the password has been modified we encripted the new one using bcrypt library */
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  return next();
});

/*This method return a jwt token (used mainly when we logged), we used this token all along the pages to see if the user is logged and also if 
it's a valid one */
UserSchema.methods.generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '1d' //we set how long the token will be valid
  });
}

export default mongoose.models.User || mongoose.model('User', UserSchema);
