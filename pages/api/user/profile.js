//import jwt from 'jsonwebtoken';
// import User from '@models/User'
// import db from '@lib/dbConnect'

import protect from './middleware';

//MIDDLEWARE TODO: move it to apropiate folder




//export default async function (handler) { async (req, res) => {

const handler = async (req, res) => {
    switch (req.method) {
        case "GET": //POST O GET??
            
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
//}
}

export default protect(handler);
