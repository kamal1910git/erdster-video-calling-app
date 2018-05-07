import nodemailer from 'nodemailer';

module.exports = function(app) {
    app.post('/api/v0/sendemail', function (req, res) {  
        
        var to = req.body.toemail; 
        var from = process.env.SMTP_SENDER;
        var subject = req.body.subject;
        var html = req.body.mailbody;
        var status = false;
    
        nodemailer.createTestAccount((err, account) => {
    
        let transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: false, 
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });
    
        let mailOptions = {
            from: from,
            to: to,
            subject: subject,
            html: html
        };
    
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                status = false;
                console.log(error);            
            }
            else
            {       
                status = true;   
                console.log('Message sent: %s', info.messageId);
                console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));                
            }
        });
    
        }); 
        if(status)
        {
        console.log(status);
        res.send({
            status: 'success',
            data: resp
        });
        }
        else
        {
        console.log(status);
        res.send({
            status: 'error'
        });
        }
    });
}