const fs = require('fs');
const path = require('path');


module.exports = class AddVendors {
    constructor(data){
        this.state = data.state;
        this.name = data.name;
        this.contact = data.contact;
        this.address = data.address;
    }

    save(){
        const p = path.join(
            path.dirname(process.mainModule.filename), 
            'data' , 
            'vendors.json'
            );
        fs.readFile(p, (err , fileContent) =>{
            let vendors = [];
            if(!err){
                vendors = JSON.parse(fileContent);
            }
            console.log(vendors)
            vendors.push(this);
            fs.writeFile(p, JSON.stringify(vendors), (err) =>{
                console.log(err);
            })
        });

    }

    static fetchAll(cb){
        const p = path.join(path.dirname(process.mainModule.filename), 'data' , 'vendors.json');
        fs.readFile(p, (err, fileContent)=>{
            if(err){
               cb([]);
            }
            cb(JSON.parse(fileContent));
        })
    }
}