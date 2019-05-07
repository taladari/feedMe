const express = require('express');
const nodemailer = require('nodemailer');
const config = require('config');
const router = express.Router();

router.post('/', async (req, res) => {

    const { name, email, subject, message } = req.body;
    

    if (!name || !email || !message) return json.status(401).json({ msg: "Fill all form values" });

    try {
        
        let smtpTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: config.get('email'),
                pass: config.get('emailPassword')
            }
        });

        let info = await smtpTransporter.sendMail({
            from: `${name} ${email}`,
            to: config.get('email'),
            subject,
            text: message,
            html: `<p>${message}</p>`
        });

        res.json({ msg: 'success' });

    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ msg: 'Error sending contact form' });
    }

});

module.exports = router;