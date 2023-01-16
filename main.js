const bodyParser = require('body-parser');
const express =  require ('express');
const app = express();
const cors = require('cors')
const mysql = require ('mysql2')
const port = 3001;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234",
    database: "webapp1",
  
  });

app.post("/main", (req,res) =>{
    const { id, firstname, lastname, address1, address2, email, number } = req.body;
        

        connection.query("INSERT INTO table1 (id, firstname,lastname, address1, address2, email, number) VALUES(?, ?, ?, ?, ?, ?, ?)", 
        [id, firstname, lastname, address1, address2, email, number], 
        (err, results) =>{
        try{
            if(results.affectedRows > 0){
                res.json({message : 'Data has been inserted'})
            }
            else{
                res.json({messagee : 'Error has been found'})
            }
        }
        catch (err){
            res.json({message : err})

        }
        });
});
app.get("/main", (req, res) => {
    connection.query("SELECT * FROM table1", (err, results) => {
      try {
        if (results.length > 0) {
          res.json(results);
        } else {
          res.json({ message: "No Data" });
        }
      } catch (err) {
        res.json({ message: err });
      }
    });
  });
  
  app.put("/main", (req, res) => {
    const { firstname, lastname, id } = req.body;
  
    if (id && firstname && lastname) {
      connection.query(
        "UPDATE table1 SET firstname = ?, lastname = ? WHERE id = ?",
        [name, age, id],
        (err, results) => {
          try {
            if (results.affectedRows > 0) {
              res.json({ message: "Data Updated!" });
            } else {
              res.json({ message: "Error." });
            }
          } catch (err) {
            res.json({ message: err });
          }
        }
      );
    } else {
      if (id && firstname) {
        connection.query(
          "UPDATE table1 SET firstname = ? WHERE id = ?",
          [firstname, id],
          (err, results) => {
            try {
              if (results.affectedRows > 0) {
                res.json({ message: "Data Updated" });
              } else {
                res.json({ message: "Error." });
              }
            } catch (err) {
              res.json({ message: err });
            }
          }
        );
      } else if (id && lastname) {
        connection.query(
          "UPDATE table1 SET lastname = ? WHERE id = ?",
          [age, id],
          (err, results) => {
            try {
              if (results.affectedRows > 0) {
                res.json({ message: "Data has been updated!" });
              } else {
                res.json({ message: "Error." });
              }
            } catch (err) {
              res.json({ message: err });
            }
          }
        );
      }
    }
  });
  
app.delete("/main", (req, res) => {
  const { id } = req.body;

  connection.query("DELETE FROM table1 WHERE id = ?", [id], (err, results) => {
    try {
      if (results.affectedRows > 0) {
        res.json({ message: "Data is deleted" });
      } else {
        res.json({ message: "Error." });
      }
    } catch (err) {
      res.json({ message: err });
    }
  });
});

app.listen(port, () => {
    console.log('Server is Running'); });
