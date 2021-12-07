import { getDbConnection } from '../../db/db-mongo-example';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {v4 as uuid} from 'uuid';
import { sendEmail } from '../util/sendEmail';

export const signupRoute = {
    path:'/api/signup',
    method:'post',
    handler: async (req, res) => {
        const {email, password } = req.body;
        const db = getDbConnection('react-auth-db');
        const user = await db.collection('users').findOne({email});

        //check if user exists
        if (user) return res.sendStatus(409);

        //encrypt the pw
        const passwordHash = await bcrypt.hash(password, 10);

        const verificationString = uuid();

        const startingInfo = {
            hairColor:'',
            favoriteFood:'',
            bio:'',
        }

        const result = await db.collection('users').insertOne({ 
            email, 
            passwordHash, 
            info:startingInfo, 
            isVerified:false,
            verificationString,
        });

        const { insertedId } = result;

        try {
            await sendEmail({
                to: email,
                from: 'adams.timothy.d@gmail.com',
                subject: 'Please verify your email',
                text: `
                    Thanks for signing up!  To verify your email, please click here: 
                    http://localhost:3000/verify-email/${verificationString}
                `,
            });
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
        //jwt.sign(1,2,3,4)
        //1: data to include in web token
        //2: token secret (.env)
        //3: config option (expiresIn)
        //4: callback after token is ready (err first!)
        jwt.sign({
            id: insertedId,
            email,
            info: startingInfo,
            isVerified:false,
        }, 
        process.env.JWT_SECRET, 
        {
            expiresIn:'2d',
        }, 
        (err, token) => {
            if (err) {
                return res.status(500).send(err);
            }
            res.status(200).json({token});
        })
    }
}