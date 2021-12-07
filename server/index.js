import express from 'express';
import { routes } from './routes';
import { initializeDbConnection } from '../db/db-mongo-example';

const PORT = process.env.PORT || 9000;

const app = express();

// This allows us to access the body of POST/PUT
// requests in our route handlers (as req.body)
app.use(express.json());

app.use(express.static('dist'));

//app.use(authMiddleWare);
// Add all the routes to our Express server
// exported from routes/index.js
routes.forEach(route => {
    app[route.method](route.path, route.handler);
});

// Connect to the mongo database first (temp auth), then start listening
initializeDbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server is listening on port ${PORT}`);
        });
    });

