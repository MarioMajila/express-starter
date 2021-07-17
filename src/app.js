import express from 'express';
import bodyParser from 'body-parser';
import connection from './db/database';
const port = process.env.port || 4200

const app = express()

connection();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

import indexRoute from './routes';
import usersRoute from './controllers/UserController';

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', indexRoute);
app.use('/api/users', usersRoute);

app.listen(port, () => {
    console.log(`App listening on : ${port}`);
})