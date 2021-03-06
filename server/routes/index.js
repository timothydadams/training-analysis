import { testRoute } from './testRoute';
import { signupRoute } from './signupRoutes';
import { loginRoute } from './loginRoute';
import { scoreRoute } from './acftScoreRoute';
import { updateUserDetailsRoute } from './updateUserInfoRoute';
import { verifyEmailRoute } from './verifyEmail';
import { forgotPasswordRoute } from './forgotPasswordRoute';
import { resetPasswordRoute } from './resetPasswordRoute';

//import { testEmailRoute } from './testEmailRoute';

//'catch-all' if people navigate to a direct url and ensures they get the bundle
import { mainRoute } from './mainRoute';


export const routes = [
    //testEmailRoute,
    resetPasswordRoute,
    forgotPasswordRoute,
    verifyEmailRoute,
    updateUserDetailsRoute,
    scoreRoute,
    signupRoute,
    loginRoute,
    testRoute,
    mainRoute,
];
