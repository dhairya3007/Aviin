import React, { useState, useEffect } from 'react';
import AviinLogoStage from './components/AviinLogoStage';
import FlyingHummingbird from './components/FlyingHummingbird';
import SubscribeForm from './components/SubscribeForm';

export default function App() {
  // Three-stage cinematic sequence:
  // 1. 'preloader': Logo calligraphy reveals in center, hummingbird lands on 'n', rests
  // 2. 'logo-settled': Logo ascends to its final position above COMING SOON (bird perched on it!)
  // 3. 'bird-flying': Logo is fully SET in its place; hummingbird takes off FROM logo down to text!
  const [stagePhase, setStagePhase] = useState('preloader');

  useEffect(() => {
    // 3.0s: Calligraphy & perched landing complete; logo glides up to its place above Coming Soon text.
    // The bird remains perched on the letter 'n' throughout this ascent.
    const logoTimer = setTimeout(() => {
      setStagePhase('logo-settled');
    }, 3000);

    // 4.40s: Logo has finished smoothly setting at its place above the Coming Soon text.
    // The bird (fluttering on the settled logo) now glides in one graceful, unhurried, continuous flow down to Coming Soon!
    const birdTimer = setTimeout(() => {
      setStagePhase('bird-flying');
    }, 4400);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(birdTimer);
    };
  }, []);

  const isLogoSettled = stagePhase === 'logo-settled' || stagePhase === 'bird-flying';
  const isBirdFlying = stagePhase === 'bird-flying';

  return (
    <div className="aviin-app-root">
      <main className={`coming-soon-stage ${isLogoSettled ? 'stage-settled' : 'stage-loading'}`}>
        {/* Subtle Ambient Glow */}
        <div className="ambient-glow-center"></div>

        {/* Central Brand Content Container */}
        <div className="central-body-stack">
          {/* Central Brand Logo (Smoothly ascends into header position with bird perched on it) */}
          <div className="brand-stage-anchor">
            <AviinLogoStage isSettled={isBirdFlying} />
          </div>

          {/* Prominent Typography & Minimal Form */}
          <div className="coming-soon-content">
            {/* Perfectly Responsive Heading & Right-Flank Bird Stage */}
            <div className="heading-bird-stage">
              <h1 className="coming-soon-heading">COMING SOON</h1>
              {isBirdFlying && <FlyingHummingbird />}
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
