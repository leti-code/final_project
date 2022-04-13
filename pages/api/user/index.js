import User from '@models/User'
import db from '@lib/dbConnect'

export default async function userController(req, res) {
    switch (req.method) {
        case "GET":
            await db();
            const users = await User.find({});
            return res.status(200).json({
                success: true,
                connected: true,
                users,
            })
        case "POST":
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
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}
