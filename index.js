const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));

const conn = mysql.createConnection({
    host : 'localhost',
    user : 'root',
    password : '',
    database : 'mysqlnode'
});

app.get('/',(req,res)=>{
    res.render('perfect');
});

app.get('/test',(req,res)=>{
    res.render('test');
});

app.post('/',(req,res)=>{
    let name = req.body.name;
    let password = req.body.password;
    let email = req.body.email;
    if (req.body.submit === 'Register') {
        res.redirect('/test');
    }
    conn.connect((err)=>{
        if (err) throw err;
        console.log('connected....');
        let userdata = {name:name,password:password,email:email};
        let sql = 'INSERT INTO userdata SET ?';
        conn.query(sql,userdata,(err,result)=>{
            if(err) throw err;
            console.log('1 record inserted......');
        });
    });
});

app.listen(3000,()=>{
    console.log('Server is started........');
});