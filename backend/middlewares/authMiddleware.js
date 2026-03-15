const jwt = require('jsonwebtoken');

exports.verifyToken = (req, res, next) => {
    try{
        let token = req.header('Authorization');
        if (!token) {
            return res.status(403).json({ message: 'Access Denied. Please login first'});
        }
        if (token.startsWith('Bearer ')) {
            token = token.slice(7, token.length).trimLeft();
        }
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();
    }
    catch  (error){
        res.status(401).json({ message: 'Invalid or Expired Token' });
    }
};

exports.authorizeRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!allowedRoles.includes(req.user.role)) {
            return res.status(403).json({ 
                message: `Access Denied. Only ${allowedRoles.join(' OR ')} can perform this action.`
            });
        }
        next();
    }
};