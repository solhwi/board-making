const express = require('express');
const bodyParser= require('body-parser');
const app = express();
const port = process.env.PORT || 5000;
const moment = require('moment');
require('moment-timezone');
moment.tz.setDefault("Asia/Seoul");


app.use(bodyParser.json());
// api는 json의 형식으로 데이터를 전송함
app.use(bodyParser.urlencoded({extended: true}));

const fs = require('fs');
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mysql = require('mysql');

const connection = mysql.createConnection({
    host: conf.host, //database.json에 적힌 host
    user: conf.user,
    password: conf.password,
    port: conf.port,
    database: conf.database
});

connection.connect();

const multer = require('multer');
const upload = multer({dest: './upload'});

app.get('/api/writings', (req, res) => {
    connection.query(
        "SELECT * FROM BOARD WHERE isDeleted = 0",
        (err, rows, fields) => {
            res.send(rows);
        }
    )   
})

app.use('/image', express.static('./upload'));

app.post('/api/writings', upload.single('image'), (req, res) => {
    let sql = 'INSERT INTO BOARD VALUES (null, ?, ?, ?, ?, ?, 0)';
    let image = '/image/' + req.file.filename; //multer가 filename을 겹치지 않게 설정

    let title = req.body.title;
    let context = req.body.context;
    let userName = req.body.userName;
    let date = moment().format('YYYY-MM-DD HH:mm:ss');

    let params = [image, title, context, userName, date];

    connection.query(sql, params, 
        (err, rows, fields) => {
            res.send(rows);
            console.log(err);
        })
})


app.delete('/api/writings/:id', (req, res) => {
    let sql = 'UPDATE BOARD SET isDeleted = 1 WHERE id = ?';
    let params = [req.params.id];

    connection.query(sql, params, 
    (err, rows, fields) => {
        res.send(rows);
    })

})

app.listen(port, () => console.log(`Server Port: ${port}`));