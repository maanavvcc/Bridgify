const sqlite3 = require('sqlite3').verbose();

const shortcutDB = new sqlite3.Database('../shortcuts.db', sqlite3.OPEN_READWRITE,(err) => { 
    if (err) return console.error(err.message);
});

exports.shortcutDB = shortcutDB;