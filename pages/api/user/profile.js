import protect from './middleware';
import db from '@lib/dbConnect';
import User from '@models/User';


const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            /*returns the information of the user logged, 
            thanks to the middleware protect that checks if the user is logged and valid and makes a select in the database with the id*/
            return res.status(200).json({
                user : req.user,
                success: true,
                connected: true,
            })
        case "PUT":
            /*updates the url of the user image in the database
            return 200 on success and 404 on error (if the user doesn't exist) */
            await db();
            const updatedUser = await User.findByIdAndUpdate(
                {_id: req.user._id},
                {img: req.body.img},
            );
            if(!updatedUser) return res.status(404).json({success: false, error: "User not found"});
            return res.status(200).json({
                success: true,
                updatedUser
            });
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}

export default protect(handler);
