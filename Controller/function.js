const { Sign,authschema } = require('../Models/models');

const createUser = async(req,res)=>{
  try{
      const userData = {
        name: req.body.name,
        mail: req.body.mail,
        password: req.body.password
      }
      const userVal = await authschema.validate(userData);
      if(userVal.error){
        return res.status(400).json({ message: userVal.error.details[0].message });
      }
      const existingUser = await Sign.findOne({where:{mail:userData.mail}});
      if(existingUser) {
        return res.status(200).json(`User Already Exists`);
      }else{
        let createData = await Sign.create(userData);
        return res.status (200).json(`User created Successfully Created Id = ${createData.id},`)
      }
    }catch(err){
    console.error(err);
    return res.status(500).send({message:"Server Error..."});
  }
}


const updateUser = async(req,res)=>{
  try{
    const id = req.params.id;
      const upDetails = req.body
      const userVal = authschema.validate(upDetails);
      if(userVal.error){
        return res.status(400).json({ message: userVal.error.details[0].message });
      }
      const checkUser = await Sign.findByPk(id);
      if(!checkUser) {
        return res.status(404).json({message:"Data Not Found"});
      }
      await checkUser.update(upDetails);
      res.json({message:"Updated", data : checkUser})
  }catch(err){
    console.error(err);
    return res.status(500).send({message:"Server Error..."});
  }
}

const deleteUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const checkUser = await Sign.findByPk(id);
      if(!checkUser) {
        return res.status(404).json({message:"Data Not Found"});
      }
      await checkUser.destroy();
      res.json({message:"Deleted",})
  }catch(err){
    console.error(err);
    return res.status(500).send({message:"Server Error..."});
  }
}
const getUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const checkUser = await Sign.findByPk(id);
      if(!checkUser) {
        return res.status(404).json({message:"Data Not Found"});
      }
      res.json({ userData: checkUser });
  }catch(err){
    console.error(err);
    return res.status(500).send({message:"Server Error..."});
  }
}
const getAllUser = async(req,res)=>{
  try{
    const id = req.params.id;
    const allUsers = await Sign.findAll();
      if(!allUsers) {
        return res.status(404).json({message:"Data Not Found"});
      }
      res.json({ allData: allUsers });
  }catch(err){
    console.error(err);
    return res.status(500).send({message:"Server Error..."});
  }
}

module.exports = {
  createUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUser
};