// Server template and API endpoints from: 
// https://www.oracle.com/webfolder/technetwork/tutorials/obe/cloud/apaas/node/node-employee-service/node-employee-service.html

var express = require('express');
var bodyParser = require('body-parser');
var oracledb = require('oracledb');
const {v4: uuidv4} = require('uuid');
const e = require('express');

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
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json({type: '*/*'}));

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

// Sanitization: User-provided data is never embedded directly into the SQL query and is instead "prepared" using the 
// oracledb connection.execute() function and binded into the query when executed.

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

        var date = "22-APR-21"

        connection.execute("INSERT INTO Visitor (ip, experience, vid, datecreated)" +
            "VALUES(:ip, :experience, :vid, :time)", [0, 0, vid, date],
            {outFormat: oracledb.OBJEC, autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating visitor");
                    doRelease(connection);
                    return;
                }
                connection.execute("INSERT INTO Guest (gid)" +
                    "VALUES(:vid)", [vid],
                    {outFormat: oracledb.OBJECT, autoCommit: true},
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            response.status(500).send("Error creating member");
                            doRelease(connection);
                            return;
                        }
                        response.json(vid);
                        doRelease(connection);
                    });
            });
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

        connection.execute("DELETE FROM Guest WHERE gid = :vid", [user.vid],
            {outFormat: oracledb.OBJECT, autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error deleting guest when making member");
                    doRelease(connection);
                    return;
                }

                connection.execute("INSERT INTO Member (mid, email, password)" +
                    "VALUES(:vid, :email, :password)", [vid, user.email, request.params.password],
                    {outFormat: oracledb.OBJECT, autoCommit: true},
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            response.status(500).send("Error creating member");
                            doRelease(connection);
                            return;
                        }
                        response.json(user.vid);
                        doRelease(connection);
                    });
            });

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

        connection.execute("SELECT DISTINCT vid, name, experience, email FROM Visitor, Member, Guest WHERE vid = mid AND vid = :vid", [vid], // TODO: Change this query to only return needed things
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));

                element = result.rows[0];

                if (result.rows.length == 0) {
                    response.status(500).send("No rows found");
                    doRelease(connection);
                } else {
                    User = {
                        vid: element["VID"], isMember: true, name: element["NAME"], experience: element["EXPERIENCE"],
                        thumbnailID: "", email: element["EMAIL"], about: ""
                    }
                    response.json(User);
                    doRelease(connection);
                }
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
            {autoCommit: true},
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
            {autoCommit: true},
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

        cid = uuidv4();

        console.log("vid: " + post.authorVid);
        console.log("cid: " + cid);


        var date = '22-APR-22';
        console.log("date: " + date);

        // UPDATED POST BACKEND
        connection.execute("INSERT INTO Post (pid, mid, upvotes, downvotes, title)" +
            "VALUES(:cid, :mid, :upvotes, :downvotes, :title)", [cid, post.authorVid, 0, 0, post.title],
            {outFormat: oracledb.OBJECT, autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating Post");
                    doRelease(connection);
                    return;
                }
                // TODO: New attachment tables
                for (attachment in post.attachments) {
                    attid = uuidv4();

                    connection.execute("INSERT INTO Attachment (attid, pid, type, content)" +
                        "VALUES(:attid, :pid, :type, :content)", [attid, cid, attachment.type, attachment.content],
                        {outFormat: oracledb.OBJECT, autoCommit: true},
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
        // UPDATED POST DELETE CODE (slightly modified), old code: "DELETE FROM Post WHERE cid = :cid"
        // will just delete the post based on post PID
        connection.execute("DELETE FROM Post WHERE pid = :cid",
            [cid],
            {autoCommit: true},
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

        if (request.params.mode == '2') {
            connection.execute("SELECT pid, COUNT(pid) FROM Views GROUP BY pid ORDER BY COUNT(pid) DESC", {},
                {outFormat: oracledb.OBJECT},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        response.status(500).send("Error getting data from DB");
                        doRelease(connection);
                        return;
                    }
                    console.log("RESULTSET:" + JSON.stringify(result));
                    var posts = [];
                    if (result.rows.length == 0) {
                        response.status(500).send("No rows found");
                        doRelease(connection);
                    } else {
                        result.rows.forEach(function (element) {
                            posts.push(element["PID"]);
                        }, this);

                        response.json(posts);
                        doRelease(connection);
                    }
                });
        } else if (request.params.mode == '1') {
            connection.execute("SELECT p.pid from Post p GROUP BY p.pid having MAX(p.upvotes) >= ALL (SELECT MAX(p1.upvotes) FROM post p1 GROUP BY pid)", {},
                {outFormat: oracledb.OBJECT},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        response.status(500).send("Error getting data from DB");
                        doRelease(connection);
                        return;
                    }
                    console.log("<<<<<<<<<<<<<<<<<<<<<<<<<<<<")
                    console.log("RESULTSET:" + JSON.stringify(result));

                    if (result.rows.length == 0) {
                        response.status(500).send("No rows found");
                        doRelease(connection);
                    } else {
                        response.json([result.rows[0]["PID"]]);
                        doRelease(connection);
                    }
                });
        } else {
            connection.execute("SELECT PID FROM POST", {},
                {outFormat: oracledb.OBJECT},
                function (err, result) {
                    if (err) {
                        console.error(err.message);
                        response.status(500).send("Error getting data from DB");
                        doRelease(connection);
                        return;
                    }
                    console.log("RESULTSET:" + JSON.stringify(result));
                    var posts = [];
                    if (result.rows.length == 0) {
                        response.status(500).send("No rows found");
                        doRelease(connection);
                    } else {
                        result.rows.forEach(function (element) {
                            posts.push(element["PID"]);
                        }, this);
                        response.json(posts);
                        doRelease(connection);
                    }
                });
        }

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
        // UPDATED GET ALL POSTS
        // old code: "SELECT cid FROM UserContent WHERE mid = :cid"
        connection.execute("SELECT pid FROM Post WHERE mid = :cid", [vid],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                var posts = [];
                if (result.rows.length == 0) {
                    response.status(500).send("No rows found");
                    doRelease(connection);
                } else {
                    result.rows.forEach(function (element) {
                        posts.push(element["PID"]);
                    }, this);
                    response.json(posts);
                    doRelease(connection);
                }
            });
    });
});

