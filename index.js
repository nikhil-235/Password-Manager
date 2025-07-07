const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path");
const methodOverride = require("method-override");
app.use(methodOverride("_method"));
const port = 3000;
const ejsMate = require("ejs-mate");
app.engine("ejs", ejsMate);
const { v4: uuidv4 } = require('uuid');
app.use(express.urlencoded({extended: true}));
app.set("view engine","ejs");
app.set("views",path.join(__dirname, "/views"));
app.use(express.static(path.join(__dirname,"/public")));

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'accountpassword',
    password: 'Nikhil@8235'
  });

  app.get("/",(req,res)=>{
  let q1 = `select * from mediapass`;
let q2 = `select * from accountdetail`;

try {
  // First query
  connection.query(q1, (err, mediapassUsers) => {
    if (err) throw err;
    let user1 = mediapassUsers.length;

    // Second query
    connection.query(q2, (err, accountdetailUsers) => {
      if (err) throw err;
      let user2 = accountdetailUsers.length;

      // Render both results together
      res.render("home.ejs", { user1, user2 });
    });
  });
} catch(err) {
  console.log(err);
  res.send("some error in database");
}

   
  })
  

app.get("/mediapassword",async (req,res)=>{
  let q = `select * from mediapass`;
  try{
    connection.query(q,
      (err,users)=>{
        if(err)throw err;
        
        res.render("mediapass.ejs",{users});
      })
    }catch(err){
      console.log(err);
      res.send("some error in database");
    };
});

app.get("/accountpassword", async (req,res)=>{
  let  q = `select * from accountdetail`;
  try{
    connection.query(q,
      (err,users)=>{
        if(err)throw err;
        res.render("accountpassword.ejs",{users});
      })
    }catch(err){
      console.log(err);
      res.send("some error in database");
    };
});
app.get("/mediapassword/create",(req,res)=>{
  res.render("newmediapass.ejs");
  
});

app.get("/accountpassword/create",(req,res)=>{
  res.render("newaccountpass.ejs");
  
});



app.post("/accountpassword", async (req,res)=>{
    const id = uuidv4();
    let {bankname,work,password} = req.body;
     let q = `insert into accountdetail (id,bankname,work,password) values ('${id}','${bankname}','${work}','${password}')`;
  try{
    connection.query(q,
      (err,result)=>{
        if(err)throw err;
         return res.redirect("/accountpassword");

          })

        }catch(err){
      console.log(err);
      res.send("some error in database");
    };
})

app.post("/mediapassword",async (req,res)=>{
    let id = uuidv4();
    const {medianame,password} = req.body;
    let q = `insert into mediapass (id,medianame,password) values ('${id}','${medianame}','${password}')`;
    try{
    connection.query(q,
      (err,result)=>{
        if(err)throw err;
         return res.redirect("/mediapassword");

          })

        }catch(err){
      console.log(err);
      res.send("some error in database");
    };
    

});

app.get("/accountdetail/:id/update",(req,res)=>{
  let {id} = req.params;
  let q = `select * from accountdetail where id = '${id}'`;
  try{
    connection.query(q,
      (err,result)=>{
        if(err)throw err;
        let user = result[0];
         return res.render("editaccount.ejs",{user});

          })

        }catch(err){
      console.log(err);
      res.send("some error in database");
    };
  
});

app.patch("/accountdetail/:id",(req,res)=>{
  let {id} = req.params;
  const {bankname,work,password} = req.body;
  let q = `update accountdetail set bankname='${bankname}',work='${work}',password='${password}' where id='${id}'`;
  connection.query(q,(err,result)=>{
    if(err)throw err;
    res.redirect("/accountpassword");
  })  
});

app.delete("/accountdetail/:id",(req,res)=>{
  let {id} = req.params;
  let q = `delete from accountdetail where id='${id}'`;
  connection.query(q,(err,result)=>{
    if(err)throw err;
    res.redirect("/accountpassword");
  })

  
});

app.get("/mediapass/:id/update",(req,res)=>{
  let {id} = req.params;
  let q = `select * from mediapass where id='${id}'`;
  connection.query(q,(err,result)=>{
    if(err)throw err;
    let user = result[0];
    res.render("editmediapass.ejs",{user})
  })

 
  
});

app.patch("/mediapass/:id",(req,res)=>{
  let {id} = req.params;
  const {medianame,password}= req.body;
  // console.log(id,medianame,password);
  let q = `update mediapass set medianame='${medianame}',password='${password}' where id='${id}'`;
  connection.query(q,(err,result)=>{
    if(err) throw err;
    res.redirect("/mediapassword");
  })

});

app.delete("/mediapass/:id",(req,res)=>{
  let {id}= req.params;
  let q = `delete from mediapass where id='${id}'`;
  connection.query(q,(err,result)=>{
    if(err)throw err;
    res.redirect("/mediapassword");
  })
})
app.listen(port,()=>{
    console.log(`app is listen ${port}`)
})



 