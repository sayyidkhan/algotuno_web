import nodemailer from 'nodemailer';


// get all timezone in js
// https://stackoverflow.com/questions/38399465/how-to-get-list-of-all-timezones-in-javascript

export default async (req, res) => {
    if (req.method === "GET") {
        // auth
        const auth_secret = process.env.NEXT_PUBLIC_API_SECRET_KEY;
        const auth_header = req.headers.authorization;
        const auth_token = auth_header.split(" ")[1];
        console.log(auth_token);

        if (auth_token === auth_secret) {
            const date_time_now = new Date().toLocaleString("en-US", {
                timeZone: 'Asia/Singapore',
            });
            console.log(date_time_now);
            let outcome;

            // Create a SMTP transporter object
            const transporter = nodemailer.createTransport({
                host: 'smtp.ethereal.email',
                port: 587,
                auth: {
                    user: 'stefan.beatty@ethereal.email',
                    pass: 'fQwW4Uqe7TtMRAkPj6'
                }
            });

            // Message object
            const message = {
                from: '"Myself" stefan.beatty@ethereal.email',
                to: `stefan.beatty@ethereal.email`, // change to own email to test
                subject: `(NEXT_JS) Welcome to algotuno!. the time now is ${date_time_now}`,
                text: 'enjoy your day!!',
                html: '<p>enjoy your day !!</p>'
            };

            transporter.sendMail(message, (err, info) => {
                if (err) {
                    console.log('Error occurred. ' + err.message);
                    outcome = false;
                } else {
                    console.log('Message sent: %s', info.messageId);
                    // Preview only available when sending through an Ethereal account
                    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
                    outcome = true;
                }

                res.status(200).json({
                    "message": `Welcome to algotuno!. the time now is ${date_time_now}`,
                    "email_outcome": outcome,
                });
            });
        } else {
            res.status(400).json({
                "message": `Not authorised`,
            });
        }
    }
}