// Get a post's information
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

        finalPost = {};
        attach = [];

        // updated post info --> UPDATEDPOSTINFO

        // result = await connection.execute();

        connection.execute("SELECT DISTINCT pid, mid, name, upvotes, downvotes, title FROM Visitor v, Post p WHERE p.pid = :cid AND p.mid = v.vid", [cid],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                element = result.rows[0];

                finalPost.cid = element["PID"];
                finalPost.title = element["TITLE"];
                finalPost.authorVid = element["MID"];
                finalPost.authorName = element["NAME"];
                finalPost.engagement = 0.5;
                finalPost.perception = element["UPVOTES"] / (element["DOWNVOTES"] + element["UPVOTES"]);
                finalPost.attachments = [];

                connection.execute("SELECT attid, type, content FROM Attachment WHERE pid = :cid", [cid],
                    {outFormat: oracledb.OBJECT},
                    function (err, result) {
                        if (err) {
                            console.error(err.message);
                            response.status(500).send("Error getting data from DB");
                            doRelease(connection);
                            return;
                        }
                        console.log("RESULTSET:" + JSON.stringify(result));
                        element = result.rows[0];

                        result.rows.forEach(function (element) {
                            attach.push({attid: element["ATTID"], type: element["TYPE"], content: element["CONTENT"]});
                        }, this);

                        finalPost.attachments = attach;
                        console.log("FINAL POST:" + JSON.stringify(finalPost))
                        response.json(finalPost);
                        doRelease(connection);
                    });

            })
    });
});


