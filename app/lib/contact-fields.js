// Browser-safe contact form constants. Keep this module deliberately small:
// it is shared by the interactive form and the authoritative server validator.
export const FIELD_LIMITS = {
  name: 100,
  email: 254,
  company: 100,
  subject: 150,
  message: 5000,
};
