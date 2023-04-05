// Server template and API endpoints from: 
// https://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/node-employee-service/node-employee-service.html

var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
const { v4: uuidv4 } = require('uuid');

var PORT = process.env.PORT || 8089;

var app = express();

var connectionProperties = {
    user: "ora_ajaved1",
    password: "a96043765",
    connectString: "dbhost.students.cs.ubc.ca:1522/stu"
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
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

/* POSTS ENDPOINTS*/

// Create a new Member (INSERT). Gives me a User object, and then I fill out the database tables with the info
router.route('/user').post(function (request, response) {
    console.log("CREATE MEMBER");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        visitor = request.body;
        vid = uuidv4();

        connection.execute("INSERT INTO Visitor (ip, experience, vid, datecreated)" + 
        "VALUES(:ip, :experience, :vid, :time)", [visitor.ip, 0, vid, Date.now()],
            { outFormat: oracledb.OBJECT }, 
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating visitor");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
        
        if (visitor.isMember) {
            connection.execute("INSERT INTO Member (mid, email, about)" +
            "VALUES(:mid, :email, :about)", [vid, visitor.name, visitor.about],
                { outFormat: oracledb.OBJECT },
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        response.status(500).send("Error creating member");
                        doRelease(connection);
                        return;
                    }
                    response.end();
                    doRelease(connection);
                });
        }
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

// Edit a visitor's info. Will just change stuff in database
router.route('/user/:id').put(function (request, response) {
  console.log("EDIT VISITOR:");
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var body = request.body;
    var id = request.params.id;

    connection.execute("UPDATE Member SET EMAIL=:email, ABOUT=:about WHERE mid=:id",
      [body.name, body.about, id],
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

// Create a post
// Affected tables: UserContent, Post, Engagement, Engage 
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
        cid = uuidv4();

        connection.execute("INSERT INTO UserContent (cid, mid)" +
            "VALUES(:cid, :mid)", [cid, post.authorVid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating userContent");
                    doRelease(connection);
                    return;
                }
            });

        connection.execute("INSERT INTO Post (pid, votes, title)" +
            "VALUES(:pid, :votes, :title)", [cid, 0, post.title],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating userContent");
                    doRelease(connection);
                    return;
                }
            });

        // TODO 
        connection.execute("INSERT INTO Engagement (pid, votes, title)" +
            "VALUES(:pid, :votes, :title)", [cid, 0, post.title],
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
            "VALUES(:attid)", [attachment.attid],
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
                connection.execute("INSERT INTO Image (iid, link)" +
                    "VALUES(:iid, :link)", [attachment.attid, attachment.content],
                    { outFormat: oracledb.OBJECT },
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            response.status(500).send("Error inserting image");
                            doRelease(connection);
                            return;
                        }
                    });
            }
            else if (attachment.type == "link") {
                connection.execute("INSERT INTO Link (lid, link)" +
                    "VALUES(:lid, :link)", [attachment.attid, attachment.content],
                    { outFormat: oracledb.OBJECT },
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            response.status(500).send("Error inserting link");
                            doRelease(connection);
                            return;
                        }
                    });
            }
            else if (attachment.type == "video") {
                connection.execute("INSERT INTO Video (viid, link)" +
                    "VALUES(:viid, :link)", [attachment.attid, attachment.content],
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
            else if (attachment.type == "text") {
                connection.execute("INSERT INTO Text (tid, text)" +
                    "VALUES(:lid, :text)", [attachment.attid, attachment.content],
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
    });
});

// Delete post
router.route('/post/:cid').delete(function (request, response) {
    console.log("DELETE POST CID:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var post = request.body;
        var cid = request.params.id;

        // delete attachments first
        for (attachment in post.attachments) {
            connection.execute("DELETE FROM Attachment WHERE attid = :vid",
                [attachment.attid],
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        response.status(500).send("Error deleting attachment from DB");
                        doRelease(connection);
                        return;
                    }
                    response.end();
                    doRelease(connection);
            });
        }

        connection.execute("DELETE FROM UserContent WHERE cid = :cid",
            [cid],
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error deleting post from DB");
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


        // aid = generated

        connection.execute("INSERT INTO Action1 (aid, time)" +
            "VALUES(:coid, :content", [comment.cid, Date.now().toString()],
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

        connection.execute("INSERT INTO Action2 (aid, time)" +
            "VALUES(:coid, :content", [comment.cid, Date.now().toString()],
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

// Get a comment

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

// Aggregation with Having: Select the MAX upvoted post
router.route('/postupvote/').post(function (request, response) {
    console.log("RETURN MOST UPVOTED POST:");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var mid = request.body;

        connection.execute("SELECT * FROM UserContent, Post GROUP BY mid )" +
            "VALUES(EMPLOYEE_SEQ.NEXTVAL, :firstName,:lastName,:email,:phone,:birthdate,:title,:department)",
            [body.firstName, body.lastName, body.email, body.phone, body.birthDate, body.title, body.dept],
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error saving employee to DB");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

app.use(express.static('static'));
app.use('/', router);
app.listen(PORT);