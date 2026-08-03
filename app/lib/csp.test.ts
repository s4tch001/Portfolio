import assert from 'node:assert/strict';
import test from 'node:test';
import { buildContentSecurityPolicy } from './csp';

test('builds a strict production script policy around the request nonce', () => {
  const policy = buildContentSecurityPolicy('test-nonce', false);

  assert.match(policy, /script-src [^;]*'nonce-test-nonce'/);
  assert.match(policy, /script-src [^;]*'strict-dynamic'/);
  assert.match(policy, /script-src-attr 'none'/);
  assert.match(policy, /object-src 'none'/);
  assert.match(policy, /base-uri 'self'/);
  assert.match(policy, /upgrade-insecure-requests/);
  assert.doesNotMatch(policy, /'unsafe-eval'/);
});

test('allows React development tooling without upgrading localhost requests', () => {
  const policy = buildContentSecurityPolicy('dev-nonce', true);

  assert.match(policy, /'unsafe-eval'/);
  assert.doesNotMatch(policy, /upgrade-insecure-requests/);
});
