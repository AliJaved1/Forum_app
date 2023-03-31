// Server template from: https://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/node-employee-service/node-employee-service.html

var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');

var PORT = process.env.PORT || 8089;

var app = express();

var connectionProperties = {
    user: process.env.DBAAS_USER_NAME || "oracle",
    password: process.env.DBAAS_USER_PASSWORD || "oracle",
    connectString: process.env.DBAAS_DEFAULT_CONNECT_DESCRIPTOR || "localhost/xe"
};

function doRelease(connection) {
    connection.release(function (err) {
        if (err) {
            console.error(err.message);
        }
    });
}

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ type: '*/*' }));

var router = express.Router();

router.use(function (request, response, next) {
    console.log("REQUEST:" + request.method + "   " + request.url);
    console.log("BODY:" + JSON.stringify(request.body));
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
});