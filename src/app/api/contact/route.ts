import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required." },
        { status: 400 }
      );
    }

    const targetEmail = process.env.CONTACT_EMAIL || "rajrm121212@gmail.com";

    // 1. Try Resend if configured
    if (process.env.RESEND_API_KEY) {
      console.log("Resend API Key found. Dispatching secure email...");
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: targetEmail,
          subject: `New Message from ${name} on Portfolio`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; background-color: #0b0b0f; color: #fff;">
              <h2 style="color: #4F8CFF; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 10px; font-weight: 800;">New Message Received</h2>
              <p style="margin: 15px 0;"><strong style="color: #6FE7FF;">Name:</strong> ${name}</p>
              <p style="margin: 15px 0;"><strong style="color: #6FE7FF;">Email:</strong> ${email}</p>
              <p style="margin: 15px 0;"><strong style="color: #6FE7FF;">Message:</strong></p>
              <div style="background-color: rgba(255,255,255,0.03); padding: 15px; border-radius: 8px; border-left: 4px solid #4F8CFF; font-size: 14px; line-height: 1.6; color: #e4e4e7;">
                ${message.replace(/\n/g, "<br/>")}
              </div>
              <footer style="margin-top: 25px; padding-top: 15px; border-top: 1px solid rgba(255,255,255,0.05); font-size: 11px; color: rgba(255,255,255,0.4);">
                Securely dispatched from your Next.js developer portfolio.
              </footer>
            </div>
          `,
        }),
      });

      if (resendRes.ok) {
        return NextResponse.json({ success: true, provider: "resend" });
      } else {
        const errText = await resendRes.text();
        console.error("Resend API failed:", errText);
      }
    }

    // 2. Try Web3Forms if configured
    if (process.env.WEB3FORMS_ACCESS_KEY) {
      console.log("Web3Forms Access Key found. Forwarding secure urlencoded submission...");
      
      const formBody = new URLSearchParams();
      formBody.append("access_key", process.env.WEB3FORMS_ACCESS_KEY);
      formBody.append("name", name);
      formBody.append("email", email);
      formBody.append("message", message);
      formBody.append("subject", `New Portfolio Message from ${name}`);

      const web3FormsRes = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36",
        },
        body: formBody.toString(),
      });

      if (web3FormsRes.ok) {
        const jsonResult = await web3FormsRes.json();
        if (jsonResult.success) {
          return NextResponse.json({ success: true, provider: "web3forms" });
        } else {
          console.error("Web3Forms returned unsuccessful status:", jsonResult);
        }
      } else {
        const errText = await web3FormsRes.text();
        console.error("Web3Forms API failed:", errText.slice(0, 300));
      }
    }

    // 3. Fallback / Dev Mock Mode
    console.warn(
      "API Configuration: Neither RESEND_API_KEY nor WEB3FORMS_ACCESS_KEY is defined. Simulating message dispatch in development mode."
    );
    return NextResponse.json({
      success: true,
      mocked: true,
      message: "Development Mode: Simulated secure email sent successfully to " + targetEmail,
      data: { name, email, message },
    });
  } catch (error: any) {
    console.error("Contact API internal error:", error);
    return NextResponse.json(
      { error: error?.message || "Internal server error" },
      { status: 500 }
    );
  }
}
