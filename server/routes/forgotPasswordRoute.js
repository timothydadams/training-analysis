import { v4 as uuid } from 'uuid';
import { sendEmail } from '../util/sendEmail';
import { getDbConnection } from '../../db/db-mongo-example';

export const forgotPasswordRoute = {
    path:'/api/forgot-password/:email',
    method:'put',
    handler: async (req, res) => {
        const { email } = req.params;
        console.log('email passed in params:', email);


        const db = getDbConnection('react-auth-db');

        const resetCode = uuid();
        console.log('reset code generated', resetCode);

        const result = await db.collection('users').updateOne({email}, { $set: {resetCode}});
        console.log('result from db query:', result);

        if (!result) return res.sendStatus(200);

        if ( result.modifiedCount > 0) {
            try {
                await sendEmail({
                    to: email,
                    from: 'adams.timothy.d@gmail.com',
                    subject: 'Reset Password',
                    text: `Click the link below to reset your password:
                    
                    ${process.env.APP_BASE_URL}/reset-password/${resetCode}
                    `
                });
            } catch(e) {
                console.log(e);
                res.sendStatus(500);
            }
        }

        res.sendStatus(200);
    }
}