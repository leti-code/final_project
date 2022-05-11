import Flag from "@models/Flag";
import Map from "@models/Map";
import db from "@lib/dbConnect";

const flagController = async (req, res) => {
    switch (req.method) {
        case "GET":
            await db();
            const flags = await Flag.find({});
            return res.status(200).json({
                success: true,
                flags
            });
        case "POST":
            try {
                console.log("Lo que llega", req.body);
                await db();
                const flag = new Flag({
                    qr: req.body.qr,
                    question: req.body.question,
                    answer: req.body.answer,
                    correctAnswer: req.body.correctAnswer,
                    score: req.body.score,
                    clueToNextFlag: req.body.clueToNextFlag,
                    img: req.body.img
                });
                await flag.save();

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
}

export default flagController;