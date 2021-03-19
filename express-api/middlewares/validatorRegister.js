const {db, query} = require("../database")

const validatorRegister = async (req,res, next) => {
  try{
    const {email, username} = req.body
    const cekemail = await query(`select * from users where email = '${email}'`)
    const cekusername = await query(`select * from users where username = '${username}'`)
  if (cekemail.length !== 0 ){
    return res.status(202).send({message:"Email Already taken"})
  }
  if (cekusername.length !== 0 ){
    return res.status(202).send({message:"Username Already taken"})
  }
    next()
  } catch (err){
    console.log(err)
    return res.status(500).send(err)
  }
  
}
module.exports = validatorRegister;
