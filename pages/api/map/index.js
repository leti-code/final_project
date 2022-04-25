import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";
import owner from "./middleware";

const mapController = async (req,res) => {
    switch (req.method) {
        case "GET":
            await db();
            const maps = await Map.find({}).populate('flags');
            return res.status(200).json({
                success: true,
                maps
            });
        case "POST":
            try {
                await db();
                const flags = req.body.flags;
                let flagIds = [];

                flags.forEach(flag => {
                    const singleFlag = new Flag(flag);
                    singleFlag.save();
                    flagIds.push(singleFlag._id);
                });
                req.body.flags = flagIds;
                req.body.owner = req.userId;
                const map = new Map(req.body);
                await map.save();

                const user = await User.findById(req.userId);
                await user.maps_owned.push(map._id);
                await user.save();

                return res.status(201).json({
                    flags,
                    success: true,
                    map,
                    user
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

export default owner(mapController);