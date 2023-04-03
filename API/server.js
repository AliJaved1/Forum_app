// Server template and API endpoints from: 
// https://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/node-employee-service/node-employee-service.html

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

/* POSTS ENDPOINTS*/

// Create a new Visitor (INSERT)
router.route('/user').post(function (request, response) {
    console.log("CREATE USER");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        // TODO: make sure this reflects actual stuff from frontend
        visitor = request.body;

        connection.execute("INSERT INTO Visitor (ip, experience, vid, time)" + 
        "VALUES(:ip, :experience, :vid, :time", [visitor.ip, visitor.experience, visitor.vid, visitor.time],
            { outFormat: oracledb.OBJECT }, 
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating post");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

// Delete a visitor account (DELETE)
router.route('/user/:vid').delete(function (request, response) {
    console.log("DELETE VISITOR ID:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        // can change if we don't want to use each vid as an endpoint
        var body = request.body;
        var vid = request.params.id;
        connection.execute("DELETE FROM Visitor WHERE vid = :vid",
            [vid],
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error deleting visitor from DB");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

// Show only visitors with an experience threshold (Selection)
router.route('/user').get(function (request, response) {
    console.log("GET VISITORS WITH EXPERIENCE");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");
        connection.execute("SELECT vid FROM Visitor WHERE experience >= 1000", {},
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                var visitors = [];
                result.rows.forEach(function (element) {
                    visitors.push({
                        vid: element.vid
                    });
                }, this);
                response.json(visitors);
                doRelease(connection);
            });
    });
});

// Edit a visitor's info TODO
router.route('/user/:id').put(function (request, response) {
  console.log("PUT VISITOR:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;

    connection.execute("UPDATE Visitor SET FIRSTNAME=:firstName, LASTNAME=:lastName, PHONE=:phone, BIRTHDATE=:birthdate,"+
                       " TITLE=:title, DEPARTMENT=:department, EMAIL=:email WHERE mid=:id",
      [body.firstName, body.lastName,body.phone, body.birthDate, body.title, body.dept, body.email,  id],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error updating employee to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});

// Create a post
// Affected tables: UserContent, Post, Attachment, Perception
router.route('/post').post(function (request, response) {
    console.log("CREATE POST");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        // TODO: make sure this reflects actual stuff from frontend
        post = request.body;

        connection.execute("INSERT INTO UserContent (cid)" +
            "VALUES(:cid, :experience, :vid, :time", [post.cid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating userContent");
                    doRelease(connection);
                    return;
                }
            });

        for (attachment in post.attachments) {
            connection.execute("INSERT INTO Attachment (attid)" +
            "VALUES(:attid", [attachment.attid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating attachment log");
                    doRelease(connection);
                    return;
                }
            });

            if (attachment.type == "image") {
                connection.execute("INSERT INTO Image (lid, link)" +
                    "VALUES(:lid, :link)", [attachment.attid, attachment.content],
                    { outFormat: oracledb.OBJECT },
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            response.status(500).send("Error creating image");
                            doRelease(connection);
                            return;
                        }
                    });
            }
        }

        connection.execute("INSERT INTO Perception (peid, score)" +
            "VALUES(:peid, :score", [post.cid, post.perception],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error inserting perception");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

// Create comment
router.route('/comment').post(function (request, response) {
    console.log("CREATE COMMENT");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        // TODO: make sure this reflects actual stuff from frontend
        comment = request.body;

        connection.execute("INSERT INTO UserComment (coid, content)" +
            "VALUES(:coid, :content", [comment.cid, comment.content],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating comment");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

// Delete comment
router.route('/comment/:cid').delete(function (request, response) {
    console.log("DELETE COMMENT ID:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var coid = request.params.id;
        connection.execute("DELETE FROM UserComment WHERE coid = :coid",
            [coid],
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error deleting comment from DB");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});
// Edit a post (UPDATE)

// Return usernames (Projection)

// Return users and their posts (Join)