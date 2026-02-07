import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Configure your email service
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { email, name, role } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    // Verify transporter configuration
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email service not configured. Skipping email.')
      return NextResponse.json(
        { message: 'Account created but email service not configured' },
        { status: 201 }
      )
    }

    const htmlContent = `
      <h2>Welcome to Ankur Foundation, ${name}!</h2>
      <p>Thank you for signing up with us.</p>
      <p><strong>Account Details:</strong></p>
      <ul>
        <li>Email: ${email}</li>
        <li>Role: ${role || 'MEMBER'}</li>
        <li>Status: Active</li>
      </ul>
      <p>You can now log in to your account and explore our platform.</p>
      <p>If you have any questions, feel free to contact us.</p>
      <br>
      <p>Best regards,<br>Ankur Foundation Team</p>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Welcome to Ankur Foundation, ${name}!`,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Welcome email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Email sending error:', error)
    // Don't fail the registration if email fails
    return NextResponse.json(
      { message: 'Account created but email failed to send', error: error.message },
      { status: 201 }
    )
  }
}
