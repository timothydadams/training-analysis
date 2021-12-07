import * as jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';
import { getDbConnection } from '../../db/db-mongo-example';

export const updateUserDetailsRoute = {
    path:'/api/users/:userId',
    method:'put',
    handler: async (req, res) => {
        const { authorization } = req.headers;
        const { userId } = req.params;

        //make sure only properties we care about are pulled from the body
        const updates = (({
            favoriteFood,
            hairColor,
            bio,
        }) => ({
            favoriteFood,
            hairColor,
            bio,
        }))(req.body) 

        if (!authorization) {
            return res.status(401).json({ message: 'No authorizations headers sent'});
        }

        // Bearer tokenstring
        const token = authorization.split(' ')[1];

        jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
            if (err) return res.status(401).json({message:'Unable to verify token'});
            
            //pull some stuff out of decoded
            const { id, isVerified } = decoded;

            if (id !== userId) return res.status(403).json({message:'Unable to update another users details'});
            if (!isVerified) return res.status(403).json({message: 'Please verify your email before updating data'});
            
            const db = getDbConnection('react-auth-db');

            const result = await db.collection('users').findOneAndUpdate(
                { _id: ObjectId(id)},
                {$set: {info:updates}},
                {returnOriginal:false},
            );
            
            const { email, info } = result.value;
            
            jwt.sign({id, email, isVerified, info}, process.env.JWT_SECRET, {expiresIn:'2d'}, (err, token) => {
                if (err) {
                    return res.status(200).json(err);
                }
                res.status(200).json({token});
            });
        });
    }
}