import Map from "@models/Map";
import Flag from "@models/Flag";
import User from "@models/User";
import db from "@lib/dbConnect";
import protect from "../user/middleware";
// import userController from "../user";

const singleFlagController = async (req, res) => {
    switch (req.method) {
        //Provides the information of a flag to display in the game screen
        case "GET":
            await db();
            const singleFlag = await Flag.findById(req.query.flag).select(['question', 'answer', 'img']);
            if (!singleFlag) return  res.status(404).json({ success: false, error: "Flag not found" });
            console.log(singleFlag);
            return res.status(200).json({
                success: true,
                singleFlag
            });
        //Once the user select a possible answer, checks if it is correct or not and if this user has already hit it before
        //Also updated the user score in case of a correct answer
        case "PUT":
            await db();
            const myFlag = await Flag.findById(req.query.flag);
            const optionSelected = req.body.option;
            if (myFlag.who_has_hit_this_flag && myFlag.who_has_hit_this_flag.includes(req.user._id)) {
                return res.status(200).json({
                    success: false,
                    error: "You have already hit this flag. Please, try to find next QR code"
                });
            }else {
                if (optionSelected === myFlag.correctAnswer) {
                    console.log("Has acertado");
                    if(myFlag.who_has_hit_this_flag && myFlag.who_has_hit_this_flag.length > 0){
                        myFlag.who_has_hit_this_flag.push(req.user._id);
                        await myFlag.save();
                    } else {
                        let updatedFlag = await Flag.findByIdAndUpdate(
                            {_id: req.query.flag},
                            {
                                who_has_hit_this_flag: [req.user._id],
                            },
                            {new: true});
                        console.log("updatedFlag", updatedFlag);
                    }
                    const user = await User.findById(req.user._id);
                    let pos = user.actual_flag.indexOf(req.query.flag);
                    if(user.scores[pos] === -1)
                        user.scores[pos] = myFlag.score;
                    else
                        user.scores[pos] += myFlag.score;
                    await user.save();

                    let map = await Map.findById(req.body.map);
                    return res.status(200).json({
                        success: true,
                        message: "Correct answer",
                        nextClue: myFlag.clueToNextFlag,
                        isLastFlag: map.flags[map.flags.length -1]._id.valueOf() === req.query.flag ? true : false,
                        scoreAdded: myFlag.score,
                    });
                } else {
                    return res.status(200).json({
                        success: false,
                        error: "Wrong answer"
                    });
                }
            }
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."],
            });
    }
}

export default protect (singleFlagController);