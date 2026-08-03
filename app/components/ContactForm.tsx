'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import type { SubmitErrorHandler, SubmitHandler } from 'react-hook-form';
import { FIELD_LIMITS } from '../lib/contact-fields';
import {
  contactApiResponseSchema,
  contactFormSchema,
  EMPTY_CONTACT_VALUES,
  isContactField,
} from '../lib/contact-schema';
import type {
  ContactField,
  ContactFormInput,
  ContactFormValues,
} from '../lib/contact-schema';

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
const TURNSTILE_SRC =
  'https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit';

type ContactStatus = 'idle' | 'sending' | 'success' | 'error';
type ShortContactField = Exclude<ContactField, 'message'>;

interface ContactFormProps {
  eagerTurnstile?: boolean;
}

interface FieldDefinition {
  id: ShortContactField;
  label: string;
  type: 'email' | 'text';
  required: boolean;
  autoComplete: string;
  placeholder: string;
}

const FIELDS = [
  {
    id: 'name',
    label: 'Full Name',
    type: 'text',
    required: true,
    autoComplete: 'name',
    placeholder: 'e.g. Juan Dela Cruz',
  },
  {
    id: 'email',
    label: 'Email Address',
    type: 'email',
    required: true,
    autoComplete: 'email',
    placeholder: 'you@example.com',
  },
  {
    id: 'company',
    label: 'Company',
    type: 'text',
    required: false,
    autoComplete: 'organization',
    placeholder: 'e.g. P-Devs',
  },
  {
    id: 'subject',
    label: 'Subject',
    type: 'text',
    required: false,
    autoComplete: 'off',
    placeholder: 'e.g. Website redesign inquiry',
  },
] satisfies readonly FieldDefinition[];

