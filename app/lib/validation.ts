import {
  contactFormSchema,
  zodErrorsToContactErrors,
} from './contact-schema';
import type { ContactErrors, ContactFormValues } from './contact-schema';

// The API always parses unknown input through the same schema used by React
// Hook Form, so browser validation can never replace the server boundary.

export type ContactValidationResult =
  | { success: true; values: ContactFormValues }
  | { success: false; errors: ContactErrors };

export function validateContact(data: unknown): ContactValidationResult {
  const result = contactFormSchema.safeParse(data);
  if (result.success) {
    return { success: true, values: result.data };
  }

  return {
    success: false,
    errors: zodErrorsToContactErrors(result.error),
  };
}
