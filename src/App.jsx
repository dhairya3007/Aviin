import React, { useState } from 'react';
import AviinPreloaderLogo from './components/AviinPreloaderLogo';
import SubscribeForm from './components/SubscribeForm';

export default function App() {
  const [isSettled, setIsSettled] = useState(false);

  return (
    <div className="aviin-app-root">
      <main className={`coming-soon-stage ${isSettled ? 'stage-settled' : 'stage-loading'}`}>
        {/* Subtle Ambient Radial Glow */}
        <div className="ambient-glow-center"></div>

        {/* Central Brand Content Container */}
        <div className="central-body-stack">
          {/* Central Brand Logo (Plays preloader in center, then smoothly glides up into header position) */}
          <div className="brand-stage-anchor">
            <AviinPreloaderLogo onSettled={() => setIsSettled(true)} />
          </div>

          {/* Prominent Typography & Minimal Form */}
          <div className="coming-soon-content">
            {/* Perfectly Responsive Heading */}
            <div className="heading-bird-stage">
              <h1 className="coming-soon-heading">COMING SOON</h1>
            </div>

            <p className="brand-subtitle">
              Custom printed T-shirts, oversized tees, hoodies, sweatshirts, polos and tote bags, made to order. Bulk orders for teams, events and businesses welcome.
            </p>

            {/* Form with WhatsApp Option above Email and Conditional Phone Field */}
            <SubscribeForm />
          </div>
        </div>
      </main>
    </div>
  );
}
