const express=require("express")
const axios=require("axios");
const apiUrl=''
const app=express();
let trains=[];
let train=null;
let token=null;
let bearerToken=null;
app.get("/",(req,res)=>{
    res.write("WELCOME TO RAILWAY APP \n");
    res.write("TO REGISTER COMPANY USE RELATIVE PATH /register \n");
    res.write("TO GET THE AUTHORIZATION TOKEN USE RELATIVE PATH /auth   \n");
    res.write("TO GET ALL THE TRAIN LIST USE RELATIVE PATH /trains   \n");
    res.write("TO GET THE SPECIFIC TRAIN BY USING TRAIN NUMBER  USE RELATIVE PATH /trains/trainNumber   ex:/trains/2344");

    res.end();

});

async function fetchToken(){
    const authBody={
        "companyName":"Train Central",
        "clientID":"96904f72-17c7-4365-8da1-94feaaede190",
        "clientSecret":"gLCkwdhRXXqcMjRY",
        "ownerName":"Laxman",
        "ownerEmail":"vasudevds1729@gmail.com",
        "rollNo":"20J41A0519"
    
};
const data=await fetch('http://20.244.56.144/train/auth',{
    method:'post',
    headers:{
        'Content-Type': 'application/json'
    },
    body:JSON.stringify(authBody)
});
const response=await data.json();
bearerToken=response.access_token;

}

   
app.get("/register",(req,res)=>{
    res.sendFile(__dirname+"/companyRegistrationForm.htm");
})


app.post("/register",function(req,res){
    var company={
        // "companyName":"Train Central",
        // "ownerName":"Laxman",
        // "rollNo":"20J41A0519",
        // "ownerEmail":"vasudevds1729@gmail.com",
        // "accessCode":"IrVNez"
        "companyName":req.body.companyName,
        "ownerName":req.body.ownerName,
        "rollNo":req.body.rollNumber,
        "ownerEmail":req.body.ownerMail,
        "accessCode":req.body.accessCode
    };

    fetch('http://20.244.56.144/train/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(company),
        })
        .then((response) => {
            if (response.ok) {
            console.log('Data sent successfully');
            } else {
            console.error('Failed to send data');
            }
        })
    
    .catch((error) => {
        console.error('Error:', error);
    });

});
app.get("/auth",async function(req,res){
    const authBody={
            "companyName":"Train Central",
            "clientID":"96904f72-17c7-4365-8da1-94feaaede190",
            "clientSecret":"gLCkwdhRXXqcMjRY",
            "ownerName":"Laxman",
            "ownerEmail":"vasudevds1729@gmail.com",
            "rollNo":"20J41A0519"
        
    };
    const data=await fetch('http://20.244.56.144/train/auth',{
        method:'post',
        headers:{
            'Content-Type': 'application/json'
        },
        body:JSON.stringify(authBody)
    });
    const response=await data.json();
    bearerToken=response.access_token;


    res.write(bearerToken);
    res.write("\n above is your bearer token \n");
    res.end();
    // res.send(bearerToken);

});


app.get("/trains",(req,res)=>{
    fetchToken();
    const headers = new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
       });
       
       // Make the request to the API
       fetch('http://20.244.56.144/train/trains', {
        method: 'GET',
        headers: headers
       })
       .then(response => response.json())
       .then(data => trains=data)
       .then(console.log(trains))
       .then(res.send(trains))
       .catch(error => console.error('Error:', error));

})
app.get("/trains/:trainNo",(req,res)=>{
    fetchToken();
    var trainNo=parseInt(req.params.trainNo);
    console.log(trainNo);
    console.log(typeof(trainNo));
    var url='http://20.244.56.144/train/trains/'+trainNo;
    console.log(url);
    var trainNo=parseInt(req.params.trainNo);
    const headers=new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    });
    fetch(url, {
    method: 'GET',
    headers: headers
})
.then(response => response.json())
.then(data => {
    console.log(data);
    res.send(data);
})
.catch(error => console.error('Error:', error));
})


app.listen(3000,function(req,res){
    console.log("server started");
});
