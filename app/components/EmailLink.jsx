'use client';

// On desktop, mailto: does nothing when no mail app / handler is set,
// so open Gmail's web compose instead. Mobile keeps the native mailto.
export default function EmailLink({ email, className, onClick, children }) {
  const handleClick = (event) => {
    onClick?.();
    const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    if (!isMobile) {
      event.preventDefault();
      window.open(
        `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(email)}`,
        '_blank',
        'noopener,noreferrer'
      );
    }
  };

  return (
    <a className={className} href={`mailto:${email}`} onClick={handleClick}>
      {children}
    </a>
  );
}
