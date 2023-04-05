CREATE TABLE Visitor 
	(ip varchar(39),
	experience int NOT NULL,
	vid varchar(36) PRIMARY KEY,
	datecreated date,
	name varchar(20));

CREATE TABLE Guest 
	(gid varchar(36) PRIMARY KEY REFERENCES Visitor(vid) ON DELETE CASCADE);

CREATE TABLE Member 
	(mid varchar(36) PRIMARY KEY REFERENCES Visitor(vid) ON DELETE CASCADE,
	email varchar(254) NOT NULL,
	password varchar(254) NOT NULL);

CREATE TABLE UserContent 
	(cid varchar(36) PRIMARY KEY,
	mid varchar(36),
	datecreated date,
	FOREIGN KEY (mid) REFERENCES Member(mid) ON DELETE CASCADE);

CREATE TABLE UserComment
	(coid varchar(36) PRIMARY KEY REFERENCES UserContent(cid) ON DELETE CASCADE,
	upvotes int NOT NULL,
	downvotes int NOT NULL, 
	content varchar(200) NOT NULL);

CREATE TABLE Post 
	(pid varchar(36) PRIMARY KEY REFERENCES UserContent(cid) ON DELETE CASCADE,
	upvotes int NOT NULL,
	downvotes int NOT NULL,
	title varchar(200) NOT NULL); 

CREATE TABLE Attachment 
	(attid varchar(36) PRIMARY KEY,
	pid varchar(36),
	type varchar(10),
	content varchar(1000),
	FOREIGN KEY (pid) REFERENCES Post(pid)
	ON DELETE CASCADE);
