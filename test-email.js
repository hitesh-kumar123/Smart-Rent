require("dotenv").config();
const { Resend } = require("resend");

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

async function testEmailSending() {
  try {
    console.log("Testing email sending with Resend API");
    console.log(
      `Using API key: ${process.env.RESEND_API_KEY ? "Key exists" : "Key missing"}`
    );

    const { data, error } = await resend.emails.send({
      from: "Smart Rent System <onboarding@resend.dev>",
      to: "try.other220@gmail.com",
      subject: "Test Email from Resend API",
      html: `
        <h1>Test Email</h1>
        <p>This is a test email sent using the Resend API.</p>
        <p>If you received this email, the API is working correctly.</p>
      `,
    });

    if (error) {
      console.error("Error sending test email:", error);
      return;
    }

    console.log("Test email sent successfully:", data);
  } catch (error) {
    console.error("Error in testEmailSending:", error);
  }
}

// Run the test
testEmailSending();
