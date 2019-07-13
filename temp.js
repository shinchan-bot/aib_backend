fs.readFile(p,(err, fileContent) =>{
    let meetings =[];
    if(!err){
        meetings = JSON.parse(fileContent);
    }
    let body =req.body;
    meetings.push(body);
    fs.writeFile(p, JSON.stringify(meetings), (err)=>{
        console.log("error hai");
    });

});