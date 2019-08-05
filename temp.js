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














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