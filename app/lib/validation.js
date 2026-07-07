// Shared contact-form validation — imported by both the client form and the
// API route so the rules can never drift apart. Server-side always re-runs
// this; client-side validation is a convenience, not a gate.

export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 100,
  subject: 150,
  message: 5000,
};

// Pragmatic email shape check (full RFC 5322 is overkill and rejects real
// addresses); length is enforced separately.
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

// Strips control/format characters (keeps \n and \t for multiline fields)
// and trims surrounding whitespace.
export function cleanText(value, { multiline = false } = {}) {
  if (typeof value !== 'string') return '';
  const stripped = multiline
    ? value.replace(/[^\P{C}\n\t]/gu, '')
    : value.replace(/\p{C}/gu, '');
  return stripped.trim();
}

// Validates and sanitizes raw form data. Returns `{ values, errors }` where
// `errors` maps field name → friendly message; an empty `errors` means the
// cleaned `values` are safe to use.
export function validateContact(data = {}) {
  const values = {
    name: cleanText(data.name),
    email: cleanText(data.email),
    company: cleanText(data.company),
    subject: cleanText(data.subject),
    message: cleanText(data.message, { multiline: true }),
  };

  const errors = {};

  if (!values.name) {
    errors.name = 'Please tell me your name.';
  } else if (values.name.length > FIELD_LIMITS.name) {
    errors.name = `Name must be ${FIELD_LIMITS.name} characters or fewer.`;
  }

  if (!values.email) {
    errors.email = 'Please add your email so I can reply.';
  } else if (values.email.length > FIELD_LIMITS.email) {
    errors.email = `Email must be ${FIELD_LIMITS.email} characters or fewer.`;
  } else if (!EMAIL_RE.test(values.email)) {
    errors.email = 'That email address doesn’t look right.';
  }

  if (values.company.length > FIELD_LIMITS.company) {
    errors.company = `Company must be ${FIELD_LIMITS.company} characters or fewer.`;
  }

  if (values.subject.length > FIELD_LIMITS.subject) {
    errors.subject = `Subject must be ${FIELD_LIMITS.subject} characters or fewer.`;
  }

  if (!values.message) {
    errors.message = 'Please write a short message.';
  } else if (values.message.length > FIELD_LIMITS.message) {
    errors.message = `Message must be ${FIELD_LIMITS.message} characters or fewer.`;
  }

  return { values, errors };
}
