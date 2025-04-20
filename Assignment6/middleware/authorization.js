
function authorization(role) {
    return (req, res, next) => {
    if((req.user.role === 'admin' || req.user.role === role)){
        next();
    }
    else{
        res.status(403).json({ message: 'Unauthorized' });
    }
    }
 
}

module.exports = {authorization};
  