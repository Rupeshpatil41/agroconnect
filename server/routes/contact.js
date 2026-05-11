const express =
  require("express");

const router =
  express.Router();

const nodemailer =
  require("nodemailer");

// =====================================
// SEND CONTACT EMAIL
// =====================================
router.post(
  "/contact",

  async (req, res) => {

    try {

      const {
        name,
        email,
        message,
      } = req.body;

      // =====================================
      // TRANSPORTER
      // =====================================
      const transporter =
        nodemailer.createTransport({
          service:
            "gmail",

          auth: {
            user:
              "agroconnect41@gmail.com",

            pass:
              "fbrl fhyf etct rpma",
          },
        });

      // =====================================
      // EMAIL
      // =====================================
      await transporter.sendMail({
        from:
          email,

        to:
          "agroconnect41@gmail.com",

        subject:
          "New AgroConnect Contact Message",

        html: `
          <h2>New Message</h2>

          <p>
            <strong>Name:</strong>
            ${name}
          </p>

          <p>
            <strong>Email:</strong>
            ${email}
          </p>

          <p>
            <strong>Message:</strong>
            ${message}
          </p>
        `,
      });

      res.json({
        message:
          "Message Sent Successfully",
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        message:
          "Error sending message",
      });
    }
  }
);

module.exports =
  router;