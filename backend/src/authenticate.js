const express = require('express');
const router = express.Router();
const DBUtils =  require('./DBUtils.js');


router.post('/login', async (req, res) => {
    const {user,email,password} = req.body;
    let result= await DBUtils.executeQuery("select * from account where email ='"+email+"' or username='"+user+"' and password='"+password+"';")
    if(result.rows.length>0){
        res.json("Authorized")
    }else{
        res.json("UnAuthorized")
    }
})

router.post('/signup',async (req,res) => {
    const {user,email,password} = req.body;
    let result=await DBUtils.executeQuery("select * from account where email ='"+email+"' or username='"+user+"';")
    if(result.rows.length===0){
        const q = `insert into account (username,password,email,created_on,last_login) values($1,'root',$2,now(),now()) returning user_id`;
        const input = [user,email];
        let result=await DBUtils.insertQuery(q,input)
        res.json(result.rows[0])
    }else{
        res.json('Already existing email or username!')
    }
    
})

module.exports=router;