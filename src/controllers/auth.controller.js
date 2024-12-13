import bcrypt from "bcrypt"
import {loginService} from "../services/auth.service.js"

const login = async (req, res) => {
    const {email, password} = req.body;

    try{
        const user =  await loginService(email);
        if(!user){
            return res.status(404).send({message:"User or Password not found"})
        }


        const passwordIsValid = await bcrypt.compare(password, user.password)
        if(!passwordIsValid || !user){
            return res.status(404).send({message:"User or Password not found"})
        }

        res.send("login ok");
    }catch(err){
        res.status(500).send(err.message); 
    }
};

export {login};