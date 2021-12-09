import React from 'react';
import { AppRoutes } from './Routes';
//import bg from './assets/peaks.svg';
//style={{ backgroundImage: `url(${bg})` }}

export const App = () => {
    return (
        <div className="h-screen bg-gradient-to-b from-electric to-ribbon"> 
            <div className="bg-cover" >
        
             
          
                 <AppRoutes />
             
                 
           
            </div>
     </div>
    )
}

/*
    <div tw="h-screen bg-gradient-to-b from-sky-400 to-cyan-900"> 
       <div tw="bg-cover" style={{ backgroundImage: `url(${bg})` }}>
       
            <div tw="flex flex-col">
         
                <AppRoutes />
            
                
            </div>
        </div>
    </div>
);

*/




