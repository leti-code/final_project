import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";
import protect from "../user/middleware";

const listMapController = async (req, res) => {
    switch (req.method) {
        case "GET":
            await db();
            const maps = await Map.find({}).populate('flags');
            console.log(maps);
            // const ownedMaps = await Map.findById
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