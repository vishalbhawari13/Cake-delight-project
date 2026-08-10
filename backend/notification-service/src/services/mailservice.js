const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",

  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_APP_PASSWORD,
  },
});


// Verify Gmail connection
const verifyMailConnection = async () => {
  try {
    await transporter.verify();

    console.log("Mail Service Connected");
  } catch (error) {
    console.error(
      "Mail Service Connection Failed:",
      error.message
    );

    throw error;
  }
};


// Send Order Confirmation Email
const sendOrderConfirmation = async ({
  email,
  customerName,
  orderId,
  items,
  totalAmount,
}) => {

  const itemRows = items
    .map(
      (item) => `
        <tr>
          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ${item.cakeName}
          </td>

          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ${item.quantity}
          </td>

          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ₹${item.price}
          </td>

          <td style="padding: 10px; border-bottom: 1px solid #ddd;">
            ₹${item.price * item.quantity}
          </td>
        </tr>
      `
    )
    .join("");


  const mailOptions = {
    from: `"Cake Delight" <${process.env.MAIL_USER}>`,

    to: email,

    subject: `Order Confirmation - ${orderId}`,

    text: `
Hello ${customerName},

Thank you for ordering from Cake Delight.

Your order has been placed successfully.

Order ID: ${orderId}

Total Amount: ₹${totalAmount}

Your order is currently being processed.

Thank you,
Cake Delight
    `,

    html: `
      <div style="
        font-family: Arial, sans-serif;
        max-width: 700px;
        margin: auto;
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 10px;
      ">

        <h1 style="text-align: center;">
          🎂 Cake Delight
        </h1>

        <h2>
          Order Confirmed! 🎉
        </h2>

        <p>
          Hello <strong>${customerName}</strong>,
        </p>

        <p>
          Thank you for ordering from Cake Delight.
          Your order has been placed successfully.
        </p>

        <p>
          <strong>Order ID:</strong>
          ${orderId}
        </p>

        <table style="
          width: 100%;
          border-collapse: collapse;
          margin-top: 20px;
        ">

          <thead>

            <tr style="
              background-color: #f5f5f5;
            ">

              <th style="padding: 10px;">
                Cake
              </th>

              <th style="padding: 10px;">
                Quantity
              </th>

              <th style="padding: 10px;">
                Price
              </th>

              <th style="padding: 10px;">
                Subtotal
              </th>

            </tr>

          </thead>

          <tbody>

            ${itemRows}

          </tbody>

        </table>

        <h2 style="
          text-align: right;
          margin-top: 20px;
        ">
          Total: ₹${totalAmount}
        </h2>

        <p>
          Your order is currently being processed.
        </p>

        <p>
          Thank you for choosing
          <strong>Cake Delight</strong>!
        </p>

      </div>
    `,
  };


  const info = await transporter.sendMail(
    mailOptions
  );


  console.log(
    "Email sent successfully:",
    info.messageId
  );


  return info;
};


module.exports = {
  verifyMailConnection,
  sendOrderConfirmation,
};