// Upvote a post.
router.route('/perception/like/:cid/:vid').get(function (request, response) {
    console.log("UPVOTE POST:" + request.params.cid);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var body = request.body;
        var cid = request.params.cid;
        console.log(cid);

        connection.execute("UPDATE Post SET upvotes = upvotes + 1 WHERE pid=:cid",
            [cid],
            {autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error upvoting");
                    doRelease(connection);
                    return;
                }
                response.end();
                doRelease(connection);
            });
    });
});

// Downvote a post.
router.route('/perception/dislike/:cid/:vid').get(function (request, response) {
    console.log("DOWNVOTE POST:" + request.params.cid);
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }

        var body = request.body;
        var cid = request.params.cid;

        connection.execute("UPDATE Post SET downvotes = downvotes + 1 WHERE pid=:cid",
            [cid],
            {autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error upvoting");
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
            {outFormat: oracledb.OBJECT},
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

        // New code for create comment

        connection.execute("INSERT INTO UserComment (coid, pid, mid, upvotes, downvotes, content)" +
            "VALUES(:coid, :pid, :mid, :upvotes, :downvotes, :content", [cid, _____, comment.authorVid, 0, 0, comment.content],
            {outFormat: oracledb.OBJECT, autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error creating comment");
                    doRelease(connection);
                    return;
                }
                response.json(cid);
                doRelease(connection);
            });
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
            {autoCommit: true},
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

        // UPDATED DELETE FROM USER COMMENT
        // OLD CODE: "DELETE FROM UserContent WHERE cid = :coid"

        var coid = request.params.id;
        connection.execute("DELETE FROM UserComment WHERE coid = :coid",
            [coid],
            {autoCommit: true},
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


// view a post
router.route('/post/view/:cid/:vid').get(function (request, response) {
    console.log("VIEW A POST");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        cid = request.params.cid;
        vid = request.params.vid;

        connection.execute("INSERT INTO Views VALUES(':vid', ':pid')", [vid, cid],
            {autoCommit: true},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }

                response.end();
                doRelease(connection);
            });
    });
});

router.route('/posts/custom/:userinput').get(function (request, response) {
    console.log("GET VIEWED POSTS");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        input = request.params.userinput;

        connection.execute("SELECT DISTINCT p.pid from Post p, Views v WHERE p.pid = v.pid GROUP BY p.pid HAVING COUNT(*) > :input", [input],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                var posts = [];
                if (result.rows.length == 0) {
                    response.status(500).send("No rows found");
                    doRelease(connection);
                } else {
                    result.rows.forEach(function (element) {
                        posts.push(element["PID"]);
                    }, this);
                }

                response.json(posts);
                doRelease(connection);
            });
    });
});

// Division
router.route('/users/special').get(function (request, response) {
    console.log("GET USERS VIEWED ALL");
    oracledb.getConnection(connectionProperties, function (err, connection) {
        if (err) {
            console.error(err.message);
            response.status(500).send("Error connecting to DB");
            return;
        }
        console.log("After connection");

        connection.execute("SELECT v.vid FROM Visitor V WHERE NOT EXISTS((SELECT P.pid FROM Post P) MINUS (SELECT w.pid FROM VIEWS w WHERE w.vid = v.vid))", [],
            {outFormat: oracledb.OBJECT},
            function (err, result) {
                if (err) {
                    console.error(err.message);
                    response.status(500).send("Error getting data from DB");
                    doRelease(connection);
                    return;
                }
                console.log("RESULTSET:" + JSON.stringify(result));
                var users = [];
                if (result.rows.length == 0) {
                    response.status(500).send("No rows found");
                    doRelease(connection);
                } else {
                    result.rows.forEach(function (element) {
                        users.push(element["VID"]);
                    }, this);
                }

                response.json(users);
                doRelease(connection);
            });
    });
});

app.use(express.static('static'));
app.use('/', router);
app.listen(PORT);