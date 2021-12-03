import { sendEmail } from "../util/sendEmail";

export const testEmailRoute = {
    path:'/api/test-email',
    method:'post',
    handler: async (req, res) => {
        try {
            await sendEmail({
                to:'adams.timothy.d+test1@gmail.com',
                from:'adams.timothy.d@gmail.com',
                subject:'Can you hear me now?',
                text:'hopefully...',
            })
            res.sendStatus(200);
        } catch (e) {
            console.log(e);
            res.sendStatus(500);
        }
    }
}