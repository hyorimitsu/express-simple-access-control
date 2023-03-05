import * as functions from 'firebase-functions';
import * as express from 'express';
import useAccessControlMiddleware from 'express-simple-access-control';

const app = express();

// apply access restrictions
useAccessControlMiddleware(app, {
  // enable basic auth
  basicAuthOption: {
    users: [{username: 'username', password: 'password'}],
  },
  // disable ip filter
  // ipFilterOption: {
  //     allowsIPs: ['XXX.XXX.XXX.XXX'],
  //     errStatusCode: 404,
  //     errMessage: 'Not Found',
  // },
});

app.use(express.static(__dirname + '/public/'));

const middleware = functions.https.onRequest(app);

export {middleware};
