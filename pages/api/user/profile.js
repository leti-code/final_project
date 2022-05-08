import protect from './middleware';

const handler = async (req, res) => {
    switch (req.method) {
        case "GET":
            /*returns the information of the user logged, 
            thanks to the middleware protect that checks if the user is logged and valid and makes a select in the database with the id*/
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
