  import User from '../models/user.model.js';
  import bcrypt from 'bcrypt'
import { log } from 'console';
  import jwt from "jsonwebtoken";
  import { token } from 'morgan';
  
  export const register = async (req, res) => {
    const {email, password, username} = req.body
      /* Crear un nuebo usuario */
    try {

      const passwordHash = await bcrypt.hash(password, 10);

      const newUser = new User({
        username, 
        email,
        password: passwordHash,
      });

      const userSaved =  await newUser.save();

      jwt.sign(
        {
          id:userSaved._id,
        },
        "secret123",

        {
          expiresIn: "1d",
        },
        (err, token)=>{
          if(err) console.log(err);
          res.cookie('token', token)
          res.json({
            message: "User created successfully",
          })
        }

      );


      /* res.json({
        id: userSaved.id,
        username: userSaved.username,
        email: userSaved.email,
        createdAt: userSaved.createdAt,
        updatedAt: userSaved.updatedAt,

      }) */

    } catch (error) {
      console.log(error);
    }

    //res.send('Registrando');
  };
  
  export const login = (req, res) => {
    res.send("login");
  };
  