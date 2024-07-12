import Flag from "@models/Flag";
import Map from "@models/Map";
import db from "@lib/dbConnect";

const flagController = async (req, res) => {
    switch (req.method) {
    case "PUT":
        /*Updates the information of the flag in the database */
        await db();
        const updatedFlag = await Flag.findByIdAndUpdate(
        {_id: req.body.id},
            {
                question: req.body.question,
                answer: req.body.answer,
                correctAnswer: req.body.correctAnswer,
                score: req.body.score || 0,
                clueToNextFlag: req.body.clueToNextFlag,
            },
            {new: true}
        );
        if (!updatedFlag) return  res.status(404).json({ success: false, error: "Flag not found" });
        return res.status(200).json({
            success: true,
            updatedFlag
        });
    case "PATCH":
        /*Updates the image of the flag in the database */
        await db();
        const updatedFlag2 = await Flag.findByIdAndUpdate(
            {_id: req.body.id},
            {
                img: req.body.img,
            },
            {new: true}
        );
        if (!updatedFlag2) return  res.status(404).json({ success: false, error: "Flag not found" });
        return res.status(200).json({
            success: true,
            updatedFlag2
        });
    case "POST":
        /*Adds a new flag to the database */
        try {
            await db();
            const flag = new Flag({
                question: req.body.question,
                answer: req.body.answer,
                correctAnswer: req.body.correctAnswer,
                score: req.body.score || 0,
                clueToNextFlag: req.body.clueToNextFlag,
                img: req.body.img
            });
            await flag.save();

            /*Also updates the map with the new flag */
            const map = await Map.findById(req.body.mapId);
            await map.flags.push(flag);
            await map.save();

            return res.status(201).json({
                flag,
                map,
                success: true,
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
};

export default flagController;