export default function ContactForm({
  eagerTurnstile = false,
}: ContactFormProps) {
  const [trap, setTrap] = useState('');
  const [status, setStatus] = useState<ContactStatus>('idle');
  const [feedback, setFeedback] = useState('');
  const [shouldLoadTurnstile, setShouldLoadTurnstile] = useState(
    Boolean(SITE_KEY && eagerTurnstile),
  );

  const formRef = useRef<HTMLFormElement>(null);
  const widgetRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const tokenRef = useRef('');
  const sendingRef = useRef(false);

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormInput, unknown, ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: EMPTY_CONTACT_VALUES,
    mode: 'onBlur',
    reValidateMode: 'onChange',
    shouldFocusError: true,
  });

  const loadTurnstileOnIntent = useCallback((): void => {
    if (SITE_KEY) setShouldLoadTurnstile(true);
  }, []);

  useEffect(() => {
    if (
      !SITE_KEY ||
      eagerTurnstile ||
      shouldLoadTurnstile ||
      !formRef.current
    ) {
      return undefined;
    }
    if (typeof IntersectionObserver === 'undefined') {
      setShouldLoadTurnstile(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoadTurnstile(true);
          observer.disconnect();
        }
      },
      { rootMargin: '700px 0px', threshold: 0.01 },
    );
    observer.observe(formRef.current);
    return () => observer.disconnect();
  }, [eagerTurnstile, shouldLoadTurnstile]);

  useEffect(() => {
    const siteKey = SITE_KEY;
    if (!siteKey || !shouldLoadTurnstile || !widgetRef.current) return undefined;
    let cancelled = false;

    const render = (): void => {
      const turnstile = window.turnstile;
      const widget = widgetRef.current;
      if (cancelled || !turnstile || !widget) return;

      if (widgetIdRef.current !== null) {
        tokenRef.current = '';
        turnstile.remove(widgetIdRef.current);
        widgetIdRef.current = null;
      }

      widgetIdRef.current = turnstile.render(widget, {
        sitekey: siteKey,
        action: 'contact',
        theme: document.documentElement.dataset.theme === 'light' ? 'light' : 'dark',
        callback: (token) => {
          tokenRef.current = token;
          setFeedback((current) =>
            current === 'Please complete the verification check first.' ? '' : current,
          );
          setStatus((current) => (current === 'error' ? 'idle' : current));
        },
        'expired-callback': () => {
          tokenRef.current = '';
        },
        'error-callback': () => {
          tokenRef.current = '';
        },
      });
    };

    let script = document.querySelector<HTMLScriptElement>('script[data-turnstile]');
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

  const applyServerErrors = useCallback(
    (fieldErrors: Record<string, string>): void => {
      let shouldFocus = true;
      for (const [field, message] of Object.entries(fieldErrors)) {
        if (!isContactField(field)) continue;
        setError(field, { type: 'server', message }, { shouldFocus });
        shouldFocus = false;
      }
    },
    [setError],
  );

  const onInvalid: SubmitErrorHandler<ContactFormInput> = useCallback(() => {
    setStatus('error');
    setFeedback('Please fix the highlighted fields.');
  }, []);

  const onSubmit: SubmitHandler<ContactFormValues> = useCallback(
    async (values) => {
      if (sendingRef.current) return;

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
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...values,
            website: trap,
            turnstileToken: tokenRef.current,
          }),
        });
        const rawData: unknown = await response.json().catch(() => ({}));
        const parsedResponse = contactApiResponseSchema.safeParse(rawData);
        const data = parsedResponse.success ? parsedResponse.data : {};

        if (response.ok) {
          setStatus('success');
          setFeedback('Message sent! Thanks for reaching out \u2014 I\u2019ll reply within a day.');
          reset(EMPTY_CONTACT_VALUES);
          setTrap('');
        } else {
          setStatus('error');
          if (response.status === 400 && data.errors) {
            applyServerErrors(data.errors);
          }
          setFeedback(
            data.message || 'Couldn\u2019t send your message right now. Please try again.',
          );
        }
      } catch {
        setStatus('error');
        setFeedback('Network hiccup \u2014 please check your connection and try again.');
      } finally {
        sendingRef.current = false;
        tokenRef.current = '';
        if (widgetIdRef.current !== null && window.turnstile) {
          window.turnstile.reset(widgetIdRef.current);
        }
      }
    },
    [applyServerErrors, reset, trap],
  );

  const sending = isSubmitting || status === 'sending';

  return (
    <form
      ref={formRef}
      className="contact-form reveal"
      onSubmit={handleSubmit(onSubmit, onInvalid)}
      onFocusCapture={loadTurnstileOnIntent}
      onPointerDownCapture={loadTurnstileOnIntent}
      noValidate
    >
      <div className="contact-form__grid">
        {FIELDS.map((field) => {
          const error = errors[field.id]?.message;
          return (
            <div className="contact-form__field" key={field.id}>
              <label className="contact-form__label" htmlFor={`contact-${field.id}`}>
                {field.label}
                {field.required ? (
                  <span className="contact-form__req" aria-hidden="true"> *</span>
                ) : (
                  <span className="contact-form__opt"> · optional</span>
                )}
              </label>
              <input
                id={`contact-${field.id}`}
                type={field.type}
                maxLength={FIELD_LIMITS[field.id]}
                required={field.required}
                autoComplete={field.autoComplete}
                disabled={sending}
                aria-required={field.required}
                aria-invalid={Boolean(error)}
                aria-describedby={error ? `contact-${field.id}-error` : undefined}
                placeholder={field.placeholder}
                {...register(field.id)}
              />
              {error && (
                <p className="contact-form__error" id={`contact-${field.id}-error`}>
                  {error}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <div className="contact-form__field">
        <label className="contact-form__label" htmlFor="contact-message">
          Message
          <span className="contact-form__req" aria-hidden="true"> *</span>
        </label>
        <textarea
          id="contact-message"
          rows={6}
          maxLength={FIELD_LIMITS.message}
          required
          disabled={sending}
          aria-required="true"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'contact-message-error' : undefined}
          placeholder="Tell me about your project, goals, timeline, or budget..."
          {...register('message')}
        />
        {errors.message?.message && (
          <p className="contact-form__error" id="contact-message-error">
            {errors.message.message}
          </p>
        )}
      </div>

      <div className="contact-form__trap" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input
          id="contact-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={trap}
          onChange={(event) => setTrap(event.target.value)}
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
              {'Sending...'}
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
