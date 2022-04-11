import User from '@models/User'
import db from '@lib/dbConnect'

export default async function (req, res) {
    switch (req.method) {
        case "POST":
            try{
                await db();
                const {username, password} = req.body;
                const user = await User.findOne({username})
                if (!user) {
                    return res.status(404).json({
                        success: false,
                        error: "User is not registered."
                    });
                }

                console.log(user, username, password)
                if(await user.checkPassword(password) === true) {
                    return res.status(200).json({
                        success: true,
                        logged: true,
                        user,
                        token: user.generateToken(user._id)
                    })
                }
                return res.status(401).json({
                    success: false,
                    error: "Credentials are wrong"
                });
            }catch(er){
                console.error(er);
                return res.status(500).json({
                    success: false,
                    error: er
                })
            }
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}
