const express=require("express");
const cors=require("cors");
const mongoose=require("mongoose");

const authRoutes=
require("./routes/auth");

const app=express();

app.use(cors());

app.use(express.json());


mongoose.connect(
"mongodb://127.0.0.1:27017/realtorDB"
)

.then(()=>{

console.log("MongoDB Connected");

})

.catch(err=>{

console.log(err);

});


app.use(
"/api/auth",
authRoutes
);

app.get("/",(req,res)=>{

res.send(
"Backend running 🚀"
);

});

const PORT=5000;

app.listen(PORT,()=>{

console.log(
`Server running on port ${PORT}`
);

});