const express = require('express');
const multer = require('multer');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const upload = multer(); // handle multipart/form-data

app.use(cors()); // allow frontend connection
app.use(express.json());

app.post('/send-email', upload.single('file'), async (req, res) => {
  try {
    console.log('📨 Request received');
    console.log('📎 File received:', req.file);

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'projenius2025@gmail.com',
        pass: 'voakqbknlwjmsnwd' // app password
      }
    });

    const mailOptions = {
      from: 'projenius2025@gmail.com',
      to: 'startupcell@psnacet.edu.in',
      subject: 'New Application Form Submitted',
      text: 'Please find the attached application form in PDF.',
      attachments: [
        {
          filename: 'ApplicationForm.pdf',
          content: req.file.buffer,
        }
      ]
    };

    await transporter.sendMail(mailOptions);
    console.log('✅ Email sent!');
    res.status(200).send('Email sent successfully!');
  } catch (error) {
    console.error('❌ Error sending email:', error);
    res.status(500).send('Error sending email');
  }
});

// Start server
app.listen(5000, () => {
  console.log('🚀 Server started on http://localhost:5000');
});
