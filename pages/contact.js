import { useState } from 'react';
import SiteLayout from '../components/SiteLayout';

// Standalone contact page. Deliberately never renders an email
// address — messages go through /api/contact, which delivers
// server-side. The "company" field is a honeypot for bots.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', text: '', company: '' });
    const [status, setStatus] = useState(null);
    const [sending, setSending] = useState(false);
    const [emailError, setEmailError] = useState(null);

    const onChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        if (e.target.name === 'email' && emailError) setEmailError(null);
    };

    const checkEmail = () => {
        if (form.email && !EMAIL_RE.test(form.email)) {
            setEmailError('THIS DOES NOT LOOK LIKE A VALID ADDRESS — my reply goes here, so double-check it.');
            return false;
        }
        setEmailError(null);
        return true;
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (!EMAIL_RE.test(form.email)) {
            setEmailError('THIS DOES NOT LOOK LIKE A VALID ADDRESS — my reply goes here, so double-check it.');
            return;
        }
        setSending(true);
        setStatus(null);
        const replyAddress = form.email;
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('send failed');
            setStatus({ ok: true, msg: `MESSAGE SENT — my reply will go to ${replyAddress}.` });
            setForm({ name: '', email: '', subject: '', text: '', company: '' });
        } catch {
            setStatus({ ok: false, msg: 'SOMETHING WENT WRONG — please try again in a minute.' });
        } finally {
            setSending(false);
        }
    };

    return (
        <SiteLayout
            title="Contact — Maxwell Nyimbili"
            description="Get in touch with Maxwell Nyimbili."
        >
            <div className="page-head">
                <h1>Let&apos;s build something.</h1>
                <p>
                    Have a project, a role, or an idea worth discussing? Send a message —
                    it lands straight in my inbox.
                </p>
            </div>

            <div className="contact-wrap">
                <div className="contact-info" data-reveal>
                    <div className="section-label">DIRECT</div>
                    <p>
                        The form is the fastest way to reach me. You can also find me on
                        GitHub and LinkedIn — links in the footer.
                    </p>
                    <p>Based in Lusaka, Zambia. Open to remote work worldwide.</p>
                </div>

                <form
                    className="contact-form"
                    onSubmit={onSubmit}
                    data-reveal
                    style={{ '--reveal-delay': '120ms' }}
                >
                    <div className="field">
                        <label htmlFor="name">NAME</label>
                        <input id="name" name="name" value={form.name} onChange={onChange} required maxLength={100} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">YOUR EMAIL</label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            value={form.email}
                            onChange={onChange}
                            onBlur={checkEmail}
                            className={emailError ? 'invalid' : undefined}
                            required
                            maxLength={200}
                        />
                        {emailError ? (
                            <div className="field-error">{emailError}</div>
                        ) : (
                            <div className="field-hint">I reply to this address — make sure it&apos;s one you check.</div>
                        )}
                    </div>
                    <div className="field">
                        <label htmlFor="subject">SUBJECT</label>
                        <input id="subject" name="subject" value={form.subject} onChange={onChange} required maxLength={150} />
                    </div>
                    {/* Honeypot — hidden from humans; bots that fill it are dropped */}
                    <div className="field field-hp" aria-hidden="true">
                        <label htmlFor="company">COMPANY</label>
                        <input id="company" name="company" value={form.company} onChange={onChange} tabIndex={-1} autoComplete="off" />
                    </div>
                    <div className="field">
                        <label htmlFor="text">MESSAGE</label>
                        <textarea id="text" name="text" value={form.text} onChange={onChange} required maxLength={5000} />
                    </div>
                    <button className="submit-btn" type="submit" disabled={sending}>
                        {sending ? 'SENDING…' : 'SEND MESSAGE →'}
                    </button>
                    {status && (
                        <div className={`form-status ${status.ok ? 'ok' : 'err'}`}>{status.msg}</div>
                    )}
                </form>
            </div>
        </SiteLayout>
    );
}
