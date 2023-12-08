var dbmgr = require("./dbmgr");
var db = dbmgr.shortcutDB;

module.exports.getNames = () => {
    createTable();
    
    let qry = "SELECT * FROM shortcuts;";
    return new Promise((resolve, reject) => {
         db.all(qry, [], (err, rows) => {
            if (err) {console.error(err.message); reject(err);}
            resolve(rows);
        });
    });
}

module.exports.getShortcut = (id) => 
{
    let qry = "SELECT * FROM shortcuts WHERE id = " + id.toString() + ";";
    return new Promise((resolve, reject) => {
         db.get(qry, [], (err, row) => {
            if (err) {console.error(err.message); reject(err);}
            resolve(row);
        });
    });
}

module.exports.addShortcut = (name, desc, type, context) => {
    sql = 'INSERT INTO shortcuts(name,desc,type,context) VALUES (?,?,?,?)'
    db.run(sql, [name, desc, type, context], (err) => {
        if (err) return console.log(err.message);
    });
}

module.exports.editShortcut = (id, name, desc, type, context) => {
    
    if (context)
    {
        sql = 'UPDATE shortcuts SET NAME = "' + name + '", DESC = "' + desc + '", TYPE = "' + type + '", CONTEXT = "' + context + '" WHERE ID = ' + id + ';'
        db.run(sql, [], (err) => {
            if (err) return console.log(err.message);
        });
    }
    else
    {
        sql = 'UPDATE shortcuts SET NAME = "' + name + '", DESC = "' + desc + '", TYPE = "' + type + '" WHERE ID = ' + id + ';'
        db.run(sql, [], (err) => {
            if (err) return console.log(err.message);
        });
    }
}

module.exports.removeShortcut = (id) => {
    sql = 'DELETE FROM shortcuts WHERE ID = ' + id + ';'
    db.run(sql, [], (err) => {
        if (err) return console.log(err.message);
    });
}

function createTable() 
{
    sql = "SELECT name FROM sqlite_master WHERE type='table' AND name='shortcuts'"
    db.get(sql, function(err, row) {
        if (row == undefined) {
            console.log('Could not find table... Creating new table');
            db.run('CREATE TABLE shortcuts(id INTEGER PRIMARY KEY,name,desc,type,context)');
        }
    });
}