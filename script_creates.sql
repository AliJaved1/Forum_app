CREATE TABLE Visitor 
	(ip varchar(39),
	experience int NOT NULL,
	vid int PRIMARY KEY,
	datecreated date);

CREATE TABLE Guest 
	(gid int PRIMARY KEY REFERENCES Visitor(vid) ON DELETE CASCADE);

CREATE TABLE Member 
	(mid int PRIMARY KEY REFERENCES Visitor(vid) ON DELETE CASCADE,
	email varchar(254) NOT NULL,
	password varchar(254) NOT NULL);

CREATE TABLE UserContent 
	(cid int PRIMARY KEY,
	mid int,
	datecreated date,
	FOREIGN KEY (mid) REFERENCES Member(mid) ON DELETE CASCADE);

CREATE TABLE UserComment
	(coid int PRIMARY KEY REFERENCES UserContent(cid) ON DELETE CASCADE,
	votes int NOT NULL,
	content varchar(200) NOT NULL);

CREATE TABLE Post 
	(pid int PRIMARY KEY REFERENCES UserContent(cid) ON DELETE CASCADE,
	votes int NOT NULL,
	title varchar(200) NOT NULL); 

CREATE TABLE Attachment 
	(attid int PRIMARY KEY,
	pid int,
	FOREIGN KEY (pid) REFERENCES Post(pid)
	ON DELETE CASCADE);

CREATE TABLE Image 
	(iid int PRIMARY KEY REFERENCES Attachment(attid) ON DELETE CASCADE,
	link varchar(100) NOT NULL);

CREATE TABLE Link 
	(lid int PRIMARY KEY REFERENCES Attachment(attid) ON DELETE CASCADE,
	link varchar(100) NOT NULL);

CREATE TABLE Video 
	(viid int PRIMARY KEY REFERENCES Attachment(attid) ON DELETE CASCADE,
	link varchar(100) NOT NULL);

CREATE TABLE Text
	(tid int PRIMARY KEY REFERENCES Attachment(attid) ON DELETE CASCADE,
	text varchar(1000) NOT NULL);
