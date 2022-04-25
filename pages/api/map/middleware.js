import jwt from 'jsonwebtoken';
import User from '@models/User';

const owner = (mapController) => {
    return async (req, res) => {
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                token = req.headers.authorization.split(' ')[1];
                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
                //TOSOLVE: send directly decoded.id or check it with findById??
                //console.log("Decodificado",decoded.id);
                const currentUser = await User.findById(decoded.id).select('_id');
               
                if (!currentUser) {
                    return res.status(401).json({
                      success: false,
                      message: 'The user belonging to this token no longer exist.',
                    });
                };
                req.userId = currentUser._id;
                return mapController(req,res);
            } catch (error) {
                console.log(error);
                res.status(401).json({
                    success: false,
                    newError: new Error('Not authorized'),
                });
            }
        }
        if(!token) {
            res.status(401).json({
                success: false,
                newError: new Error('Not authorized, no token found'),
            });
        }
    }
}

export default owner;