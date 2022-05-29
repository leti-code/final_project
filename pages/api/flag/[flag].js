import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";
import protect from "../user/middleware";
import userController from "../user";

const singleFlagController = async (req, res) => {
    switch (req.method) {
        case "GET":
            await db();
            const singleFlag = await Flag.findById(req.query.flag).select(['question', 'answer', 'img']);
            if (!singleFlag) return  res.status(404).json({ success: false, error: "Flag not found" });
            console.log(singleFlag);
            return res.status(200).json({
                success: true,
                singleFlag
            });
        case "PUT":
            // await db();
            // const updatedMap = await Map.findByIdAndUpdate(
            //     {_id: req.query.id},
            //     {
            //         mapname: req.body.mapname,
            //         description: req.body.description,
            //         firstClue: req.body.firstClue,
            //     },
            //     {new: true}
            // );
            // if (!updatedMap) return  res.status(404).json({ success: false, error: "Map not found" });
            // return res.status(200).json({
            //     success: true,
            //     updatedMap
            // });
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."],
            });
    }
}

export default protect (singleFlagController);