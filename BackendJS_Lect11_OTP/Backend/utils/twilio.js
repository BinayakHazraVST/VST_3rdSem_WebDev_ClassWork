// const twilio=require("twilio");

// const accountSid="AC4248e43a48c1956eaff0cb8bf2a11d09"
// const authToken="2a35c0050f3e848343b6c7cea315affc"

// const client=new twilio(accountSid, authToken);

// const sendOtp=(phoneNumber, otp)=>{
//     return client.messages.create({
//         body:`Your otp: ${otp}`,
//         from:`+17372508034`,
//         to:phoneNumber
//     })
// }

// module.exports=sendOtp;


const twilio = require("twilio"); // Or, for ESM: import twilio from "twilio";

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid =  "AC4248e43a48c1956eaff0cb8bf2a11d09";
const authToken = "2a35c0050f3e848343b6c7cea315affc";
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    body: "sms_2fa",
    from: "+17372508034",
    to: "+917439573482",
  });

  console.log(message.sid);
}


module.exports=createMessage;

