import React, { useLayoutEffect, useRef } from 'react';

/**
 * FlyingHummingbird — Right-Hook Arc (matches the hand-drawn flight path)
 *
 * From the user's reference drawing the path is:
 *   1. Start at 'n' letter on logo
 *   2. Swing UP and to the RIGHT (outside the logo, to the right of content)
 *   3. Swoop DOWN along the right side
 *   4. Curve LEFT to land beside COMING SOON heading
 *
 * This is a right-hook fishhook shape. The X swings right to peakX, then
 * returns left to the anchor. The Y rises slightly, then descends to anchor.
 *
 * Because X moves RIGHT immediately from the 'n' position, the bird exits
 * the logo's visual bounds within the first 200ms — no logo text overlap.
 *
 * Layer A (anchorEl):  translateX (right-hook) + scale
 * Layer B (yArcEl):    translateY (lift + descent) + tilt
 * Layer C (.right-side-bird-vehicle): CSS macro flight loop (delay 4.3s)
 * Layer D (.bird-interaction-pivot):  CSS peck choreography  (delay 4.3s)
 */
export default function FlyingHummingbird() {
  const anchorRef = useRef(null);
  const yArcRef   = useRef(null);

  useLayoutEffect(() => {
    const anchorEl = anchorRef.current;
    const yArcEl   = yArcRef.current;
    if (!anchorEl || !yArcEl) return;

    const anchorRect = anchorEl.getBoundingClientRect();
    const anchorCX   = anchorRect.left + anchorRect.width  * 0.5;
    const anchorCY   = anchorRect.top  + anchorRect.height * 0.5;

    // ── START POSITION: ABOVE the settled logo (top-right area) ─────────────
    // We DO NOT start from the 'n' letter. Instead, we start from ABOVE
    // the logo — specifically above the right side where the bird sits in
    // the logo artwork. The preloader bird fades out on the logo; the flying
    // bird appears cleanly above the logo and lifts from there.
    const logoEl   = document.getElementById('logoStage');
    const logoRect = logoEl ? logoEl.getBoundingClientRect() : anchorRect;

    // X start: at the right-side of the logo (where the bird artwork is)
    // anchor-relative: logo's right-third X center, relative to anchor center
    const logoRightBirdX = logoRect.left + logoRect.width * 0.80; // ~80% across the logo = bird area
    const startX = logoRightBirdX - anchorCX;

    // Y start: 20px ABOVE the logo's top edge — bird appears cleanly above, never on the letterforms
    const startY = (logoRect.top - 20) - anchorCY;

    // Starting scale = 1.0 (the flying bird matches the logo bird's display size)
    const ss = 1.0;

    // ── RIGHT-HOOK ARC (matches hand-drawn path) ───────────────────────────
    // 1. Bird is ABOVE logo, flies UP a bit more
    // 2. Then swings RIGHT to peakX (outside content area)
    // 3. Then sweeps DOWN and LEFT to anchor (beside COMING SOON)
    //
    // peakUpY: further above startY (which is already above the logo)
    const peakUpY = startY - 70; // 70px higher = well clear of everything

    // peakX: far right so the arc is wide and visible (matching yellow drawing)
    const peakX = Math.max(startX + 160, 180);

    const DURATION = 4400; // ms — matches App.jsx bird timer offset feel

    // ── LAYER A: X axis — right-hook path ─────────────────────────────────
    //   0%:   At bird's starting X position (on the logo bird)
    //   20%:  Still near start X — bird goes UP first, slight rightward drift
    //   55%:  Peaks far to the RIGHT (outside content area)
    //   85%:  Almost back at anchor X
    //   100%: Exactly at anchor X (0)
    const xAnim = anchorEl.animate(
      [
        {
          offset: 0,
          transform: `translateY(-50%) translateX(${startX.toFixed(1)}px) scale(${ss.toFixed(3)})`,
          opacity: 1,
          easing: 'cubic-bezier(0.42, 0, 0.8, 0.5)',   // gentle rightward start
        },
        {
          offset: 0.20,
          transform: `translateY(-50%) translateX(${(startX + 30).toFixed(1)}px) scale(1.0)`,
          opacity: 1,
          easing: 'cubic-bezier(0.3, 0, 0.6, 1)',       // accelerate right
        },
        {
          offset: 0.55,
          transform: `translateY(-50%) translateX(${peakX.toFixed(1)}px) scale(1.0)`,
          opacity: 1,
          easing: 'cubic-bezier(0.42, 0, 0.1, 1)',       // arc back left smoothly
        },
        {
          offset: 0.85,
          transform: `translateY(-50%) translateX(${(peakX * 0.04).toFixed(1)}px) scale(1.0)`,
          opacity: 1,
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',       // cushion into anchor
        },
        {
          offset: 1.0,
          transform: 'translateY(-50%) translateX(0px) scale(1.0)',
          opacity: 1,
        },
      ],
      { duration: DURATION, easing: 'linear', fill: 'forwards' }
    );

    // ── LAYER B: Y axis + body tilt ───────────────────────────────────────
    //   0–18%:  Strong upward lift (bird rises cleanly above the logo)
    //   18–55%: Hover near apex while swinging right
    //   55–88%: Long ease-out descent to COMING SOON heading
    //   88–100%: Soft hover-brake cushion into landing
    const yAnim = yArcEl.animate(
      [
        {
          offset: 0,
          transform: `translateY(${startY.toFixed(1)}px) rotate(0deg)`,
          easing: 'cubic-bezier(0.3, 0, 0.5, 1)',         // lift sharply
        },
        {
          offset: 0.18,
          transform: `translateY(${peakUpY.toFixed(1)}px) rotate(-12deg)`,  // apex: well above logo
          easing: 'cubic-bezier(0.0, 0.0, 0.5, 1.0)',
        },
        {
          offset: 0.50,
          transform: `translateY(${(peakUpY * 0.7).toFixed(1)}px) rotate(-6deg)`,  // still high, swinging right
          easing: 'cubic-bezier(0.0, 0.0, 0.3, 1.0)',
        },
        {
          offset: 0.78,
          transform: `translateY(${(peakUpY * 0.1).toFixed(1)}px) rotate(5deg)`,  // descending
          easing: 'cubic-bezier(0.25, 0, 0.1, 1)',
        },
        {
          offset: 0.90,
          transform: 'translateY(-8px) rotate(-1deg)',
          easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
        },
        {
          offset: 1.0,
          transform: 'translateY(0px) rotate(0deg)',
        },
      ],
      { duration: DURATION, easing: 'linear', fill: 'forwards' }
    );

    return () => { xAnim.cancel(); yAnim.cancel(); };
  }, []);

  return (
    <div ref={anchorRef} className="right-side-bird-anchor" aria-hidden="true">
      {/* Y-arc + tilt layer — JS animated */}
      <div ref={yArcRef} className="bird-y-arc">
        {/* Macro flight loop & peck choreography — CSS only (delay 4.3s) */}
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
                {/* Violet Tail Feathers */}
                <g className="flight-tail-feathers">
                  <path d="M 866 462 C 878 472, 890 488, 898 510 C 888 500, 875 486, 864 472 Z" fill="#00b4d8" opacity="0.92" />
                  <path
                    d="M 856 470 C 868 482, 880 500, 889 514 L 886 506 L 894 515 L 891 505 L 899 514 C 890 494, 878 474, 864 464 Z"
                    fill="url(#liveBirdTailGrad)"
                  />
                  <path d="M 866 472 C 876 485, 886 500, 894 512 C 884 498, 874 482, 866 472 Z" fill="#d426ff" opacity="0.82" />
                </g>

                {/* Emerald Secondary Under-Wing */}
                <g className="flight-wing-secondary">
                  <path
                    d="M 846 446 C 862 430, 880 416, 900 406 L 890 420 L 905 415 L 890 430 L 907 428 L 888 442 L 904 442 C 882 450, 862 452, 846 446 Z"
                    fill="#12c75c"
                  />
                </g>

                {/* Primary Raised Rainbow Wing */}
                <g className="flight-wing-primary">
                  <path
                    d="M 846 447 C 868 422, 902 400, 935 388 L 927 398 L 939 393 L 924 407 L 935 404 L 918 417 L 931 414 L 912 427 L 924 425 L 904 436 L 916 435 L 894 445 L 906 445 L 880 452 L 892 453 C 875 458, 856 456, 846 447 Z"
                    fill="url(#liveBirdWingGrad)"
                  />
                  <path d="M 852 444 C 874 424, 904 404, 931 393 C 906 411, 880 430, 858 448 Z" fill="#ff9e00" opacity="0.74" />
                  <path d="M 850 445 C 866 428, 888 412, 908 402 C 888 418, 870 434, 854 447 Z" fill="#a8eb12" opacity="0.62" />
                </g>

                {/* Cobalt & Cyan-Turquoise Chest */}
                <g className="flight-body-core">
                  <path
                    d="M 808 432 C 815 439, 818 452, 823 465 C 828 478, 840 485, 866 488 C 876 489, 884 487, 888 483 C 878 469, 864 454, 846 441 C 832 432, 819 430, 808 432 Z"
                    fill="url(#liveBirdChestGrad)"
                  />
                  <path d="M 830 432 C 842 439, 855 450, 868 463 C 856 463, 842 452, 830 432 Z" fill="#1fd660" opacity="0.9" />
                </g>

                {/* Indigo Beak + Crown + Eye */}
                <g className="flight-head-core">
                  <path d="M 770 423 Q 792 423 812 428 L 811 433 Q 792 427 770 423 Z" fill="url(#liveBirdBeakGrad)" />
                  <path
                    d="M 807 431 C 814 422, 824 419, 835 422 C 844 425, 852 434, 856 445 C 842 447, 825 443, 807 431 Z"
                    fill="url(#liveBirdCrownGrad)"
                  />
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
