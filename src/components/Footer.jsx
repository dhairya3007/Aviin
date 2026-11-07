import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="aviin-footer" aria-label="Footer">
      <div className="footer-social-links">
        {/* Instagram */}
        <a
          href="https://www.instagram.com/aviin.uk"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          aria-label="Follow Aviin on Instagram"
          title="Instagram"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.85"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
          </svg>
        </a>

        {/* WhatsApp */}
        <a
          href="https://wa.me/message/73MSF3SNFN7LB1"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          aria-label="Connect with Aviin on WhatsApp"
          title="WhatsApp"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 18.06c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.03 8.03 0 0 1-1.23-4.29c0-4.46 3.63-8.09 8.09-8.09 2.16 0 4.19.84 5.72 2.37a8.02 8.02 0 0 1 2.37 5.72c0 4.46-3.63 8.08-8.09 8.08zm4.43-6.07c-.24-.12-1.44-.71-1.66-.79-.22-.08-.39-.12-.55.12-.16.24-.63.79-.77.95-.14.16-.28.18-.53.06-.24-.12-1.03-.38-1.96-1.21-.72-.65-1.21-1.45-1.36-1.69-.14-.24-.02-.37.1-.49.11-.11.24-.28.37-.43.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.43-.06-.12-.55-1.33-.76-1.82-.2-.48-.41-.41-.56-.42h-.47c-.16 0-.43.06-.66.31-.22.24-.87.85-.87 2.08 0 1.22.89 2.41 1.01 2.57.12.16 1.76 2.68 4.26 3.76.59.26 1.06.41 1.42.52.6.19 1.15.16 1.58.1.48-.07 1.44-.59 1.65-1.16.2-.57.2-1.06.14-1.16-.06-.1-.22-.16-.46-.28z" />
          </svg>
        </a>

        {/* Facebook */}
        <a
          href="https://www.facebook.com/share/1DxpdGAXCo/?mibextid=wwXIfr"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon-btn"
          aria-label="Connect with Aviin on Facebook"
          title="Facebook"
        >
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H7v-3h3V9.5C10 6.46 11.82 5 14.54 5c1.3 0 2.68.23 2.68.23v2.95h-1.51c-1.5 0-1.71.94-1.71 1.9V12h3.32l-.53 3h-2.79v6.8c4.56-.93 8-4.96 8-9.8z" />
          </svg>
        </a>
      </div>

      <p className="footer-copyright">
        © {currentYear} Aviin. All rights reserved.
      </p>
    </footer>
  );
}

