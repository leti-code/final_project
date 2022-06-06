import User from '@models/User'
import db from '@lib/dbConnect'

export default async function userController(req, res) {
    switch (req.method) {
        case "POST":
            /*The post request register a new user, the information is provide from the front (client) throw the body request */
            try{
                await db();
            
                const user = new User(req.body);
                await user.save();
                return res.status(201).json({
                    success: true,
                    user,
                    token: user.generateToken(user._id)
                });
            }catch(er){
                console.error(er);
                const fieldFailed = Object.keys(er.keyValue)[0]; 
                return res.status(401).json({
                    success: false,
                    error: `There is another user with the same ${fieldFailed}, please change it`
                })
            }
        default:
            /*If another different petition is called we return a 405 error */
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}
