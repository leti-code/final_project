import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";
import protect from "../user/middleware";

const gameController = async (req, res) => {
    /*Service used in the game screens (on init, middle ones and last) to update info in database */
    /*Checks the method of the petition */
    switch (req.method) {
        case "POST":
            try {
                /*Connects with the database and update user to include new game.
                 */
                await db();
                const user = await User.findById(req.user._id);
                if (user.active_maps.length > 0) {
                    user.active_maps.push(req.body.map_id);
                    user.actual_flag.push(null);
                    user.scores.push(-1);
                } else {
                    user.active_maps = [req.body.map_id];
                    user.actual_flag = [null];
                    user.scores = [-1];
                }
                const updateMapInUser = await User.findByIdAndUpdate(
                    { _id: req.user._id },
                    {
                        active_maps: user.active_maps, 
                        actual_flag: user.actual_flag, 
                        scores: user.scores},
                    { new: true });

                return res.status(201).json({
                    success: true,
                    updateMapInUser,
                });
            } catch (er) {
                console.log(er);
                return res.status(401).json({
                    success: false,
                    error: er.message,
                });
            }
        case "PUT":
            try {
                /*Connects with the database and update user to include new actual_flag.*/
                await db();
                const user = await User.findById(req.user._id);

                /*We need to find index of map to be capable of match with our flag (check if the flag belongs to the map) */
                const posMap = await user.active_maps.indexOf(req.body.map_id);
                const map = await Map.findById(req.body.map_id);

                /*We also get the position (index) of the old flag already kept in the database and the one we want to update now*/
                const posOldFlag = map.flags.indexOf(user.actual_flag[posMap]);
                const posNewFlag = map.flags.indexOf(req.body.flag_id);

                /*Checks if the map and flag are valid (that the user is playing this game)
                Also checks that the position of the new flag we want to update, is the inmediate next to the old one
                */
                if (posMap !== -1 && posNewFlag !== -1 && (posOldFlag === -1 || ((posOldFlag + 1) === posNewFlag))) {
                    user.actual_flag[posMap] = req.body.flag_id;
                    const updateUser = await User.findByIdAndUpdate(
                        { _id: req.user._id },
                        {
                            actual_flag: user.actual_flag, 
                        },
                        { new: true });
    
                    }
                    
                    return res.status(201).json({
                        success: true,
                        actualFlag: user.actual_flag[posMap],
                    });
                } catch (er) {
                    console.log(er);
                    return res.status(401).json({
                        success: false,
                        error: er.message,
                    });
                }
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."],
            });
    }
}

export default protect (gameController); //having the protect means that we have the middleware between the client request and service answer.