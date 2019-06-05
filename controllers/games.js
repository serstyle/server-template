const addGames = (req,res, db) => {
    const {cup, team_1, team_2, odd_1, odd_x, odd_2, game_time, bet_on} = req.body
    db.insert({cup, team_1, team_2, odd_1, odd_x, odd_2, game_time, bet_on}).into("game_of_the_day")
    .then(data=> res.json(data))
}


const getGames = (req, res, db) => {
    db('game_of_the_day').select('*')
    .then(data=> res.json(data[data.length-1]))
}



// //cup VARCHAR(100),
// 	team1 VARCHAR(100),
//     team2 VARCHAR(100),
//     odd1 VARCHAR(20),
//     oddX VARCHAR(20),
//     odd2 VARCHAR(20),
//     game_time VARCHAR(100),
//     betOn VAR

module.exports = {addGames, getGames}