// export function buildContentSecurityPolicy(
//   nonce: string,
//   isDevelopment: boolean,
// ): string {
//   return [
//     "default-src 'self'",
//     `script-src 'self' 'nonce-${nonce}' 'strict-dynamic' 'unsafe-inline'${isDevelopment ? " 'unsafe-eval'" : ''} https://challenges.cloudflare.com`,
//     "script-src-attr 'none'",
//     "style-src 'self' 'unsafe-inline'",
//     "font-src 'self'",
//     "img-src 'self' data: blob:",
//     "connect-src 'self'",
//     "frame-src https://challenges.cloudflare.com",
//     "object-src 'none'",
//     "base-uri 'self'",
//     "frame-ancestors 'none'",
//     "form-action 'self'",
//     ...(!isDevelopment ? ['upgrade-insecure-requests'] : []),
//   ].join('; ');
// }
