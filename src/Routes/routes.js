import { Router } from "express";
import User from "../Models/user.model.js";

const router = Router();

router.post('/add', async (req,res)=>{
    console.log(req.body);
    let newFriend = new User(req.body);
    newFriend = await newFriend.save();
    res.status(201).json(newFriend);
});

export default router;