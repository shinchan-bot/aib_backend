const fs = require('fs');
const path = require('path');


module.exports = class AddData {
    constructor(data){
        this.title = data.title;
        this.date = data.date;
        this.description = data.description;
        this.details = data.details;
        this.url = data.url;
        console.log(data)
    }

    save(){
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data' , 
            'meetings.json'
            );
        fs.readFile(p, (err , fileContent) =>{
            let meetings = [];
            if(!err){
                meetings = JSON.parse(fileContent);
            }
            meetings.push(this);
            fs.writeFile(p, JSON.stringify(meetings), (err) =>{
                console.log(err);
            })
        });

    }

    static fetchAll(cb){
        const p = path.join(path.dirname(process.mainModule.filename), 'data' , 'meetings.json');
        fs.readFile(p, (err, fileContent)=>{
            if(err){
               cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}