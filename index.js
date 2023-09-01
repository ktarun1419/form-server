

const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const cors = require('cors') ;
const multer = require('multer');


const app = express();
app.use(express.json()) ;
app.use(cors()) ;
const storage=multer.memoryStorage()
const upload=multer({storage:storage})
app.post('/submit-form',async (req, res) => {
  const { name, email, feedback } = req.body;

  // Create a Nodemailer transporter using your email service
  const transporter = await nodemailer.createTransport({
    host: 'smtp.gmail.com',
    secure:false ,
    port: 587,
    auth: {
        user: 'mehakbrar811@gmail.com',
        pass: 'zqwngkixzazxckkn'
    }
  });
  

  const info = await transporter.sendMail({
    from: 'mehakbrar811@gmail.com', // sender address
    to: email, // list of receivers
    subject: "Hello ✔", // Subject line
    // text: `Hello ${name},\n\nThank you for your feedback:\n\n${feedback}\n\nBest regards,\nYour Team`, // plain text body
    html:`<!DOCTYPE html>
    <html lang="en">
    <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Container with ID Example</title>
    <style>
      /* Style for the container */
      #myContainer {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #f4f4f4;
        border-radius: 5px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
      }
    </style>
    </head>
    <body>
      <div>
        <img src="${feedback}" >
      </div>
    </div>
    </body>
    </html>`, // html body
  });

  console.log("Message sent: %s", info.messageId);
  res.status(200).send("Done...");
 });

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
