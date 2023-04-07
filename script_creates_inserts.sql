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
	email varchar(50) NOT NULL,
	password varchar(50) NOT NULL);

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

CREATE TABLE Views
	(vid varchar(36) NOT NULL,
	 pid varchar(36) NOT NULL,
	 PRIMARY KEY (vid, pid));

insert into visitor values('192.010.303', 50, '10302', '01-SEP-22', 'Bob');
insert into visitor values('192.163.093', 1, '20530', '28-FEB-19', 'Alice');
insert into visitor values('192.156.525', 1354, '778', '10-JAN-20', 'Jonathan');
insert into visitor values('192.321.444', 642, '1053', '12-JUN-21', 'Faker');
insert into visitor values('192.111.593', 123, '10111', '22-AUG-12', 'doublelift');
insert into visitor values('192.121.545', 12533, '17', '17-MAR-23', 'soccerplayer1');
insert into visitor values('192.101.351', 53433, '3350', '05-APR-11', 'kosmos');
insert into visitor values('192.113.041', 32987, '351', '31-DEC-22', 'zeezan');
insert into visitor values('192.164.013', 25921, '41', '03-JUL-13', 'snakes');
insert into visitor values('192.151.343', 8932, '873', '04-APR-15', 'cr7ronaldo');

insert into guest values('10302');
insert into guest values('20530');
insert into guest values('778');
insert into guest values('1053');
insert into guest values('10111');

insert into member values('17', 'soccerplayer4@outlook.com', 'logindude');
insert into member values('3350', 'throwawayabc@email.com', 'logindude');
insert into member values('351', 'olderperson@gmail.com', 'logindude');
insert into member values('41', 'gamer12@outlook.com', 'logindude');
insert into member values('873', 'cpscstudent@yahoo.com', 'logindude');

insert into usercontent values('31', '17', '18-MAR-23');
insert into usercontent values('33324', '3350', '06-APR-12');
insert into usercontent values('8217', '351', '31-DEC-22');
insert into usercontent values('132', '41', '04-JUL-20');
insert into usercontent values('53452', '873', '04-APR-15');
insert into usercontent values('158', '17', '27-MAR-23');
insert into usercontent values('9932', '3350', '10-JUL-15');
insert into usercontent values('8168', '351', '09-JAN-23');
insert into usercontent values('554', '41', '27-OCT-21');
insert into usercontent values('9002', '873', '31-MAR-19');

insert into usercomment values('31', 31, 5, 'wow thats really insightful!');
insert into usercomment values('33324', 40, 10, 'youre just wrong here, how can you say that!?');
insert into usercomment values('8217', 35, 100, 'ill have you know I graduated at the top of my class');
insert into usercomment values('132', 4512, 23, 'actually if you use this weapon you can get 100 more damage');
insert into usercomment values('53452', 9529, 501, 'the site has come a long way now!');

insert into post values('158', 5001, 2500, 'Ronaldo Leaves Real Madrid!');
insert into post values('9932', 10, 5345, 'Dr. Recommends an apple a day.');
insert into post values('8168', 947, 5, 'Elden Ring most played game of 2022');
insert into post values('554', 8811, 23, 'Why dont we have any moderators on this site!?!?');
insert into post values('9002', 1000, 9923, 'Unpopular Opinion: water sucks');

insert into attachment values('5', '158', 'image', 'https://i.imgur.com/UJ75m1c.jpeg');
insert into attachment values('6', '9932', 'link', 'www.github.com');
insert into attachment values('7', '8168', 'video', 'www.youtube.com/watch?v=vS3_72Gb-bl');
insert into attachment values('8', '554', 'text', 'I think that there are many things we should consider regarding laws relating to gambling.');
insert into attachment values('9', '9002', 'image', 'https://i.imgur.com/iJVlMUq.jpeg');

insert into views values('10302', '158');
insert into views values('10302', '9932');
insert into views values('778', '9932');
insert into views values('41', '554');
insert into views values('873', '9932');
