import Map from "@models/Map";
import Flag from "@models/Flag";
import db from "@lib/dbConnect";

export default async function mapController(req, res) {
    switch (req.method) {
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
                const map = new Map(req.body);
                await map.save();
                return res.status(201).json({
                    flags,
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