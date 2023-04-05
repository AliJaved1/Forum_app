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

totalVotes = 0;

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

// Create a new Guest (INSERT). DONE
router.route('/auth/new').get(function (request, response) {
    console.log("CREATE GUEST");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        vid = uuidv4();

        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2);

        connection.execute("INSERT INTO Visitor (ip, experience, vid, datecreated)" + 
        "VALUES(:ip, :experience, :vid, :time)", [0, 0, vid, date],
            { outFormat: oracledb.OBJECT }, 
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating visitor");
                    doRelease(connection);
                    return;
                }
            });
        
        connection.execute("INSERT INTO Guest (gid)" +
            "VALUES(:vid)", [vid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating member");
                    doRelease(connection);
                    return;
                }
            });

        response.json(vid);
        doRelease(connection);
    });
});

// Create a new Member (INSERT). DONE
router.route('/auth/signup/:password').post(function (request, response) {
    console.log("CREATE MEMBER");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        user = request.body;
        
        connection.execute("INSERT INTO Member (mid, email, password)" +
            "VALUES(:vid, :email, :password)", [vid, user.email, request.params.password],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating member");
                    doRelease(connection);
                    return;
                }
            });

        connection.execute("DELETE FROM Guest WHERE gid = :vid", [user.vid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error deleting guest when making member");
                    doRelease(connection);
                    return;
                }
            });

        response.json(user.vid);
        doRelease(connection);
    });
});

// logging in
router.route('/auth/:vid/:password').get(function (request, response) {
    console.log("LOGIN");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        vid = request.params['vid'];
        password = request.params['password']; // TODO: sanitize this input

        // connection.execute("INSERT INTO Visitor (ip, experience, vid, datecreated)" + 
        // "VALUES(:ip, :experience, :vid, :time)", [0, 0, vid, Date.now()],
        //     { outFormat: oracledb.OBJECT }, 
        //     function (err, result) {
        //         if (err) {
        //             console.error(err.message);
        //             response.status(500).send("Error creating visitor");
        //             doRelease(connection);
        //             return;
        //         }
        //     });

        response.json(vid);
        doRelease(connection);
    });
});

// Get a visitor's info (Join)
router.route('/user/:vid').get(function (request, response) {
    console.log("GET VISITOR INFO");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        vid = request.params.vid;



        connection.execute("SELECT * FROM Visitor, Member, Guest WHERE vid = mid AND vid = :vid", [vid], // TODO: Change this query to only return needed things
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                User = {
                    vid: result.vid, isMember: true, name: result.name, experience: result.experience, 
                    thumbnailID: "", email: result.email, about: result.about
                }
                
                response.json(User);
                doRelease(connection);
        });
    });
});

// Delete a visitor account (DELETE) DONE
router.route('/user/:id').delete(function (request, response) {
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

// Edit a visitor's info. DONE
router.route('/user/:vid').put(function (request, response) {
    console.log("EDIT VISITOR:" + request.params.vid);
  oracledb.getConnection(connectionProperties, function (err, connection) {
    if (err) {
      console.error(err.message);
      response.status(500).send("Error connecting to DB");
      return;
    }

    var name = request.body.name;
    var vid = request.params.vid;

    connection.execute("UPDATE Visitor SET NAME=:name WHERE vid=:vid",
      [name, vid],
      function (err, result) {
        if (err) {
          console.error(err.message);
          response.status(500).send("Error updating visitor to DB");
          doRelease(connection);
          return;
        }
        response.end();
        doRelease(connection);
      });
  });
});

// Get only visitors with an experience threshold (Selection) DONE
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

/* POST ROUTES */

// Create a post DONE except attid generation
router.route('/post').post(function (request, response) {
    console.log("CREATE POST");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        post = request.body;

        if (post.cid != "") {
            cid = uuidv4();
        }
        else {
            cid = post.cid;
        }

        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2)

        connection.execute("INSERT INTO UserContent (cid, mid, datecreated)" +
            "VALUES(:cid, :mid, :datecreated)", [cid, post.authorVid, date],
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
            "VALUES(:cid, :votes, :title)", [cid, 0, post.title],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating Post");
                    doRelease(connection);
                    return;
                }
            });

        // TODO: New attachment tables
        for (attachment in post.attachments) {
            attid = uuidv4();

            connection.execute("INSERT INTO Attachment (attid, pid, type, content)" +
            "VALUES(:attid, :pid, :type, :content)", [attid, cid, attachment.type, attachment.content],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating attachment log");
                    doRelease(connection);
                    return;
                }
            });
        }

        response.end();
        doRelease(connection);
    });
});

