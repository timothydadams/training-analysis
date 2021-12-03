import jwt from 'jsonwebtoken';


export const updateUserInfoRoute = {
    path:'/api/users/:userId',
    method:'put',
    handler: async (req, res) => {
        //this route doesn't do anything (yet), needs to be finished after postgres table is finalized
        const { authorization } = req.headers;
        const { userId } = req.params;

        if (!authorization) {
            return res.status(401).json({ message: 'No authorizations headers sent'});
        }

        // Bearer ijemdmdf.asdfaslde.asdifajisee
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({message:'Unable to verify token'});
            
            //pull some stuff out of decoded
            //check that coded data matches current user

            //update database, etc.


            
            jwt.sign({newDataToSendBackToClient}, process.env.JWT_SECRET, {expiresIn:'2d'}, (err, token) => {
                if (err) {
                    return res.status(200).json(err);
                }
                res.status(200).json({token});
            })
        })
    }
}