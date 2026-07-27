'use client';

import { useEffect, useRef, useState } from 'react';
import { FIELD_LIMITS, validateContact } from '../lib/validation.js';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

const EMPTY = { name: '', email: '', company: '', subject: '', message: '' };

const FIELDS = [
  { id: 'name', label: 'Full Name', type: 'text', required: true, autoComplete: 'name' },
  { id: 'email', label: 'Email Address', type: 'email', required: true, autoComplete: 'email' },
  { id: 'company', label: 'Company', type: 'text', required: false, autoComplete: 'organization' },
  { id: 'subject', label: 'Subject', type: 'text', required: false, autoComplete: 'off' },
];

export default function ContactForm() {
  const [values, setValues] = useState(EMPTY);
  const [trap, setTrap] = useState(''); // honeypot
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [feedback, setFeedback] = useState('');
  const [shouldLoadTurnstile, setShouldLoadTurnstile] = useState(false);

  const formRef = useRef(null);
  const widgetRef = useRef(null);
  const widgetIdRef = useRef(null);
  const tokenRef = useRef('');
  const sendingRef = useRef(false);

  const loadTurnstileOnIntent = () => {
    if (SITE_KEY) setShouldLoadTurnstile(true);
  };

  // Load the Turnstile script once the visitor interacts with the form and
  // render the widget, matching the site's current light/dark theme.
  useEffect(() => {
    if (!SITE_KEY || !shouldLoadTurnstile || !widgetRef.current) return undefined;
    let cancelled = false;

    const render = () => {
      if (cancelled || !window.turnstile || !widgetRef.current) return;
      if (widgetIdRef.current !== null) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
      widgetIdRef.current = window.turnstile.render(widgetRef.current, {
        sitekey: SITE_KEY,
        theme: document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
        callback: (token) => {
          tokenRef.current = token;
        },
        'expired-callback': () => {
          tokenRef.current = '';
        },
        'error-callback': () => {
          tokenRef.current = '';
        },
      });
    };

    let script = document.querySelector('script[data-turnstile]');
    if (window.turnstile) {
      render();
    } else {
      if (!script) {
        script = document.createElement('script');
        script.src = TURNSTILE_SRC;
        script.async = true;
        script.defer = true;
        script.dataset.turnstile = 'true';
        document.head.appendChild(script);
      }
      script.addEventListener('load', render);
    }

    const themeObserver = new MutationObserver(render);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    return () => {
      cancelled = true;
      themeObserver.disconnect();
      script?.removeEventListener('load', render);
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }
    };
  }, [shouldLoadTurnstile]);

  const setField = (id) => (event) => {
    setValues((prev) => ({ ...prev, [id]: event.target.value }));
    // Clear a field's error as soon as the visitor starts fixing it.
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const { [id]: _gone, ...rest } = prev;
      return rest;
    });
  };

  const focusFirstError = (fieldErrors) => {
    const first = ['name', 'email', 'company', 'subject', 'message'].find(
      (id) => fieldErrors[id],
    );
    if (first) formRef.current?.querySelector(`#contact-${first}`)?.focus();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (sendingRef.current) return; // no duplicate submissions

    const { values: clean, errors: fieldErrors } = validateContact(values);
    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      setStatus('error');
      setFeedback('Please fix the highlighted fields.');
      focusFirstError(fieldErrors);
      return;
    }

    if (SITE_KEY && !tokenRef.current) {
      setShouldLoadTurnstile(true);
      setStatus('error');
      setFeedback('Please complete the verification check first.');
      return;
    }

    sendingRef.current = true;
    setStatus('sending');
    setFeedback('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...clean,
          website: trap,
          turnstileToken: tokenRef.current,
        }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.ok) {
        setStatus('success');
        setFeedback('Message sent! Thanks for reaching out — I’ll reply within a day.');
        setValues(EMPTY);
        setErrors({});
      } else {
        setStatus('error');
        if (res.status === 400 && data.errors) {
          setErrors(data.errors);
          focusFirstError(data.errors);
        }
        setFeedback(
          data.message || 'Couldn’t send your message right now. Please try again.',
        );
      }
    } catch {
      setStatus('error');
      setFeedback('Network hiccup — please check your connection and try again.');
    } finally {
      sendingRef.current = false;
      // Tokens are single-use; get a fresh one for the next attempt.
      tokenRef.current = '';
      if (widgetIdRef.current !== null && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    }
  };

  const sending = status === 'sending';

  return (
    <form
      ref={formRef}
      className="contact-form reveal"
      onSubmit={handleSubmit}
      onFocusCapture={loadTurnstileOnIntent}
      onPointerDownCapture={loadTurnstileOnIntent}
      noValidate
    >
      <div className="contact-form__grid">
        {FIELDS.map((f) => (
          <div className="contact-form__field" key={f.id}>
            <label className="contact-form__label" htmlFor={`contact-${f.id}`}>
              {f.label}
              {f.required ? (
                <span className="contact-form__req" aria-hidden="true">
                  {' '}
                  *
                </span>
              ) : (
                <span className="contact-form__opt"> · optional</span>
              )}
            </label>
            <input
              id={`contact-${f.id}`}
              name={f.id}
              type={f.type}
              value={values[f.id]}
              onChange={setField(f.id)}
              maxLength={FIELD_LIMITS[f.id]}
              required={f.required}
              autoComplete={f.autoComplete}
              disabled={sending}
              aria-required={f.required}
              aria-invalid={Boolean(errors[f.id])}
              aria-describedby={errors[f.id] ? `contact-${f.id}-error` : undefined}
            />
            {errors[f.id] && (
              <p className="contact-form__error" id={`contact-${f.id}-error`}>
                {errors[f.id]}
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-message">
          Message
          <span className="contact-form__req" aria-hidden="true">
            {' '}
            *
          </span>
        </label>
        <textarea
          id="contact-message"
          name="message"
          rows={6}
          value={values.message}
          onChange={setField('message')}
          maxLength={FIELD_LIMITS.message}
          required
          disabled={sending}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="Tell me about your project, role, or idea…"
        />
        {errors.message && (
          <p className="contact-form__error" id="contact-message-error">
            {errors.message}
          </p>
        )}
      </div>

      {/* Honeypot — hidden from real visitors and screen readers. */}
      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(e) => setTrap(e.target.value)}
        />
      </div>

      {SITE_KEY && <div className="contact-form__turnstile" ref={widgetRef} />}

      <div className="contact-form__footer">
        <button
          type="submit"
          className="btn btn--gradient contact-form__submit"
          disabled={sending}
        >
          {sending ? (
            <>
              <span className="contact-form__spinner" aria-hidden="true" />
              Sending…
            </>
          ) : (
            'Send Message'
          )}
        </button>
        <p
          className={`contact-form__status ${
            status === 'success'
              ? 'contact-form__status--success'
              : status === 'error'
                ? 'contact-form__status--error'
                : ''
          }`}
          role="status"
          aria-live="polite"
        >
          {feedback}
        </p>
      </div>
    </form>
  );
}
