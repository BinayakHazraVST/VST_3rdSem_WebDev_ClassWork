let nodemailer=require("nodemailer");

let sendEmail=async(to, subject, text)=>{
    let transporter=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"hazrabinayak2018@gmail.com",
            pass:"nzcr okmc ltmu vsrt"
        }
    });

    let mailOptions={
        from:"hazrabinayak2018@gmail.com",
        to, subject, text
    }

    await transporter.sendMail(mailOptions);
}

module.exports=sendEmail;