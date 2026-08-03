import assert from 'node:assert/strict';
import test from 'node:test';
import { z } from 'zod';
import { FIELD_LIMITS } from './contact-fields';
import { validateContact } from './validation';

const validContact = {
  name: 'Pau',
  email: 'pau@example.com',
  company: 'P-Devs',
  subject: 'Portfolio inquiry',
  message: 'I would like to discuss a project.',
};

test('uses Zod without eval so the contact form complies with strict CSP', () => {
  assert.equal(z.config().jitless, true);
});

test('accepts and normalizes a valid contact submission', () => {
  const result = validateContact({
    ...validContact,
    name: '  Pau  ',
    message: '  First line\nSecond line  ',
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.values.name, 'Pau');
    assert.equal(result.values.message, 'First line\nSecond line');
  }
});

test('rejects missing required fields', () => {
  const result = validateContact({ ...validContact, name: '', message: '' });

  assert.equal(result.success, false);
  if (!result.success) {
    assert.ok(result.errors.name);
    assert.ok(result.errors.message);
  }
});

test('rejects an invalid email address', () => {
  const result = validateContact({ ...validContact, email: 'not-an-email' });

  assert.equal(result.success, false);
  if (!result.success) assert.ok(result.errors.email);
});

test('enforces the shared field length limits', () => {
  const result = validateContact({
    ...validContact,
    message: 'x'.repeat(FIELD_LIMITS.message + 1),
  });

  assert.equal(result.success, false);
  if (!result.success) assert.ok(result.errors.message);
});

test('removes control characters while keeping message text as data', () => {
  const result = validateContact({
    ...validContact,
    name: 'Pau\u0000',
    message: '<script>alert(1)</script>\u0007',
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.values.name, 'Pau');
    assert.equal(result.values.message, '<script>alert(1)</script>');
  }
});

test('rejects non-object input at the server boundary', () => {
  assert.equal(validateContact(null).success, false);
  assert.equal(validateContact('not an object').success, false);
});
