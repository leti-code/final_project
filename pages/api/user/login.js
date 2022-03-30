//import User from '@models/User'
import User from '../../../models/User'
//import db from '@lib/dbConnect'
import db from '../../../lib/dbConnect'

export default async function (req, res) {
    switch (req.method) {
        case "POST":
            try{
                await db();
                const {username, password} = req.body;
                const user = await User.findOne({username})
                console.log(user)
                if(user.checkPassword(password)) 
                    return res.status(200).json({
                        success: true,
                        logged: true
                    })
                
                //TODO generar JWT
                return res.status(200).json({
                    success: true,
                    logged: false
                });
            }catch(er){
                console.error(er);
                return res.status(500).json({
                    success: false,
                    error: er
                })
            } //TODO revisar estado
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}
