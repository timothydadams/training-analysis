import React from 'react';
import { AppRoutes } from './Routes';
import tw from 'twin.macro';

import bg from './assets/peaks.svg';



export const App = () => (
    <div tw="h-screen bg-gradient-to-b from-sky-400 to-cyan-900">
        <div tw="bg-cover" style={{ backgroundImage: `url(${bg})` }}>
            {/*<Logo *>*/}
            {/*<div tw="flex flex-col">*/}
                <AppRoutes />
            {/*</div>*/}
        </div>
    </div>
);






