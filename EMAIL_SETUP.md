# Email Setup for SerenaWell Contact Form

The contact form now sends emails to `hello@serenawell.com` when users submit the form using PrivateEmail from Namecheap.

## Required Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# Email Configuration for Contact Form (PrivateEmail from Namecheap)
SMTP_HOST=mail.privateemail.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-privateemail-password
```

## PrivateEmail Setup (Namecheap)

### Step 1: Get Your PrivateEmail Credentials
1. Log into your Namecheap account
2. Navigate to your PrivateEmail dashboard
3. Use your full email address (e.g., `hello@serenawell.com`) as `SMTP_USER`
4. Use your PrivateEmail account password as `SMTP_PASS`

### SMTP Settings for PrivateEmail
Based on the official [Namecheap documentation](https://truehost.com/namecheap-private-email-smtp-settings/):
- **SMTP Server**: `mail.privateemail.com` (or `smtp.privateemail.com`)
- **Port**: `465` for SSL (recommended) or `587` for TLS
- **Encryption**: SSL (for port 465) or TLS (for port 587)
- **Username**: Your full email address
- **Password**: Your PrivateEmail account password

### Alternative Email Providers
If you're not using PrivateEmail:
- **Gmail**: `smtp.gmail.com`, port 587, requires app password
- **Outlook/Hotmail**: `smtp.live.com`, port 587
- **Yahoo**: `smtp.mail.yahoo.com`, port 587

## Testing the Contact Form

1. Install dependencies: `npm install`
2. Set up your `.env.local` file with valid SMTP credentials
3. Start the development server: `npm run dev`
4. Navigate to the contact section and submit a test message
5. Check that the email arrives at `hello@serenawell.com`

## Email Template

The email includes:
- Sender's name and email
- Subject line prefixed with "Contact Form:"
- Formatted message with SerenaWell branding
- Reply-to address for easy responses

## Security Notes

- Never commit `.env.local` to version control
- Use your actual PrivateEmail account password (not an app password)
- Ensure your PrivateEmail account has 2FA enabled for security
- Consider monitoring your email usage through Namecheap's dashboard

## Troubleshooting

If emails are not sending:
1. Verify your PrivateEmail credentials in Namecheap dashboard
2. Check that your domain's MX records are properly configured
3. Ensure no firewall is blocking outbound connections on port 465/587
4. Try switching between port 465 (SSL) and 587 (TLS) if having issues
5. Check Namecheap's service status for any outages 