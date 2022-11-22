
CREATE VIEW UserFavourites 
AS SELECT username, fav_team_name
FROM Favourites
WHERE username = 'test';

CREATE VIEW FavouritedTeamStats
AS SELECT * 
FROM Team
JOIN Favourites
ON Team.team_abbrev = Favourites.fav_team_name
WHERE username = 'test';
