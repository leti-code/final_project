import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";
import protect from "../user/middleware";

const mapController = async (req, res) => {
    /*Checks the method of the petition */
    switch (req.method) {
        case "POST":
            try {
                /*Connects with de database and create a new document of Map with the info provide in the body of the request.
                Saves the map info */
                await db();
                req.body.owner = req.user._id;
                const map = new Map(req.body);
                await map.save();

                /*Also updates the user info with a push to the field maps_owned */
                const user = await User.findById(req.user._id);
                await user.maps_owned.push(map._id);
                await user.save();

                return res.status(201).json({
                    success: true,
                    map,
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

export default protect (mapController); //having the protect means that we have the middleware between the client request and service answer.