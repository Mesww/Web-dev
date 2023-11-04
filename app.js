const express = require('express');
const path = require('path');
const con = require('./config/db');
const bcrypt = require("bcrypt");
const app = express();

// ! set the public folder
app.use('/public', express.static(__dirname + '/public'));
// ! for express > 4.16
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ! ---------- password generator -----------
app.get('/password/:pass', function (req, res) {
    bcrypt.hash(req.params.pass, 10, function (err,hash) {
        if (err) {
            console.error(err);
            res.status(500).send('Hashing error')
        }else{
            res.send(hash);
        }
    })
});


// ! ------------- api admin -------------
// ! ------------- login admin -------------
app.post('/b-login/admin',function (req,res) {
    const { email, password } = req.body;
    const sql = "SELECT email,password FROM admin WHERE email=?";
    con.query(sql,[email],function (err, results) {
        if (err) {
            console.log(err);
            // !server error
            res.status(500).send('DB error');
        }else if(results.length != 1){
            // !client error
            res.status(401).send('email or password is wrong');
        }else{
            bcrypt.compare(password, results[0].password, function (err, same) {
                if (err) {
                    res.status(500).send('Password compare error');
                }else{
                    if (same) {
                        // console.log(results[0].role);
                        res.status(200).send('Login success');
                        
                    }else{
                        res.status(401).send('Wrong password');
                    }
                }
            })
        }
    })
    
})
// ! ------------- link page admin -------------
app.get("/admin/dashboard",function (_req,res) {
    res.sendFile(path.join(__dirname, "views/admin/dashboard.html"));
})
app.get("/admin/add",function (_req,res) {
    res.sendFile(path.join(__dirname, "views/admin/add.html"));
})
app.get("/admin/assetlist",function (_req,res) {
    res.sendFile(path.join(__dirname, "views/admin/assetlist.html"));
})
app.get("/admin/edit",function (_req,res) {
    res.sendFile(path.join(__dirname, "views/admin/edit.html"));
})
app.get("/admin/history",function (_req,res) {
    res.sendFile(path.join(__dirname, "views/admin/history.html"));
})
app.get("/b-login/admin", function (_req, res) {
    res.sendFile(path.join(__dirname, "views/admin/login.html"));
});


// ! ------------- api user -------------
// ! ------------- login -------------
app.post('/b-login',function (req,res) {
    const { email, password } = req.body;
    const sql = "SELECT role,email,user_id,password FROM user WHERE email=?";
    con.query(sql,[email],function (err, results) {
        if (err) {
            console.log(err);
            // !server error
            res.status(500).send('DB error');
        }else if(results.length != 1){
            // !client error
            res.status(401).send('email or password is wrong');
        }else{
            bcrypt.compare(password, results[0].password, function (err, same) {
                if (err) {
                    res.status(500).send('Password compare error');
                }else{
                    if (same) {
                        res.status(200).send(`${results[0].role}`);
                        // console.log(results[0].role);
                        // res.status(200).send('Login success');
                    }else{
                        res.status(401).send('Wrong password');
                    }
                }
            })
        }
    })
    
})
// ! ------------- link page user -------------
app.get("/b-login", function (_req, res) {
     res.sendFile(path.join(__dirname, "views/b-login.html"));
    });
app.get("/user/b-main", function (_req, res) {
    res.sendFile(path.join(__dirname, "views/user/b-main.html"));
});
app.get("/aj/asset", function (_req, res) {
    res.sendFile(path.join(__dirname, "views/aj/asset.html"));
});


// ! ------------- default -------------
app.get("/",function (_req,res) {
    res.status(200).send('Main')
});

// !start server
const port = 3000;
app.listen(port, function () {
    console.log('Server is ready at ' + port);
    console.log(`http://localhost:${port}/`);
});