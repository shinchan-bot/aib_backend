const fs = require('fs');
const path = require('path');


module.exports = class AddNews {
    constructor(data){
        this.heading = data.heading;
        this.date = data.date;
        this.description = data.description;
        this.details = data.details;
    }

    save(){
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data' , 
            'news.json'
            );
        fs.readFile(p, (err , fileContent) =>{
            let news = [];
            if(!err){
                news = JSON.parse(fileContent);
            }
            news.push(this);
            fs.writeFile(p, JSON.stringify(news), (err) =>{
                console.log(err);
            })
        });

    }

    static fetchAll(cb){
        const p = path.join(path.dirname(process.mainModule.filename), 'data' , 'news.json');
        fs.readFile(p, (err, fileContent)=>{
            if(err){
               cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}