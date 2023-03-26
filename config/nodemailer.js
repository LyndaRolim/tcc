let nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'alemaorolim@gmail.com',
        pass: 'jtqkzeiyjwgtawmi'
    }
});

export const mailOptions = {
    from: 'alemaorolim@gmail.com'
}