let nodemailer=require("nodemailer");

const sendEmail=async(to, subject, text)=>{
    let transporter=nodemailer.createTransport({
        service:"Gmail",
        auth:{
            user:"hazrabinayak2018@gmail.com",
            pass:"ccud enow httb ytzc",
        }
    })

    let mailOption={
        from:"hazrabinayak2018@gmail.com",
        to,
        subject,
        text
    }

    await transporter.sendMail(mailOption)
}

module.exports={sendEmail};