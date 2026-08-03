import { z } from 'zod';
import { FIELD_LIMITS } from './contact-fields';

// Zod's default runtime probes whether `Function()` is available so it can
// JIT-compile object schemas. That probe is safely caught, but Chrome still
// records it as a CSP eval violation. Jitless mode avoids eval entirely.
z.config({ jitless: true });

export const CONTACT_FIELDS = [
  'name',
  'email',
  'company',
  'subject',
  'message',
] as const;

export type ContactField = (typeof CONTACT_FIELDS)[number];

function cleanText(value: string, multiline = false): string {
  const stripped = multiline
    ? value.replace(/[^\P{C}\n\t]/gu, '')
    : value.replace(/\p{C}/gu, '');
  return stripped.trim();
}

const cleanedSingleLine = z.string().transform((value) => cleanText(value));
const cleanedMultiline = z.string().transform((value) => cleanText(value, true));

export const contactFormSchema = z.object({
  name: cleanedSingleLine.pipe(
    z
      .string()
      .min(1, 'Please tell me your name.')
      .max(FIELD_LIMITS.name, `Name must be ${FIELD_LIMITS.name} characters or fewer.`),
  ),
  email: cleanedSingleLine.pipe(
    z
      .string()
      .min(1, 'Please add your email so I can reply.')
      .max(FIELD_LIMITS.email, `Email must be ${FIELD_LIMITS.email} characters or fewer.`)
      .email('That email address doesn\u2019t look right.'),
  ),
  company: cleanedSingleLine.pipe(
    z.string().max(
      FIELD_LIMITS.company,
      `Company must be ${FIELD_LIMITS.company} characters or fewer.`,
    ),
  ),
  subject: cleanedSingleLine.pipe(
    z.string().max(
      FIELD_LIMITS.subject,
      `Subject must be ${FIELD_LIMITS.subject} characters or fewer.`,
    ),
  ),
  message: cleanedMultiline.pipe(
    z
      .string()
      .min(1, 'Please write a short message.')
      .max(
        FIELD_LIMITS.message,
        `Message must be ${FIELD_LIMITS.message} characters or fewer.`,
      ),
  ),
});

export type ContactFormInput = z.input<typeof contactFormSchema>;
export type ContactFormValues = z.output<typeof contactFormSchema>;
export type ContactErrors = Partial<Record<ContactField, string>>;

export const EMPTY_CONTACT_VALUES: ContactFormInput = {
  name: '',
  email: '',
  company: '',
  subject: '',
  message: '',
};

export function isContactField(value: PropertyKey): value is ContactField {
  return typeof value === 'string' && CONTACT_FIELDS.some((field) => field === value);
}

export function zodErrorsToContactErrors(error: z.ZodError): ContactErrors {
  const errors: ContactErrors = {};

  for (const issue of error.issues) {
    const field = issue.path[0];
    if (field !== undefined && isContactField(field) && !errors[field]) {
      errors[field] = issue.message;
    }
  }

  return errors;
}

export const contactApiResponseSchema = z.object({
  ok: z.boolean().optional(),
  message: z.string().optional(),
  errors: z.record(z.string(), z.string()).optional(),
});
