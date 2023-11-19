var dbmgr = require("./dbmgr");
var db = dbmgr.shortcutDB;

module.exports.getNames = () => {
    //res = 0;
    //sql = 'CREATE TABLE shortcuts(id INTEGER PRIMARY KEY,name,desc,type,context)';
    //db.run(sql);
    /*
    sql = 'INSERT INTO shortcuts(name,desc,type,context) VALUES (?,?,?,?)';
    db.run(sql, ["Spotify", "Opens the Spotify application", "script", "Desktop/spotify.exe"], (err) => {
        if (err) return console.log(err.message);
    });*/

    res = [];
    let qry = "SELECT * FROM shortcuts;";
    db.all(qry, [], (err, rows) => {
        if (err) return console.error(err.message);
        rows.forEach(row => {
            res.push(row);
        });
    });
    return res;
}