import { FIELD_LIMITS } from './contact-fields.js';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const trimmed = (value) => (typeof value === 'string' ? value.trim() : '');

// Lightweight feedback for the browser. The API always sanitizes and
// validates the payload again with validation.js before using any value.
export function validateContactClient(data = {}) {
  const values = {
    name: trimmed(data.name),
    email: trimmed(data.email),
    company: trimmed(data.company),
    subject: trimmed(data.subject),
    message: trimmed(data.message),
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
