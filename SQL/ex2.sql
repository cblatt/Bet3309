CREATE TABLE User (
	username VARCHAR(100) NOT NULL,
	uf_Name VARCHAR(100) NOT NULL,
	ul_Name VARCHAR(100) NOT NULL,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	PRIMARY KEY(username)
);

CREATE TABLE Favourites(
	username VARCHAR (100) NOT NULL,
    fav_team_name VARCHAR (20),
    PRIMARY KEY (username,fav_team_name),
	FOREIGN KEY(username) REFERENCES User(username),
    FOREIGN KEY(fav_team_name) REFERENCES Team(team_abbrev)
);

CREATE TABLE Division(
div_name VARCHAR (35) NOT NULL PRIMARY KEY,
conf_name VARCHAR(3) NOT NULL
);

CREATE TABLE Team (
	team_abbrev VARCHAR (3) NOT NULL PRIMARY KEY, 
	team_city VARCHAR (35) NOT NULL, 
	div_name VARCHAR (25) NOT NULL,
	games_won INT NOT NULL, 
	games_lost INT NOT NULL,
	games_tied INT NOT NULL,
	points_for INT NOT NULL,
	rush_yards INT,
	pass_yards INT,
	total_yards INT,
	points_against INT NOT NULL,
	rush_yards_against INT,
	pass_yards_against INT,
	total_yards_against INT,
    FOREIGN KEY(div_name) REFERENCES Division(div_name)
);

CREATE TABLE Game(
	game_id VARCHAR(50) NOT NULL,
	game_day VARCHAR(50) NOT NULL,
	game_time VARCHAR(5),
    away_team VARCHAR(3) NOT NULL,
    away_score VARCHAR(3),
	home_team VARCHAR(3) NOT NULL,
	home_score VARCHAR(3),
	PRIMARY KEY(game_id),
	FOREIGN KEY(home_team) REFERENCES Team(team_abbrev),
	FOREIGN KEY(away_team) REFERENCES Team(team_abbrev)
);

CREATE TABLE TeamAbbreviation (
team_abbrev VARCHAR (3) NOT NULL PRIMARY KEY, 
team_name VARCHAR(25), 
FOREIGN KEY(team_abbrev) REFERENCES Team(team_abbrev)
);

CREATE TABLE OffensiveFootballPlayer (
pf_name VARCHAR(35),
pl_name VARCHAR(35),
team_name VARCHAR(5),
pass_att INT,
pass_comp INT,
comp_pct DECIMAL,
pass_yds INT,
pass_ypg DECIMAL,
pass_td INT,
pass_int INT,
rush_att INT,
rush_yds INT,
rush_avg DECIMAL,
rush_ypg DECIMAL,
rush_td INT,
rec INT,
rec_yds INT,
rec_avg DECIMAL,
rec_ypg DECIMAL,
rec_td INT,
tar INT,
yac INT,
PRIMARY KEY(pf_name, pl_name, team_name),
FOREIGN KEY(team_name) REFERENCES Team(team_abbrev)
);

CREATE TABLE DefensiveFootballPlayer (
pf_name VARCHAR(35),
pl_name VARCHAR(35),
team_name VARCHAR(5),
def_int INT,
def_td INT,
def_tackles DECIMAL,
def_sacks DECIMAL,
PRIMARY KEY(pf_name, pl_name, team_name),
FOREIGN KEY(team_name) REFERENCES Team(team_abbrev)
);

CREATE TABLE Kicker (
pf_name VARCHAR(35),
pl_name VARCHAR(35),
team_name VARCHAR(5),
xp_made INT,
xp_att INT,
fg_made INT,
fg_att INT,
PRIMARY KEY(pf_name, pl_name, team_name),
FOREIGN KEY(team_name) REFERENCES Team(team_abbrev)
);







