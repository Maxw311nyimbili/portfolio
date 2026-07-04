import nodemailer from 'nodemailer';

// Contact relay. The destination address lives only in the GMAIL_EMAIL
// env var — it is never sent to, or rendered on, the client.

const LIMITS = { name: 100, email: 200, subject: 150, text: 5000 };

// Basic per-IP rate limit. In-memory, so it resets per serverless
// instance — a deterrent against casual abuse, not a hard guarantee.
const WINDOW_MS = 15 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map();

function rateLimited(ip) {
    const now = Date.now();
    const entry = hits.get(ip) || { count: 0, start: now };
    if (now - entry.start > WINDOW_MS) {
        entry.count = 0;
        entry.start = now;
    }
    entry.count += 1;
    hits.set(ip, entry);
    if (hits.size > 5000) hits.clear();
    return entry.count > MAX_PER_WINDOW;
}

function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.setHeader('Allow', ['POST']);
        return res.status(405).json({ message: 'Method not allowed' });
    }

    const ip =
        (req.headers['x-forwarded-for'] || '').split(',')[0].trim() ||
        req.socket?.remoteAddress ||
        'unknown';
    if (rateLimited(ip)) {
        return res.status(429).json({ message: 'Too many requests. Try again later.' });
    }

    const { name, email, subject, text, company } = req.body || {};

    // Honeypot: real users never see this field. Pretend success so
    // bots don't learn they were filtered.
    if (company) {
        return res.status(200).json({ message: 'Message sent' });
    }

    for (const [field, max] of Object.entries(LIMITS)) {
        const value = req.body?.[field];
        if (typeof value !== 'string' || !value.trim() || value.length > max) {
            return res.status(400).json({ message: 'Invalid form input' });
        }
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        return res.status(400).json({ message: 'Invalid form input' });
    }

    if (!process.env.GMAIL_EMAIL || !process.env.GMAIL_PASSWORD) {
        console.error('Contact API: GMAIL_EMAIL / GMAIL_PASSWORD not configured');
        return res.status(500).json({ message: 'Unable to send message' });
    }

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_EMAIL,
            pass: process.env.GMAIL_PASSWORD,
        },
    });

    const safe = {
        name: escapeHtml(name),
        email: escapeHtml(email),
        subject: escapeHtml(subject),
        text: escapeHtml(text),
    };

    const mailOptions = {
        // From must be the authenticated account or Gmail rejects/rewrites
        // it; the visitor's address goes in replyTo so replying just works.
        from: process.env.GMAIL_EMAIL,
        replyTo: email,
        to: process.env.GMAIL_EMAIL,
        subject: `Portfolio Contact: ${subject.slice(0, LIMITS.subject)}`,
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${text}`,
        html: `
            <h3>New Contact Form Submission</h3>
            <p><strong>Name:</strong> ${safe.name}</p>
            <p><strong>Email:</strong> ${safe.email}</p>
            <p><strong>Subject:</strong> ${safe.subject}</p>
            <p><strong>Message:</strong></p>
            <p>${safe.text.replace(/\n/g, '<br>')}</p>
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ message: 'Message sent' });
    } catch (error) {
        console.error('Contact API: send failed —', error?.message);
        return res.status(500).json({ message: 'Unable to send message' });
    }
}
