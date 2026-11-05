import React, { useLayoutEffect, useRef } from 'react';

/**
 * FlyingHummingbird — single unified JS animation system.
 *
 * Phase 1 (FLIGHT, 7.5s):
 *   Bird lifts from exact logo-bird position, arcs up and right, glides down
 *   to settle beside the COMING SOON heading. Near-zero start velocity.
 *
 * Phase 2 (PATROL, infinite loop):
 *   Bird hovers at COMING SOON → glides to WhatsApp toggle → glides to
 *   Notify Me button → soars back up → returns to COMING SOON.
 *   All driven by JS Web Animations API — zero CSS idle loop involved.
 */
export default function FlyingHummingbird() {
  const anchorRef = useRef(null);

  useLayoutEffect(() => {
    const anchorEl = anchorRef.current;
    if (!anchorEl) return;

    const winW     = window.innerWidth;
    const isMobile = winW <= 600;

    // ── Anchor element measurements ──────────────────────────────────────────
    const anchorRect = anchorEl.getBoundingClientRect();
    const anchorCX   = anchorRect.left + anchorRect.width  * 0.5;
    const anchorCY   = anchorRect.top  + anchorRect.height * 0.5;

    const logoEl   = document.getElementById('logoStage');
    const logoRect = logoEl ? logoEl.getBoundingClientRect() : anchorRect;

    // ── START: exact pixel-centre of the logo bird ───────────────────────────
    const logoBirdEl   = document.getElementById('birdFlightMaster');
    const logoBirdRect = logoBirdEl ? logoBirdEl.getBoundingClientRect() : null;

    const startX = logoBirdRect
      ? (logoBirdRect.left + logoBirdRect.width  * 0.5) - anchorCX
      : (logoRect.left     + logoRect.width      * 0.84) - anchorCX;

    const startY = logoBirdRect
      ? (logoBirdRect.top  + logoBirdRect.height * 0.5) - anchorCY
      : (logoRect.top      + logoRect.height     * 0.40) - anchorCY;

    // ── ARC PEAK ─────────────────────────────────────────────────────────────
    const logoTopY   = logoRect.top - anchorCY;
    const peakY      = logoTopY - (isMobile ? 28 : 44);
    const maxRight   = (winW - 20) - (anchorCX + anchorRect.width * 0.5);
    const desiredPX  = isMobile ? Math.max(startX + 26, 34) : Math.max(startX + 88, 110);
    const peakX      = Math.min(desiredPX, Math.max(startX + 12, maxRight));

    // ── Helper: get Y-offset of a DOM element relative to anchorCY ───────────
    const getRelY = (el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return (r.top + r.height * 0.5) - anchorCY;
    };

    // ─────────────────────────────────────────────────────────────────────────
    //  PHASE 1 — FLIGHT  (7500ms, one-shot)
    // ─────────────────────────────────────────────────────────────────────────
    const FLIGHT_MS = 7500;

    const flightKF = [
      {
        offset: 0,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${startX.toFixed(1)}px,${startY.toFixed(1)}px,0) scale(1) rotate(0deg)`,
        easing: 'cubic-bezier(0.92, 0, 0.5, 1)',
      },
      {
        offset: 0.06,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(startX + (peakX - startX) * 0.03).toFixed(1)}px,${(startY + (peakY - startY) * 0.12).toFixed(1)}px,0) scale(1) rotate(-3deg)`,
        easing: 'cubic-bezier(0.7, 0, 0.5, 1)',
      },
      {
        offset: 0.15,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(startX + (peakX - startX) * 0.12).toFixed(1)}px,${(startY + (peakY - startY) * 0.44).toFixed(1)}px,0) scale(1) rotate(-8deg)`,
        easing: 'cubic-bezier(0.55, 0, 0.4, 1)',
      },
      {
        offset: 0.26,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(startX + (peakX - startX) * 0.30).toFixed(1)}px,${(startY + (peakY - startY) * 0.82).toFixed(1)}px,0) scale(1) rotate(-11deg)`,
        easing: 'cubic-bezier(0.45, 0, 0.35, 1)',
      },
      {
        offset: 0.38,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(startX + (peakX - startX) * 0.62).toFixed(1)}px,${peakY.toFixed(1)}px,0) scale(1) rotate(-8deg)`,
        easing: 'cubic-bezier(0.4, 0, 0.3, 1)',
      },
      {
        offset: 0.50,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${peakX.toFixed(1)}px,${(peakY + 6).toFixed(1)}px,0) scale(1) rotate(-1deg)`,
        easing: 'cubic-bezier(0.38, 0, 0.26, 1)',
      },
      {
        offset: 0.63,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(peakX * 0.68).toFixed(1)}px,${(startY * 0.46).toFixed(1)}px,0) scale(1) rotate(6deg)`,
        easing: 'cubic-bezier(0.3, 0, 0.22, 1)',
      },
      {
        offset: 0.76,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(peakX * 0.32).toFixed(1)}px,${(startY * 0.14).toFixed(1)}px,0) scale(1) rotate(5deg)`,
        easing: 'cubic-bezier(0.25, 0, 0.18, 1)',
      },
      {
        offset: 0.86,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(peakX * 0.10).toFixed(1)}px,${(startY * 0.03).toFixed(1)}px,0) scale(1) rotate(1deg)`,
        easing: 'cubic-bezier(0.2, 0.8, 0.22, 1)',
      },
      {
        offset: 0.94,
        opacity: 1,
        transform: `translateY(-50%) translate3d(${(peakX * 0.02).toFixed(1)}px,-2px,0) scale(1) rotate(-2deg)`,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
      {
        offset: 1.0,
        opacity: 1,
        transform: 'translateY(-50%) translate3d(0px,0px,0) scale(1) rotate(0deg)',
      },
    ];

    const flightAnim = anchorEl.animate(flightKF, {
      duration: FLIGHT_MS,
      fill: 'forwards',
    });

    // ─────────────────────────────────────────────────────────────────────────
    //  PHASE 2 — PATROL LOOP with PECKING  (infinite, starts when flight ends)
    // ─────────────────────────────────────────────────────────────────────────
    //
    //  PECKING motion: bird is to the RIGHT of the text, so a peck lunges LEFT
    //  (negative X) + beak tips DOWN (negative rotate) → quick snap retract.
    //  Each peck cycle is ~3 keyframes: lunge (60ms fast) → hold (brief) → retract.
    //  We use 'step-end' easing on the retract for a crisp snap-back.
    //
    //  Timeline (28s loop):
    //   0–15%    Hover + 3 pecks at COMING SOON heading
    //   15–28%   Glide down to WhatsApp toggle
    //   28–45%   Hover + 3 pecks at WhatsApp toggle
    //   45–57%   Glide down to Notify Me button
    //   57–74%   Hover + 3 pecks at Notify Me button
    //   74–90%   Soar back up arc to COMING SOON
    //   90–100%  Decelerate & settle at COMING SOON
    //
    let patrolAnim = null;

    flightAnim.onfinish = () => {
      try { flightAnim.commitStyles(); } catch (_) {}
      flightAnim.cancel();

      const waEl     = document.getElementById('waToggle');
      const notifyEl = document.getElementById('notifyMeBtn');

      const waY      = waEl     ? getRelY(waEl)     + 2  : 100;
      const notifyY  = notifyEl ? getRelY(notifyEl) + 2  : 160;

      const waX      = isMobile ? 6  : 10;
      const notifyX  = isMobile ? 8  : 14;

      // ── Peck amplitude (pixels the beak lunges toward the text) ──────────
      const PECK = isMobile ? 7 : 10;   // leftward lunge in px
      const PECK_DY = 3;                // slight beak-dip in px
      const PECK_ROT = -8;              // deg — beak tips down on lunge

      const PATROL_MS = 28000;

      // ── Helper: 3-peck burst builder ──────────────────────────────────────
      // base: { x, y, rot } = resting position at the station
      // window: [startOffset, endOffset] within 0–1
      // Returns array of keyframe objects with pre-computed offsets.
      const peckBurst = (bx, by, brot, wo0, wo1, peckCount = 3) => {
        const span    = wo1 - wo0;
        // Each peck takes 12% of the window; rest period fills the gaps
        const peckW   = span * 0.12;  // duration of one full peck cycle
        const restW   = (span - peckW * peckCount) / (peckCount + 1);
        const kf = [];
        // Arrive steady
        kf.push({
          offset: wo0,
          transform: `translateY(-50%) translate3d(${bx}px, ${by.toFixed(1)}px, 0) rotate(${brot}deg)`,
          easing: 'ease-out',
        });
        for (let i = 0; i < peckCount; i++) {
          const base   = wo0 + restW * (i + 1) + peckW * i;
          const lunge  = base + peckW * 0.30;   // 30% into peck = lunge tip
          const hold   = base + peckW * 0.55;   // hold beak in
          const retract= base + peckW * 0.75;   // snap back
          // Brief bob before peck
          kf.push({
            offset: parseFloat(base.toFixed(4)),
            transform: `translateY(-50%) translate3d(${bx}px, ${(by - 2).toFixed(1)}px, 0) rotate(${brot - 2}deg)`,
            easing: 'cubic-bezier(0.6, 0, 0.4, 1)',
          });
          // Lunge
          kf.push({
            offset: parseFloat(lunge.toFixed(4)),
            transform: `translateY(-50%) translate3d(${(bx - PECK).toFixed(1)}px, ${(by + PECK_DY).toFixed(1)}px, 0) rotate(${brot + PECK_ROT}deg)`,
            easing: 'cubic-bezier(0.3, 0, 0.1, 1)',
          });
          // Hold beak in contact
          kf.push({
            offset: parseFloat(hold.toFixed(4)),
            transform: `translateY(-50%) translate3d(${(bx - PECK).toFixed(1)}px, ${(by + PECK_DY).toFixed(1)}px, 0) rotate(${brot + PECK_ROT}deg)`,
            easing: 'cubic-bezier(0.8, 0, 0.9, 1)',
          });
          // Snap retract
          kf.push({
            offset: parseFloat(retract.toFixed(4)),
            transform: `translateY(-50%) translate3d(${bx}px, ${by.toFixed(1)}px, 0) rotate(${brot}deg)`,
            easing: 'ease-in-out',
          });
        }
        // Settle after last peck
        kf.push({
          offset: parseFloat(wo1.toFixed(4)),
          transform: `translateY(-50%) translate3d(${bx}px, ${by.toFixed(1)}px, 0) rotate(${brot}deg)`,
          easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
        });
        return kf;
      };

      // ── Build full patrol keyframe list ───────────────────────────────────
      const p = [

        // ── STATION 1: COMING SOON — hover then 3 pecks (0–15%) ───────────
        ...peckBurst(0, 0, 0, 0, 0.15),

        // ── GLIDE to WhatsApp toggle (15–28%) ─────────────────────────────
        {
          offset: 0.22,
          transform: `translateY(-50%) translate3d(${waX}px, ${(waY * 0.45).toFixed(1)}px, 0) rotate(-5deg)`,
          easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
        },
        {
          offset: 0.28,
          transform: `translateY(-50%) translate3d(${waX}px, ${waY.toFixed(1)}px, 0) rotate(-3deg)`,
          easing: 'ease-out',
        },

        // ── STATION 2: WhatsApp — hover then 3 pecks (28–45%) ─────────────
        ...peckBurst(waX, waY, -3, 0.28, 0.45),

        // ── GLIDE to Notify Me button (45–57%) ────────────────────────────
        {
          offset: 0.51,
          transform: `translateY(-50%) translate3d(${notifyX}px, ${((waY + notifyY) * 0.5).toFixed(1)}px, 0) rotate(-5deg)`,
          easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
        },
        {
          offset: 0.57,
          transform: `translateY(-50%) translate3d(${notifyX}px, ${notifyY.toFixed(1)}px, 0) rotate(-3deg)`,
          easing: 'ease-out',
        },

        // ── STATION 3: Notify Me — hover then 3 pecks (57–74%) ────────────
        ...peckBurst(notifyX, notifyY, -3, 0.57, 0.74),

        // ── SOAR BACK UP arc to COMING SOON (74–90%) ──────────────────────
        {
          offset: 0.80,
          transform: `translateY(-50%) translate3d(${isMobile ? 30 : 55}px, ${(notifyY * 0.55).toFixed(1)}px, 0) rotate(-18deg)`,
          easing: 'cubic-bezier(0.3, 0, 0.2, 1)',
        },
        {
          offset: 0.87,
          transform: `translateY(-50%) translate3d(${isMobile ? 18 : 30}px, ${(notifyY * 0.15).toFixed(1)}px, 0) rotate(-10deg)`,
          easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
        },
        {
          offset: 0.90,
          transform: 'translateY(-50%) translate3d(2px, -2px, 0) rotate(-2deg)',
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },

        // ── Decelerate & settle at COMING SOON (90–100%) ──────────────────
        {
          offset: 0.95,
          transform: 'translateY(-50%) translate3d(0px, -3px, 0) rotate(-0.5deg)',
          easing: 'ease-in-out',
        },
        {
          offset: 1.0,
          transform: 'translateY(-50%) translate3d(0px, 0px, 0) rotate(0deg)',
        },
      ];

      // Sort by offset — peckBurst windows can overlap the transition frames
      p.sort((a, b) => a.offset - b.offset);

      patrolAnim = anchorEl.animate(p, {
        duration: PATROL_MS,
        iterations: Infinity,
        easing: 'linear',
      });
    };

    return () => {
      flightAnim.cancel();
      if (patrolAnim) patrolAnim.cancel();
    };
  }, []);

  return (
    <div ref={anchorRef} className="right-side-bird-anchor" aria-hidden="true">
      <div className="bird-y-arc">
        <div className="right-side-bird-vehicle">
          <div className="bird-interaction-pivot">
            <svg
              className="flying-hummingbird-svg"
              viewBox="760 380 190 145"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="liveBirdBeakGrad" x1="772" y1="427" x2="816" y2="432" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#3c0ca8" />
                  <stop offset="55%"  stopColor="#1d35d8" />
                  <stop offset="100%" stopColor="#0066ff" />
                </linearGradient>
                <linearGradient id="liveBirdCrownGrad" x1="806" y1="422" x2="854" y2="452" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#00f2ff" />
                  <stop offset="48%"  stopColor="#00de9a" />
                  <stop offset="100%" stopColor="#12ba5c" />
                </linearGradient>
                <linearGradient id="liveBirdChestGrad" x1="810" y1="438" x2="878" y2="492" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#0048ff" />
                  <stop offset="38%"  stopColor="#00aaff" />
                  <stop offset="72%"  stopColor="#00e1d9" />
                  <stop offset="100%" stopColor="#242ef0" />
                </linearGradient>
                <linearGradient id="liveBirdWingGrad" x1="848" y1="458" x2="939" y2="398" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#0eb854" />
                  <stop offset="20%"  stopColor="#84e320" />
                  <stop offset="42%"  stopColor="#ffda00" />
                  <stop offset="65%"  stopColor="#ff7b00" />
                  <stop offset="88%"  stopColor="#ff2a00" />
                  <stop offset="100%" stopColor="#dc1000" />
                </linearGradient>
                <linearGradient id="liveBirdTailGrad" x1="864" y1="472" x2="899" y2="512" gradientUnits="userSpaceOnUse">
                  <stop offset="0%"   stopColor="#0055ff" />
                  <stop offset="45%"  stopColor="#6200ea" />
                  <stop offset="85%"  stopColor="#a900f5" />
                  <stop offset="100%" stopColor="#480699" />
                </linearGradient>
              </defs>

              <g className="flying-bird-sprite">
                <g className="flight-tail-feathers">
                  <path d="M 866 462 C 878 472, 890 488, 898 510 C 888 500, 875 486, 864 472 Z" fill="#00b4d8" opacity="0.92" />
                  <path d="M 856 470 C 868 482, 880 500, 889 514 L 886 506 L 894 515 L 891 505 L 899 514 C 890 494, 878 474, 864 464 Z" fill="url(#liveBirdTailGrad)" />
                  <path d="M 866 472 C 876 485, 886 500, 894 512 C 884 498, 874 482, 866 472 Z" fill="#d426ff" opacity="0.82" />
                </g>
                <g className="flight-wing-secondary">
                  <path d="M 846 446 C 862 430, 880 416, 900 406 L 890 420 L 905 415 L 890 430 L 907 428 L 888 442 L 904 442 C 882 450, 862 452, 846 446 Z" fill="#12c75c" />
                </g>
                <g className="flight-wing-primary">
                  <path d="M 846 447 C 868 422, 902 400, 935 388 L 927 398 L 939 393 L 924 407 L 935 404 L 918 417 L 931 414 L 912 427 L 924 425 L 904 436 L 916 435 L 894 445 L 906 445 L 880 452 L 892 453 C 875 458, 856 456, 846 447 Z" fill="url(#liveBirdWingGrad)" />
                  <path d="M 852 444 C 874 424, 904 404, 931 393 C 906 411, 880 430, 858 448 Z" fill="#ff9e00" opacity="0.74" />
                  <path d="M 850 445 C 866 428, 888 412, 908 402 C 888 418, 870 434, 854 447 Z" fill="#a8eb12" opacity="0.62" />
                </g>
                <g className="flight-body-core">
                  <path d="M 808 432 C 815 439, 818 452, 823 465 C 828 478, 840 485, 866 488 C 876 489, 884 487, 888 483 C 878 469, 864 454, 846 441 C 832 432, 819 430, 808 432 Z" fill="url(#liveBirdChestGrad)" />
                  <path d="M 830 432 C 842 439, 855 450, 868 463 C 856 463, 842 452, 830 432 Z" fill="#1fd660" opacity="0.9" />
                </g>
                <g className="flight-head-core">
                  <path d="M 770 423 Q 792 423 812 428 L 811 433 Q 792 427 770 423 Z" fill="url(#liveBirdBeakGrad)" />
                  <path d="M 807 431 C 814 422, 824 419, 835 422 C 844 425, 852 434, 856 445 C 842 447, 825 443, 807 431 Z" fill="url(#liveBirdCrownGrad)" />
                  <ellipse cx="821" cy="431" rx="3.4" ry="2.8" transform="rotate(-6 821 431)" fill="#14226b" />
                  <circle cx="820.2" cy="430.3" r="0.85" fill="#00f0ff" opacity="0.78" />
                </g>
              </g>
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
