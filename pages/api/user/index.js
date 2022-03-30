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
                users
            })
        case "POST":
            try{
                await db();
            
                const user = new User(req.body);
                await user.save();
                return res.status(201).json({
                    success: true,
                    reload: true,
                    user
                });
            }catch(er){
                console.error(er);
                return res.status(500).json({
                    success: false,
                    error: er.message
                })
            } //TODO revisar estado
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}
