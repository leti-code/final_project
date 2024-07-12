const uploadImgController = async (req, res) => {
    switch (req.method) {
    case "POST":
        return res.status(200).json({
            success: true,
        });
    default:
        return res.status(405).json({
            success: false,
            error: ["Method not allowed."],
        });
    }
};

export default uploadImgController; 