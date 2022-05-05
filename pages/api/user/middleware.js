import jwt from 'jsonwebtoken';
import User from '@models/User';
import Map from '@models/Map';
import Flag from '@models/Flag';

const protect = (handler) => {
    return async (req, res) => {
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                token = req.headers.authorization.split(' ')[1];
                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
                let currentUser = await User.findById(decoded.id).select('-password').populate(['maps_owned', 'actual_flag', 'active_maps']);
                if (!currentUser) {
                    return res.status(401).json({
                      success: false,
                      message: 'The user belonging to this token no longer exist.',
                    });
                };
    
                req.user = currentUser;
    
                return handler(req,res);
            } catch (error) {
                res.status(401).json({
                    success: false,
                    error: "Error Not Authorized",
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

export default protect;