// Delete post DONE
router.route('/post/:cid').delete(function (request, response) {
    console.log("DELETE POST CID:" + request.params.cid);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var cid = request.params.cid;

        // will delete cids, which cascades with pid, which cascades with attid
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

// Get recommended posts
router.route('/posts/recom/:mode').get(function (request, response) {
    console.log("GET RECOMMENDED POSTS");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        connection.execute("SELECT cid FROM UserContent ORDER BY upvotes", {},
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                var posts = [];
                result.rows.forEach(function (element) {
                    posts.push(element.vid);
                }, this);
                response.json(posts);
                doRelease(connection);
            });
    });
});

// get all posts made by a user (Join)
router.route('/posts/user/:vid').get(function (request, response) {
    console.log("GET POSTS FROM USER");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        vid = request.params.vid;

        connection.execute("SELECT cid FROM UserContent WHERE mid = :cid", [vid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                var posts = [];
                result.rows.forEach(function (element) {
                    posts.push(element.cid);
                }, this);
                response.json(posts);
                doRelease(connection);
            });
    });
});

// Get a post's information TODO
router.route('/post/:cid').get(function (request, response) {
    console.log("GET POST INFO");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        cid = request.params.cid;

        connection.execute("SELECT cid, title, vid, name, attid, content FROM Visitor v, UserContent u, Post p, Attachment a WHERE u.cid = :cid AND p.pid = u.cid AND u.mid = v.vid", [cid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                Post = {
                    cid: result.vid, title: result.title, authorVid: result.vid, authorName: result.name, 
                    engagement: 0.5, perception: 0.5, attachments: []
                }
                
                response.json(Post);
                doRelease(connection);
        });
    });
});


// Upvote a post. TODO
router.route('/user/:id').put(function (request, response) {
    console.log("EDIT POST:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var body = request.body;
        var id = request.params.id;

        connection.execute("UPDATE Post SET EMAIL=:email, ABOUT=:about WHERE mid=:id",
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

// get attachment
router.route('attachment/:attid').get(function (request, response) {
    console.log("GET ATTACHMENT");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        attid = request.params.attid;

        connection.execute("SELECT * FROM Attachment WHERE attid = :attid", [attid],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                Attachment = {
                    attid: result.attid, type: result.type, content: result.content
                }
                
                response.json(Attachment);
                doRelease(connection);
        });
    });
});

// Create comment. DONE
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
        cid = uuidv4();

        var date;
        date = new Date();
        date = date.getUTCFullYear() + '-' +
            ('00' + (date.getUTCMonth()+1)).slice(-2) + '-' +
            ('00' + date.getUTCDate()).slice(-2)

        connection.execute("INSERT INTO UserContent (cid, mid, datecreated)" +
            "VALUES(:cid, :mid, :datecreated)", [cid, comment.authorVid, date],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating comment");
                    doRelease(connection);
                    return;
                }
            });

        connection.execute("INSERT INTO UserComment (coid, votes, content)" +
            "VALUES(:coid, :votes, :content)", [cid, 0, comment.content],
            { outFormat: oracledb.OBJECT },
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating comment");
                    doRelease(connection);
                    return;
                }
            });

        response.json(cid);
        doRelease(connection);
    });
});

// Edit a comment DONE
router.route('/user/:id').put(function (request, response) {
    console.log("EDIT COMMENT:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var comment = request.body;
        var id = request.params.id;

        connection.execute("UPDATE UserComment SET CONTENT=:content WHERE coid=:id",
            [comment.content, id],
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error updating comment to DB");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

// Delete comment DONE
router.route('/comment/:cid').delete(function (request, response) {
    console.log("DELETE COMMENT ID:" + request.params.id);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var coid = request.params.id;
        connection.execute("DELETE FROM UserContent WHERE cid = :coid",
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

// Aggregation with Having: Select the MAX upvoted post TODO
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

// Projection 

// Join

// Aggregation with GROUP BY

// Nested Aggregation with GROUP BY

// Division

app.use(express.static('static'));
app.use('/', router);
app.listen(PORT);