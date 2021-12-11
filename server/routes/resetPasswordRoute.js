import bcrypt from 'bcrypt';
import { getDbConnection } from '../../db/db-mongo-example';

export const resetPasswordRoute = {
    path: '/api/users/:resetCode/reset-password',
    method: 'put',
    handler: async(req, res) => {
        const { resetCode } = req.params;
        const { newPassword } = req.body;

        const db = getDbConnection('react-auth-db');
        const newPWHash = await bcrypt.hash(newPassword, 10);

        const result = await db.collection('users').findOneAndUpdate(
            {resetCode},
            {
                $set:{passwordHash:newPWHash},
                $unset:{resetCode:''},
            }
        );

        if (result.lastErrorObject.n === 0) return res.sendStatus(404);

        res.sendStatus(200);
    }
}