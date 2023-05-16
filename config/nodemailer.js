let nodemailer = require('nodemailer');

export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'lyndachrystine@gmail.com',
        pass: 'mxqfuahjbmurdlec'
    }
});

export const mailOptions = {
    from: 'lyndachrystine@gmail.com'
}