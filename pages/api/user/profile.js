import protect from './middleware';

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            
            return res.status(200).json({
                user : req.user,
                success: true,
                connected: true,
            })
        default:
            return res.status(405).json({
                success: false,
                error: ["Method not allowed."]
            });
    }
}

export default protect(handler);
