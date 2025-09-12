const { Resend } = require("resend");

// Initialize Resend with API key if available, otherwise create a no-op client
let resend = null;
if (process.env.RESEND_API_KEY) {
  resend = new Resend(process.env.RESEND_API_KEY);
} else {
  console.warn("RESEND_API_KEY not set. Email sending will be skipped.");
  resend = {
    emails: {
      send: async () => {
        console.warn("Skipping email send because RESEND_API_KEY is missing.");
        return { data: { skipped: true }, error: null };
      },
    },
  };
}

const sendPasswordResetEmail = async (email, resetToken) => {
  try {
    console.log(`Attempting to send password reset email to: ${email}`);
    console.log(
      `Using Resend API key: ${process.env.RESEND_API_KEY ? "Key exists" : "Key missing"}`
    );

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log(`Reset URL: ${resetUrl}`);

    // Use onresend.com domain which is already verified with Resend
    const { data, error } = await resend.emails.send({
      from: "Smart Rent System <onboarding@resend.dev>",
      to: email,
      subject: "Password Reset Request",
      html: `
        <h1>Password Reset Request</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #007bff; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
        <p>If you didn't request this, please ignore this email.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    if (error) {
      console.error("Resend API Error:", error);
      throw new Error(`Failed to send password reset email: ${error.message}`);
    }

    console.log("Email sent successfully:", data);
    return data;
  } catch (error) {
    console.error("Error in sendPasswordResetEmail:", error);
    throw error;
  }
};

module.exports = {
  sendPasswordResetEmail,
};
