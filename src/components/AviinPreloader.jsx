import React, { useState, useEffect } from 'react';

export default function AviinPreloader({
  onComplete,
  autoDismissDelay = 3200,
}) {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsExiting(true);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 850);
    }, autoDismissDelay);

    return () => clearTimeout(timer);
  }, [autoDismissDelay, onComplete]);

  return (
    <div
      className={`aviin-preloader-container ${isExiting ? 'fade-out' : ''}`}
      role="dialog"
      aria-label="Aviin Pure Luxury Clothing — Spiral & Drop Preloader"
    >
      {/* 1:1 Responsive Stage — Pure Spiral & Drop (Mode 4) */}
      <div className="logo-stage mode-4" id="logoStage">
        {/* Iridescent Spiral Ribbon Trail */}
        <svg className="mode-fx-layer" viewBox="0 0 1000 1000" fill="none" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="spiralGrad" x1="200" y1="700" x2="800" y2="150" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#7b00e0" stopOpacity="0" />
              <stop offset="30%" stopColor="#0066ff" stopOpacity="0.55" />
              <stop offset="65%" stopColor="#00d67f" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#ff4800" stopOpacity="0" />
            </linearGradient>
          </defs>

          {/* Mode 4 Glowing Iridescent Spiral Ribbon Path */}
          <path
            className="spiral-ribbon-path"
            d="M 500 720 C 780 680, 860 380, 620 220 C 380 80, 220 340, 420 450 C 540 510, 630 420, 585 355"
            stroke="url(#spiralGrad)"
            strokeWidth="4.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Vibrant Painted Rainbow Hummingbird Actor */}
        <div className="bird-actor" id="birdActor">
          <svg id="svgHummingbird" viewBox="0 0 1000 1000" width="100%" height="100%" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="aviinBeakGrad" x1="288" y1="312" x2="452" y2="292" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#3f1178" />
                <stop offset="48%" stopColor="#202eb0" />
                <stop offset="100%" stopColor="#0055ff" />
              </linearGradient>

              <linearGradient id="aviinHeadGrad" x1="435" y1="250" x2="612" y2="362" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#00eaff" />
                <stop offset="42%" stopColor="#00de9a" />
                <stop offset="100%" stopColor="#11b560" />
              </linearGradient>

              <linearGradient id="aviinBreastGrad" x1="438" y1="300" x2="735" y2="512" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0044ff" />
                <stop offset="32%" stopColor="#00a2ff" />
                <stop offset="64%" stopColor="#00dfd4" />
                <stop offset="100%" stopColor="#1635f0" />
              </linearGradient>

              <linearGradient id="aviinBellyEdge" x1="450" y1="322" x2="698" y2="515" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0d1ca8" />
                <stop offset="55%" stopColor="#004cff" />
                <stop offset="100%" stopColor="#3b0fb3" />
              </linearGradient>

              <linearGradient id="aviinWingRainbow" x1="592" y1="378" x2="888" y2="38" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0bb554" />
                <stop offset="17%" stopColor="#80df22" />
                <stop offset="37%" stopColor="#ffd500" />
                <stop offset="60%" stopColor="#ff8000" />
                <stop offset="84%" stopColor="#ff3300" />
                <stop offset="100%" stopColor="#e01200" />
              </linearGradient>

              <linearGradient id="aviinWingStreak" x1="615" y1="355" x2="868" y2="105" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#14c462" />
                <stop offset="32%" stopColor="#c2f016" />
                <stop offset="64%" stopColor="#ffa200" />
                <stop offset="100%" stopColor="#ff2600" />
              </linearGradient>

              <linearGradient id="aviinTailRainbow" x1="675" y1="450" x2="885" y2="588" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#0044ff" />
                <stop offset="36%" stopColor="#5800e0" />
                <stop offset="74%" stopColor="#9e00ed" />
                <stop offset="100%" stopColor="#450794" />
              </linearGradient>
            </defs>

            {/* PART 1: Tail Feathers */}
            <g className="bird-tail-group">
              <path d="M 688 430 C 745 448, 805 492, 864 552 C 835 536, 792 508, 742 482 Z" fill="#00b4d8" opacity="0.9" />
              <path
                d="M 652 466 C 715 484, 764 534, 816 576 L 806 555 L 845 582 L 830 556 L 868 584 L 852 556 L 885 585 C 844 534, 790 476, 722 448 Z"
                fill="url(#aviinTailRainbow)"
              />
              <path d="M 710 474 C 758 502, 808 544, 862 578 C 820 540, 774 496, 726 468 Z" fill="#cf24ff" opacity="0.78" />
              <path d="M 685 478 C 730 508, 772 545, 814 574 C 782 538, 740 500, 696 474 Z" fill="#3c098c" opacity="0.7" />
            </g>

            {/* PART 2: Secondary Under-Wing */}
            <g className="bird-wing-secondary">
              <path
                d="M 592 346 C 635 292, 686 242, 738 208 L 714 246 L 756 230 L 718 276 L 768 266 L 722 310 L 778 306 L 718 342 L 768 344 L 700 368 L 750 374 C 686 385, 626 382, 592 346 Z"
                fill="#12c75c"
              />
              <path
                d="M 596 352 C 640 318, 690 294, 748 286 L 714 316 L 760 320 L 708 346 L 754 355 C 692 368, 636 368, 596 352 Z"
                fill="#00b57a"
              />
            </g>

            {/* PART 3: Primary Rainbow Upper-Wing */}
            <g className="bird-wing-primary">
              <path
                d="M 592 348 C 652 242, 754 116, 886 16 L 870 44 L 898 25 L 866 72 L 892 56 L 854 108 L 886 90 L 840 152 L 884 126 L 834 188 L 876 166 L 824 224 L 866 210 L 806 264 L 848 256 L 786 302 L 826 296 L 764 334 L 796 334 L 736 362 L 774 366 L 710 384 L 752 388 C 694 398, 634 392, 592 348 Z"
                fill="url(#aviinWingRainbow)"
              />
              <path d="M 610 340 C 674 252, 766 142, 876 46 C 794 140, 708 248, 636 350 Z" fill="url(#aviinWingStreak)" opacity="0.88" />
              <path d="M 628 354 C 698 278, 784 188, 864 120 C 794 204, 720 286, 648 366 Z" fill="#ff9900" opacity="0.65" />
              <path d="M 604 344 C 655 275, 720 200, 795 130 C 730 210, 668 282, 618 352 Z" fill="#a8eb12" opacity="0.55" />
            </g>

            {/* PART 4: Body & Breast */}
            <g className="bird-body-group">
              <path
                d="M 432 294 C 462 306, 488 338, 515 395 C 542 452, 578 488, 685 505 C 735 512, 768 502, 795 492 C 752 442, 682 378, 612 325 C 555 292, 485 288, 432 294 Z"
                fill="url(#aviinBreastGrad)"
              />
              <path
                d="M 430 302 C 462 315, 486 346, 512 402 C 538 458, 576 492, 688 506 L 666 494 L 702 501 L 674 486 C 588 475, 552 442, 526 388 C 502 336, 474 308, 430 302 Z"
                fill="url(#aviinBellyEdge)"
              />
              <path
                d="M 522 292 C 565 312, 615 358, 678 415 L 652 408 L 692 432 L 658 426 L 705 452 C 642 435, 588 395, 548 345 Z"
                fill="#25d664"
                opacity="0.88"
              />
              <path d="M 575 348 C 618 378, 662 415, 712 448 C 668 432, 618 398, 575 348 Z" fill="#8be026" opacity="0.75" />
            </g>

            {/* PART 5: Beak & Head */}
            <g className="bird-head-group">
              <path d="M 288 313 Q 368 294 446 293 L 446 312 Q 368 305 288 313 Z" fill="url(#aviinBeakGrad)" />
              <path
                d="M 432 294 C 456 260, 488 245, 532 251 C 574 257, 602 290, 622 332 C 575 345, 515 335, 432 294 Z"
                fill="url(#aviinHeadGrad)"
              />
              <path d="M 508 282 C 542 290, 575 312, 602 342 C 568 330, 535 308, 508 282 Z" fill="#80e622" opacity="0.72" />
              <ellipse cx="492" cy="296" rx="14" ry="11.5" transform="rotate(-8 492 296)" fill="#182878" />
              <ellipse cx="492" cy="296" rx="10" ry="8.2" transform="rotate(-8 492 296)" fill="#0d153d" />
              <circle cx="488" cy="293" r="2.3" fill="#00eaff" opacity="0.65" />
            </g>
          </svg>
        </div>

        {/* High-Contrast Editorial Wordmark ("Aviin") — Mode 4 Cascade Drop Animation */}
        <div className="wordmark-stage">
          <h1 className="aviin-word" aria-label="Aviin">
            <span className="aviin-char" data-char="A">A</span>
            <span className="aviin-char" data-char="v">v</span>
            <span className="aviin-char" data-char="i1">
              <span className="i-stem">ı</span>
              <span className="i-dot"></span>
            </span>
            <span className="aviin-char" data-char="i2">
              <span className="i-stem">ı</span>
              <span className="i-dot"></span>
            </span>
            <span className="aviin-char" data-char="n">n</span>
          </h1>
        </div>
      </div>
    </div>
  );
}
