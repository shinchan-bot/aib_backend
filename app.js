const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const AddData = require('./models/add-data');
const Cors = require('cors');

const app = express();

app.use(Cors());



const userAdmin = [
    {
        userId:"a",
        password:"a"
    }
]

app.use(bodyParser.urlencoded({extended:false}));


app.set("view engine", "ejs");
app.set("views", "views");


app.get('/admin', (req,res,next) => {
    res.render('admin'); 
})

app.post('/login', (req,res, next) =>{
    console.log(req.body)
    if(req.body.loginId === userAdmin[0].userId && req.body.password === userAdmin[0].password){
        res.redirect('/pushmeetings')
    }
}) 

app.get('/pushmeetings', (req,res,next) =>{
    res.render('pushmeetings');
})

app.post('/submitmeetings', (req,res,next) =>{
    const meeting = new AddData(req.body); 
    meeting.save();
    res.redirect('/pushmeetings')
})

app.get('/fetchmeetings', (req,res,next) =>{
    AddData.fetchAll(meetings =>{
        res.send(meetings);
    })

})




app.listen(3001);