import * as express from 'express';
import { Application } from 'express';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import * as logger from 'morgan';

dotenv.config();

const app: Application = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use('/ping', (req, res)=> {
    res.send('ping 💪');
});

const port: number = +process.env.PORT || 8080;

app.listen(port, (err: any) => {
    if (err) return err;
    console.log('Server is up and running on port ' + port);
});