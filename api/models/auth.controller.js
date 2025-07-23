import { errorHandler } from "../../utils/error.js";
import User from "./user.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup=async(req,res,next)=>{


    const { username, email, password } = req.body;

    if (!username || !email || !password || username === '' || email === '' || password === '') {
        return next(errorHandler(400, 'All fields are required'));
    }

    const hashedPassword=bcryptjs.hashSync(password,10);

    const newUser=new User({
        username,
        email,
        password:hashedPassword,
        password: hashedPassword,
    });

    try{
        await newUser.save();
        res.json("signup successful");
    }catch(error){
        // res.status(500).json({message:error.message});
        next(error);
    }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password || email === '' || password === '') {
    return next(errorHandler(400, 'All fields are required')); // ✅ Add return
  }

  try {
    const validUser = await User.findOne({ email });
    if (!validUser) {
      return next(errorHandler(404, 'User not found'));
    }

    const validPassword = bcryptjs.compareSync(password, validUser.password);
    if (!validPassword) {
      return next(errorHandler(400, 'Invalid password'));
    }

    const token = jwt.sign({ Id: validUser._id }, process.env.JWT_SECRET);

    res
      .status(200)
      .cookie('access_token', token, { httpOnly: true })
      .json(validUser);
  } catch (error) {
    console.error('Signin error:', error); // ✅ Add logging
    next(error);
  }
};
