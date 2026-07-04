import { useState } from 'react';
import SiteLayout from '../components/SiteLayout';

// Standalone contact page. Deliberately never renders an email
// address — messages go through /api/contact, which delivers
// server-side. The "company" field is a honeypot for bots.

export default function Contact() {
    const [form, setForm] = useState({ name: '', email: '', subject: '', text: '', company: '' });
    const [status, setStatus] = useState(null);
    const [sending, setSending] = useState(false);

    const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

    const onSubmit = async (e) => {
        e.preventDefault();
        setSending(true);
        setStatus(null);
        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            if (!res.ok) throw new Error('send failed');
            setStatus({ ok: true, msg: 'MESSAGE SENT — I will get back to you soon.' });
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
                <div className="contact-info">
                    <div className="section-label">DIRECT</div>
                    <p>
                        The form is the fastest way to reach me. You can also find me on
                        GitHub and LinkedIn — links in the footer.
                    </p>
                    <p>Based in Lusaka, Zambia. Open to remote work worldwide.</p>
                </div>

                <form className="contact-form" onSubmit={onSubmit}>
                    <div className="field">
                        <label htmlFor="name">NAME</label>
                        <input id="name" name="name" value={form.name} onChange={onChange} required maxLength={100} />
                    </div>
                    <div className="field">
                        <label htmlFor="email">YOUR EMAIL</label>
                        <input id="email" name="email" type="email" value={form.email} onChange={onChange} required maxLength={200} />
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
