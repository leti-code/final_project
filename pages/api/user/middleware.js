import jwt from 'jsonwebtoken';
import User from '@models/User';
import Map from '@models/Map';
import Flag from '@models/Flag';

const protect = (handler) => {
    /*This middleware takes the token provide in the header and verify it and also makes a select with the decoded id (we get it from the decodification of
        the token) to return the concrete user information
        On fail returns the appropiate status. */
    return async (req, res) => {
        let token;
        if ( req.headers.authorization && req.headers.authorization.startsWith('Bearer')
        ) {
            try {
                token = req.headers.authorization.split(' ')[1];
                
                const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
                let currentUser = await User.findById(decoded.id).select('-password').populate(['maps_owned', {path: 'actual_flag', options:{retainNullValues: true}}, 'active_maps']);
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