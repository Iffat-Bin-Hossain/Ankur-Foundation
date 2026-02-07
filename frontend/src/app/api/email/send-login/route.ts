import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
})

export async function POST(request: NextRequest) {
  try {
    const { email, name } = await request.json()

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      )
    }

    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASSWORD) {
      console.warn('Email service not configured. Skipping email.')
      return NextResponse.json(
        { message: 'Login email service not configured' },
        { status: 201 }
      )
    }

    const htmlContent = `
      <h2>Welcome back, ${name}!</h2>
      <p>You have successfully logged in to your Ankur Foundation account.</p>
      <p>If this wasn't you, please change your password immediately.</p>
      <p>For security reasons, we recommend:</p>
      <ul>
        <li>Using a strong, unique password</li>
        <li>Enabling two-factor authentication (if available)</li>
        <li>Logging out from unused devices</li>
      </ul>
      <p>Best regards,<br>Ankur Foundation Team</p>
    `

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Login Confirmation - Ankur Foundation`,
      html: htmlContent,
    }

    await transporter.sendMail(mailOptions)

    return NextResponse.json(
      { message: 'Login email sent successfully' },
      { status: 200 }
    )
  } catch (error: any) {
    console.error('Email sending error:', error)
    return NextResponse.json(
      { message: 'Email failed but login successful', error: error.message },
      { status: 201 }
    )
  }
}
