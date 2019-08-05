const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const AddData = require('./models/add-data');
const AddVendors = require('./models/vendors');
const AddNews = require('./models/news');
const AddGallery = require('./models/gallery');
const multer = require('multer');
const nodeMailer = require('nodemailer');
const sendgridTransport = require('nodemailer-sendgrid-transport');
const Cors = require('cors');
require('dotenv').config();


const app = express();

const fileStorage = multer.diskStorage({
    destination: (req, res,cb) =>{
        cb(null, "images");
    },
    filename: (req, file, cb) => {
        cb(null,req.body.date + '-' + file.originalname)
    }
})

const transporter =nodeMailer.createTransport(sendgridTransport({
    auth:{
        api_key:process.env.REACT_APP_MAIL_API
    }
}))

app.use(Cors());



    const userAdmin = 
        {
            userId:"admin",
            password:"admin"
        }

    const fileFilter = (req, file, cb ) => {
        if(file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg'){
           cb(null, true); 
        }else{
            cb(null, false);
        }
    }

app.use(bodyParser.urlencoded({extended:false}));
app.use(multer({storage: fileStorage, fileFilter: fileFilter}).array('image'));
app.use(express.static(path.join(__dirname, 'images')));


app.set("view engine", "ejs");
app.set("views", "views");


app.get('/', (req,res,next) => {
    res.render('admin'); 
})

app.post('/login', (req,res, next) =>{
    if(req.body.loginId === userAdmin.userId && req.body.password === userAdmin.password){
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

app.get('/pushvendors', (req,res, next) =>{
    res.render('pushvendors')
})

app.post('/submitvendors', (req,res,next) =>{
    const vendors = new AddVendors(req.body);
    vendors.save();
    res.redirect('/pushvendors')
})

app.get('/fetchvendors', (req,res,next) =>{
    AddVendors.fetchAll(vendors =>{
        res.send(vendors);
    })

})


app.get('/pushnews', (req,res, next) =>{
    res.render('pushnews')
})

app.post('/submitnews', (req,res,next) =>{
    const news = new AddNews(req.body);
    console.log(req.body) 
    news.save();
    res.redirect('/pushnews')
})

app.get('/fetchnews', (req,res,next) =>{
    AddNews.fetchAll(news =>{
        res.send(news);
    })

})


app.get('/pushgallery', (req,res, next) =>{
    res.render('pushgallery')
})

app.post('/submitgallery', (req,res,next) =>{
    const gallery = new AddGallery( req.body, req.files);
    gallery.save();
    res.redirect('/pushgallery')
    
})


app.get('/fetchgallery', (req,res,next) =>{
    AddGallery.fetchAll(gallery =>{
        res.send(gallery);
    })

})

app.post('/submitmessage', (req, res, next) =>{
    console.log(req.body);
    transporter.sendMail({
    to:"aibtmf@rediffmail.com",
    from:req.body.email,
    subject:"CONTACT US FORM RESPONSE",
    html:req.body.message
   })
   .catch(err =>{
       console.log(err)
   })
   res.redirect('https://fast-ravine-18694.herokuapp.com/contactus')
   
})



app.listen( process.env.PORT || 3001);
