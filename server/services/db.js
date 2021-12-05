const sqlite3 = require('sqlite3');
const fs = require("fs");

const db = new sqlite3.Database('./database.db', (err) => {
    if (err) {
        console.error("Error opening database " + err.message);
    } else {
      console.log("Create tables...");
        db.run('CREATE TABLE users( \
            id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,\
            first_name NVARCHAR(64) NOT NULL,\
            last_name NVARCHAR(64) NOT NULL,\
            email NVARCHAR(64),\
            gender NVARCHAR(16),\
            ip_adress NVARCHAR(16)\
        )', (err) => {
            if (err) {
                console.log("Table 'users' already exists.");
            } else {
              console.log("Insert data 'users'");

              const users = JSON.parse(fs.readFileSync('./data/users.json', 'utf8'));
              let insert = 'INSERT INTO users (first_name, last_name, email, gender, ip_adress) VALUES (?,?,?,?,?)';
              users.forEach( (user) => {
                db.run(insert, [user.first_name, user.last_name, user.email, user.gender, user.ip_address]);
              });
            }
        });

        db.run('CREATE TABLE users_statistic( \
          user_id INTEGER NOT NULL,\
          date DATE NOT NULL,\
          page_views INTEGER,\
          clicks INTEGER,\
          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE\
      )', (err) => {
          if (err) {
              console.log("Table 'users_statistic' already exists.");
          } else {
            console.log("Insert data 'users_statistic'");
            
            const users_statistic = JSON.parse(fs.readFileSync('./data/users_statistic.json', 'utf8'));
              let insert = 'INSERT INTO users_statistic (user_id, date, page_views, clicks) VALUES (?,?,?,?)';
              users_statistic.forEach( (user_statistic) => {
                db.run(insert, [user_statistic.user_id, user_statistic.date, user_statistic.page_views, user_statistic.clicks]);
              });
          }
      });
    }
});

/*
SELECT id, first_name, last_name, email, gender, ip_adress,date,sum(clicks) total_clicks, sum(page_views) total_page_views FROM users LEFT JOIN users_statistic ON users_statistic.user_id = users.id GROUP BY id ORDER BY id
*/

exports.getUsers = function(skipIndex, limit, callback){
  const query = "SELECT id,\
    first_name,\
    last_name,\
    email,\
    gender,\
    ip_adress,\
    sum(clicks) total_clicks,\
    sum(page_views) total_page_views\
    FROM users \
    LEFT JOIN users_statistic ON users_statistic.user_id = users.id\
    GROUP BY id ORDER BY id LIMIT ?,?";
  const values = [skipIndex, limit];
	db.all(query, values, function(error, users){
		callback(error, users)
	})
}

exports.countAllUsers = function(callback){
	const query = "SELECT COUNT(*) count FROM users";
	db.all(query, function(error, rows){
		callback(error, rows)
	})
}