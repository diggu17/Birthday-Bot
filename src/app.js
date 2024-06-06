import express from "express";
import DotEnv from "dotenv";
import mongoose from "mongoose";
import morgan from "morgan";
import cronService from "./Services/service1.js";
import routes from "./Routes/routes.js";
import cron from 'node-cron';
import User from "./Models/user.model.js";
import bodyParser from "body-parser";

DotEnv.config();

const app = express();

// set up express
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use('/api', routes);
app.use(express.static('public'));


const uri=process.env.MONGODB_CONNECTION_URL;

mongoose.connect(uri).then(()=>{
    console.log("Database connected succesfully");
}).catch((err)=>{
    console.error(`Error in connecting Database. Err: ${err}`);
    process.exit(1);
});

// Run the job every 2 minutes
cron.schedule('*/2 * * * *', async () => {
    console.info("Node Server is up & running");
});

// Run the job daily at 1:40 AM
cron.schedule('58 12 * * *', async () => {
    console.info("CronJob Triggered!");
    await cronService();
}, {
    scheduled: true,
    timezone: "Asia/Kolkata"
});


app.get('/', (req, res) => {
    res.render("index.ejs");
});

app.get('/add-new-friend', (req, res) => {
    res.render("form.ejs");
});

app.get('/about',(req,res)=>{
    res.render("about.ejs");
});

app.post('/add', async (req,res)=>{
    console.log(req.body);
    let newFriend = new User(req.body);
    newFriend = await newFriend.save();
    // res.status(201).json(newFriend);
    res.redirect('/');

});

export default app;