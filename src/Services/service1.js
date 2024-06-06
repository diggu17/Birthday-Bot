import sendEmail from './notification.js';
import User from '../Models/user.model.js';


async function cronService(){
    try{
        const todayDate = `${new Date().getDate() + 1}/${new Date().getMonth() + 1}`;
        // Getting all those friends name whose birthday is tomorrow
        const friend = await User.find({ dob: todayDate });
        if (friend.length !== 0) {
            console.log("inside cronServie if condition");
            for (const iterator of friend) {
                await sendEmail(iterator.name,iterator.email,iterator.Pmessage);
            }
        }else {
            console.log("inside cronServie else condition")
            await sendEmail('Test User','digvijaysinghthakur17@gmail.com','Working Birthday Bot');
            console.info("No birthday for today.", todayDate);
        }
    }
    catch(error){
        console.log("inside catch");
        console.error('cron-service.js', error);
    }
}

export default cronService;