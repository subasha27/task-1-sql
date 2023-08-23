const { DataTypes} = require("sequelize");   
const sequelize = require('../utils/db');
const Joi = require("@hapi/joi");

const Sign = sequelize.define('Sign', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  mail: {
    type: DataTypes.STRING,
    allowNull: false,
    unique:true
  },
  password: {
    type: DataTypes.STRING,
    allowNull:false
  }
},{
  timestamps:true
  });


const authschema = Joi.object({
  name: Joi.string().min(3).required(),
  mail: Joi.string().min(4).required().email(),
  password: Joi.string().min(8).required(),
});


module.exports = {
  Sign,
  authschema,
};
