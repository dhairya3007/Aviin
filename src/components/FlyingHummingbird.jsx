import React, { useLayoutEffect, useRef } from 'react';

export default function FlyingHummingbird() {
  const anchorRef = useRef(null);

  useLayoutEffect(() => {
    const anchorEl = anchorRef.current;
    if (!anchorEl) return;

    // Measure the preloader bird's exact on-screen pixel position
    const birdEl = document.getElementById('birdFlightMaster');
    if (!birdEl) {
      // Fallback: just show at destination
      anchorEl.style.opacity = '1';
      return;
    }

    const birdRect = birdEl.getBoundingClientRect();
    const anchorRect = anchorEl.getBoundingClientRect();

    // Compute pixel offset: where the bird IS (on logo) vs where it needs to GO (right of COMING SOON)
    const sx = (birdRect.left + birdRect.width * 0.5) - (anchorRect.left + anchorRect.width * 0.5);
    const sy = (birdRect.top + birdRect.height * 0.5) - (anchorRect.top + anchorRect.height * 0.5);

    // Compute starting scale to match preloader bird's visual size
    const ss = Math.max(0.68, Math.min(birdRect.width / Math.max(anchorRect.width, 1), 1.1));

    // Apex of the arc: 35px above the start position (bird lifts up first)
    const ay = sy - 35;

    // Helper: lerp between two values
    const lerp = (a, b, t) => a + (b - a) * t;

    // Dynamically computed 9-point smooth flight path
    const anim = anchorEl.animate([
      // 0% — Exact position on logo letter 'n' (pixel-perfect, zero jump)
      {
        transform: `translateY(-50%) translate3d(${sx.toFixed(1)}px, ${sy.toFixed(1)}px, 0) scale(${ss.toFixed(3)}) rotate(0deg)`,
        opacity: 1, offset: 0
      },
      // 12% — Gentle push-off lifting upward ("little above side")
      {
        transform: `translateY(-50%) translate3d(${lerp(sx, 0, 0.14).toFixed(1)}px, ${lerp(sy, ay, 0.35).toFixed(1)}px, 0) scale(${lerp(ss, 1, 0.15).toFixed(3)}) rotate(-8deg)`,
        opacity: 1, offset: 0.12
      },
      // 28% — Smooth aerodynamic climb to the apex
      {
        transform: `translateY(-50%) translate3d(${lerp(sx, 0, 0.35).toFixed(1)}px, ${ay.toFixed(1)}px, 0) scale(${lerp(ss, 1, 0.40).toFixed(3)}) rotate(-12deg)`,
        opacity: 1, offset: 0.28
      },
      // 42% — Cresting smoothly across the top of the arc
      {
        transform: `translateY(-50%) translate3d(${lerp(sx, 0, 0.58).toFixed(1)}px, ${lerp(ay, 0, 0.08).toFixed(1)}px, 0) scale(${lerp(ss, 1, 0.60).toFixed(3)}) rotate(-5deg)`,
        opacity: 1, offset: 0.42
      },
      // 56% — Entering gentle downward gliding swoop
      {
        transform: `translateY(-50%) translate3d(${lerp(sx, 0, 0.80).toFixed(1)}px, ${lerp(sy, 0, 0.52).toFixed(1)}px, 0) scale(${lerp(ss, 1, 0.80).toFixed(3)}) rotate(3deg)`,
        opacity: 1, offset: 0.56
      },
      // 70% — Wide, graceful downward swoop
      {
        transform: `translateY(-50%) translate3d(${lerp(sx, 0, 0.96).toFixed(1)}px, ${lerp(sy, 0, 0.77).toFixed(1)}px, 0) scale(1.01) rotate(7deg)`,
        opacity: 1, offset: 0.70
      },
      // 84% — Wing flare and soft deceleration
      {
        transform: `translateY(-50%) translate3d(8px, ${lerp(sy, 0, 0.94).toFixed(1)}px, 0) scale(1.0) rotate(-2deg)`,
        opacity: 1, offset: 0.84
      },
      // 94% — Cushioning into final position
      {
        transform: 'translateY(-50%) translate3d(2px, -5px, 0) scale(1.0) rotate(-1deg)',
        opacity: 1, offset: 0.94
      },
      // 100% — Silky touchdown beside COMING SOON
      {
        transform: 'translateY(-50%) translate3d(0px, 0px, 0) scale(1.0) rotate(0deg)',
        opacity: 1, offset: 1.0
      },
    ], {
      duration: 3600,
      easing: 'cubic-bezier(0.37, 0, 0.22, 1)',
      fill: 'forwards',
    });

    return () => { anim.cancel(); };
  }, []);

  return (
    <div ref={anchorRef} className="right-side-bird-anchor" aria-hidden="true">
      <div className="right-side-bird-vehicle">
        <div className="bird-interaction-pivot">
          <svg
            className="flying-hummingbird-svg"
            viewBox="760 380 190 145"
            xmlns="http://www.w3.org/2000/svg"
          >
          <defs>
            {/* Jewel-Tone Gradients matching Aviin branding */}
            <linearGradient id="liveBirdBeakGrad" x1="772" y1="427" x2="816" y2="432" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#3c0ca8" />
              <stop offset="55%" stopColor="#1d35d8" />
              <stop offset="100%" stopColor="#0066ff" />
            </linearGradient>

            <linearGradient id="liveBirdCrownGrad" x1="806" y1="422" x2="854" y2="452" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#00f2ff" />
              <stop offset="48%" stopColor="#00de9a" />
              <stop offset="100%" stopColor="#12ba5c" />
            </linearGradient>

            <linearGradient id="liveBirdChestGrad" x1="810" y1="438" x2="878" y2="492" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0048ff" />
              <stop offset="38%" stopColor="#00aaff" />
              <stop offset="72%" stopColor="#00e1d9" />
              <stop offset="100%" stopColor="#242ef0" />
            </linearGradient>

            <linearGradient id="liveBirdWingGrad" x1="848" y1="458" x2="939" y2="398" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0eb854" />
              <stop offset="20%" stopColor="#84e320" />
              <stop offset="42%" stopColor="#ffda00" />
              <stop offset="65%" stopColor="#ff7b00" />
              <stop offset="88%" stopColor="#ff2a00" />
              <stop offset="100%" stopColor="#dc1000" />
            </linearGradient>

            <linearGradient id="liveBirdTailGrad" x1="864" y1="472" x2="899" y2="512" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#0055ff" />
              <stop offset="45%" stopColor="#6200ea" />
              <stop offset="85%" stopColor="#a900f5" />
              <stop offset="100%" stopColor="#480699" />
            </linearGradient>
          </defs>

          {/* Master Bird Artwork facing left toward central content */}
          <g className="flying-bird-sprite">
            {/* Violet Tail Feathers */}
            <g className="flight-tail-feathers">
              <path d="M 866 462 C 878 472, 890 488, 898 510 C 888 500, 875 486, 864 472 Z" fill="#00b4d8" opacity="0.92" />
              <path
                d="M 856 470
                   C 868 482, 880 500, 889 514
                   L 886 506 L 894 515
                   L 891 505 L 899 514
                   C 890 494, 878 474, 864 464 Z"
                fill="url(#liveBirdTailGrad)"
              />
              <path d="M 866 472 C 876 485, 886 500, 894 512 C 884 498, 874 482, 866 472 Z" fill="#d426ff" opacity="0.82" />
            </g>

            {/* Emerald Secondary Under-Wing */}
            <g className="flight-wing-secondary">
              <path
                d="M 846 446
                   C 862 430, 880 416, 900 406
                   L 890 420 L 905 415
                   L 890 430 L 907 428
                   L 888 442 L 904 442
                   C 882 450, 862 452, 846 446 Z"
                fill="#12c75c"
              />
            </g>

            {/* Primary Raised Rainbow Wing (Green -> Yellow -> Orange -> Red) */}
            <g className="flight-wing-primary">
              <path
                d="M 846 447
                   C 868 422, 902 400, 935 388
                   L 927 398 L 939 393
                   L 924 407 L 935 404
                   L 918 417 L 931 414
                   L 912 427 L 924 425
                   L 904 436 L 916 435
                   L 894 445 L 906 445
                   L 880 452 L 892 453
                   C 875 458, 856 456, 846 447 Z"
                fill="url(#liveBirdWingGrad)"
              />
              <path d="M 852 444 C 874 424, 904 404, 931 393 C 906 411, 880 430, 858 448 Z" fill="#ff9e00" opacity="0.74" />
              <path d="M 850 445 C 866 428, 888 412, 908 402 C 888 418, 870 434, 854 447 Z" fill="#a8eb12" opacity="0.62" />
            </g>

            {/* Cobalt & Cyan-Turquoise Chest + Emerald Back */}
            <g className="flight-body-core">
              <path
                d="M 808 432
                   C 815 439, 818 452, 823 465
                   C 828 478, 840 485, 866 488
                   C 876 489, 884 487, 888 483
                   C 878 469, 864 454, 846 441
                   C 832 432, 819 430, 808 432 Z"
                fill="url(#liveBirdChestGrad)"
              />
              <path
                d="M 830 432
                   C 842 439, 855 450, 868 463
                   C 856 463, 842 452, 830 432 Z"
                fill="#1fd660"
                opacity="0.9"
              />
            </g>

            {/* Indigo Beak + Crown + Eye */}
            <g className="flight-head-core">
              <path d="M 770 423 Q 792 423 812 428 L 811 433 Q 792 427 770 423 Z" fill="url(#liveBirdBeakGrad)" />
              <path
                d="M 807 431
                   C 814 422, 824 419, 835 422
                   C 844 425, 852 434, 856 445
                   C 842 447, 825 443, 807 431 Z"
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
  );
}
