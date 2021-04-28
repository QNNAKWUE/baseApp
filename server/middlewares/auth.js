import jwt from 'jsonwebtoken';

class Auth{
    static token(req, res, next){
        const token = req.header('x-auth-token');
        if(!token){
            return res.status(400).send({message: 'Invalid token provided'});
        }

        try{
            const verified = jwt.verify(token, process.env.TOKEN_SECRET);
            req.user = verified;
        }catch (err){
            if(err){
                return res.status(400).send({message: 'Invalid token provided'});
            }
            next();
        }
    }
}

export default Auth;