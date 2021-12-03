import { testRoute } from './testRoute';
import { signupRoute } from './signupRoutes';
import { loginRoute } from './loginRoute';
import { scoreRoute } from './acftScoreRoute';
//import { updateUserInfoRoute } from './updateUserInfoRoute';
//import { testEmailRoute } from './testEmailRoute';

//'catch-all' if people navigate to a direct url and ensures they get the bundle
import { mainRoute } from './mainRoute';


export const routes = [
    //testEmailRoute,
    //updateUserInfoRoute,
    scoreRoute,
    signupRoute,
    loginRoute,
    testRoute,
    mainRoute,
];
