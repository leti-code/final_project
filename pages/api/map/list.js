import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";

const listMapController = async (req, res) => {
    switch (req.method) {
        /*This method without middleware makes a select to the colection of Maps, that allows us to list all the maps already created*/
        case "GET":
            await db();
            const maps = await Map.find({})//.populate('flags');
            return res.status(200).json({
                success: true,
                maps
            });
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."],
            });
    }
}

export default listMapController;