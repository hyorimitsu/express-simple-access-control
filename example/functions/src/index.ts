import * as functions from "firebase-functions";
import * as express from "express";
import useAccessControlMiddleware, {Option} from "express-simple-access-control";

const app = express();

useAccessControlMiddleware(app, {
    basicAuthOption: {
        users: [
            {username: 'username', password: 'password'},
        ],
    },
    // ipFilterOption: {
    //     allowsIPs: ['XXX.XXX.XXX.XXX'],
    //     errStatusCode: 404,
    //     errMessage: 'Not Found',
    // },
} as Option);

app.use(express.static(__dirname + '/public/'));

const middleware = functions.https.onRequest(app);

export {middleware};
