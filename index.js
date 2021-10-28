const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.listen('3000', ()=> {
    console.log('server is running!!!!!!');
});

//connect database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'api'
});
db.connect((err)=> {
    if(err) throw err;
    else{
        console.log('database connected!!!');
    }
});

app.get('/emp', (req, res) => {
    let select = `SELECT * FROM employee`;

    db.query(select, (err, result)=> {
        if(err) throw err;
        res.send(result);
    });
});

app.post('/emp/add', (req, res)=> {
    //console.log(req.body);

    let q = `INSERT INTO employee(firstname, lastname, mobile, email, gender) 
    VALUES ('${req.body.firstname}','${req.body.lastname}','${req.body.mobile}','${req.body.email}','${req.body.gender}')`;

    db.query(q, (err, result)=> {
        if(err) throw err;
        res.send('Data Inserted..!!');
    });
});

app.get('/emp/:id',(req, res)=> {
    let s = `SELECT * FROM employee WHERE id = '${req.params.id}'`;

    db.query(s, (err, result)=> {
        if(err) throw err;
        res.send(result);
    });

    //console.log(req.params.id);
});

app.put('/emp/update/:id',(req, res)=> {
    console.log('Dataa For Update----->',req.body);
    let up = `UPDATE employee SET 
                    firstname = '${req.body.firstname}',
                    lastname = '${req.body.lastname}',
                    mobile = '${req.body.mobile}',
                    email = '${req.body.email}',
                    gender = '${req.body.gender}'
                    WHERE id = '${req.params.id}'`;
    db.query(up, (err, result)=> {
        if(err) throw err;
    
        res.send('Data Update..');
    });
    
});

app.delete('/emp/delete/:id',(req, res) => {
    let del = `DELETE FROM employee WHERE id = '${req.params.id}'`;

    db.query(del, (err, result)=> {
        if(err) throw err;
    
        res.send('Data Deleted..');
    });
    
});