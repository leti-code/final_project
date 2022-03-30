import bcrypt from 'bcryptjs'
import mongoose from 'mongoose'

/* UserSchema will correspond to a collection in your MongoDB database. */
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
    //TOFIX: no coge que el mail sea unique
    unique: [true, 'This email already has an account. Provide another email'],
    required: [true, 'Please provida an email']
  },
  img: {
    type: /*imagen */ String
  },
  active_games: {
    type: /*array */ []
  },
  actual_flag: {
    type: /*array*/Array
  },
  scores : {
    type: /*array */ Array
  }
  //the index in the last three fields makes a correspondency between the game, flag and score
  //in that way if you go to a concrete game (active_games[0]) 
  //you can have it score with scores[0] and the actual flags with actual_flag[0]
});

UserSchema.methods.checkPassword = async function(passForCheck) {
  return await bcrypt.compare(passForCheck, this.password);
}

UserSchema.pre("save", async function (next){
  if(!this.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  this.password = await bcrypt.hash(this.password, salt);
  console.log(this.password);
  return next();
});


export default mongoose.models.User || mongoose.model('User', UserSchema)
