const express=require("express")
const axios=require("axios");

const app=express();


let bearerToken;
app.get("/",(req,res)=>{
    fetchToken();
    res.send("hello welcome");
});



   



app.post("/register",function(req,res){
    var company={
        "companyName":"Train Central",
        "ownerName":"Laxman",
        "rollNo":"20J41A0519",
        "ownerEmail":"vasudevds1729@gmail.com",
        "accessCode":"IrVNez"
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
app.get("/auth",function(req,res){
    const authBody={
            "companyName":"Train Central",
            "clientID":"96904f72-17c7-4365-8da1-94feaaede190",
            "clientSecret":"gLCkwdhRXXqcMjRY",
            "ownerName":"Laxman",
            "ownerEmail":"vasudevds1729@gmail.com",
            "rollNo":"20J41A0519"
        
    };
    fetch('http://20.244.56.144/train/auth', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(authBody),
        })

        .then(response => response.json())
        if(response.ok){
            const data=response.json();
            const token=data.access_token;
            console.log(token);
        }
        
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
       .then(data => res.send(data))
       .catch(error => console.error('Error:', error));

})
app.get("/trains/:trainNo",(req,res)=>{
    fetchToken();
    var trainNo=req.params.trainNo;
    const headers=new Headers({
        'Authorization': `Bearer ${bearerToken}`,
        'Content-Type': 'application/json'
    });
    fetch(`http://20.244.56.144/train/trains/${trainNo}`, {
 method: 'GET',
 headers: headers
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));
})


app.listen(3000,function(req,res){
    console.log("server started");
});