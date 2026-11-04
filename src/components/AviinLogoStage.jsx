import React from 'react';

export default function AviinLogoStage({ isSettled = false }) {
  return (
    <div className="logo-stage-shell" id="logoStage">
      <svg
        className="aviin-exact-svg"
        id="aviinExactSvg"
        viewBox="0 220 1000 560"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Aviin"
      >
        <defs>
          {/* Hummingbird Gradients Sampled Directly from logo_preserved.jpg */}
          <linearGradient id="birdBeakGrad" x1="772" y1="427" x2="816" y2="432" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3c0ca8" />
            <stop offset="55%" stopColor="#1d35d8" />
            <stop offset="100%" stopColor="#0066ff" />
          </linearGradient>

          <linearGradient id="birdCrownGrad" x1="806" y1="422" x2="854" y2="452" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#00f2ff" />
            <stop offset="48%" stopColor="#00e096" />
            <stop offset="100%" stopColor="#12ba5c" />
          </linearGradient>

          <linearGradient id="birdChestGrad" x1="810" y1="438" x2="878" y2="492" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0048ff" />
            <stop offset="38%" stopColor="#00aaff" />
            <stop offset="72%" stopColor="#00e1d9" />
            <stop offset="100%" stopColor="#242ef0" />
          </linearGradient>

          <linearGradient id="birdWingGrad" x1="848" y1="458" x2="939" y2="398" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0eb854" />
            <stop offset="20%" stopColor="#84e320" />
            <stop offset="42%" stopColor="#ffda00" />
            <stop offset="65%" stopColor="#ff7b00" />
            <stop offset="88%" stopColor="#ff2a00" />
            <stop offset="100%" stopColor="#dc1000" />
          </linearGradient>

          <linearGradient id="birdTailGrad" x1="864" y1="472" x2="899" y2="512" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0055ff" />
            <stop offset="45%" stopColor="#6200ea" />
            <stop offset="85%" stopColor="#a900f5" />
            <stop offset="100%" stopColor="#480699" />
          </linearGradient>

          {/* Soft Haute Couture Luminous Ink Gradient for the Aviin Wordmark */}
          <linearGradient id="luxuryInkGrad" x1="10%" y1="10%" x2="90%" y2="90%">
            <stop offset="0%" stopColor="#3a344d" />
            <stop offset="50%" stopColor="#2e283e" />
            <stop offset="100%" stopColor="#252033" />
          </linearGradient>
        </defs>

        {/* 1. EXACT BRUSH-SCRIPT "Aviin" FROM 8.jpg (Reveals Letter-by-Letter) */}
        <g id="exactAviinBrushWordmark">
          {/* Letter 1A: Capital 'A' Diagonal Left Strut + Apex + Right Downstroke */}
          <g className="letter-unit unit-a-stem">
            <path
              className="logo-ink-path"
              d="
                M 476 327
                C 499 324, 515 335, 511 358
                C 502 406, 474 478, 444 556
                C 424 606, 405 648, 392 659
                C 380 668, 361 666, 357 651
                C 354 636, 363 606, 381 558
                C 408 486, 444 404, 468 351
                C 442 362, 396 398, 342 456
                C 272 530, 206 610, 174 644
                C 166 652, 157 648, 159 636
                C 162 618, 186 584, 236 528
                C 312 442, 402 362, 456 334
                C 464 330, 470 328, 476 327 Z"
            />
          </g>

          {/* Letter 1B: Capital 'A' Sweeping Brush Crossbar */}
          <g className="letter-unit unit-a-bar">
            <path
              className="logo-ink-path"
              d="
                M 45 554
                C 41 564, 52 572, 68 566
                C 104 552, 166 520, 246 498
                C 338 473, 442 469, 532 478
                C 552 480, 565 483, 569 485
                C 572 486, 573 483, 568 480
                C 548 470, 488 462, 412 462
                C 312 462, 204 484, 112 522
                C 72 538, 49 546, 45 554 Z"
            />
          </g>

          {/* Letter 2: Handwritten Brush 'v' */}
          <g className="letter-unit unit-v">
            <path
              className="logo-ink-path"
              d="
                M 476 504
                C 484 488, 514 489, 517 506
                C 519 520, 501 558, 494 584
                C 491 594, 496 596, 505 585
                C 528 560, 556 520, 574 494
                C 580 486, 589 488, 585 498
                C 566 534, 532 584, 498 610
                C 480 623, 454 619, 452 595
                C 450 568, 465 524, 476 504 Z"
            />
          </g>

          {/* Letter 3: First 'i' Stem + Slanted Dot */}
          <g className="letter-unit unit-i1">
            <path
              className="logo-ink-path"
              d="
                M 598 500
                C 608 486, 636 488, 636 506
                C 636 522, 614 558, 610 578
                C 608 587, 614 589, 624 580
                C 642 566, 664 538, 678 514
                C 683 506, 690 510, 685 520
                C 668 552, 642 586, 616 600
                C 596 610, 574 601, 574 576
                C 574 550, 589 516, 598 500 Z"
            />
          </g>
          <ellipse
            className="logo-ink-path unit-dot unit-dot-1"
            cx="645"
            cy="456"
            rx="21.5"
            ry="14.5"
            transform="rotate(-34 645 456)"
          />

          {/* Letter 4: Second 'i' Stem + Slanted Dot */}
          <g className="letter-unit unit-i2">
            <path
              className="logo-ink-path"
              d="
                M 678 498
                C 688 484, 715 486, 715 504
                C 715 520, 694 554, 690 574
                C 688 583, 694 585, 704 576
                C 722 562, 744 534, 758 510
                C 763 502, 770 506, 765 516
                C 748 548, 722 582, 696 596
                C 676 606, 654 597, 654 572
                C 654 546, 669 514, 678 498 Z"
            />
          </g>
          <ellipse
            className="logo-ink-path unit-dot unit-dot-2"
            cx="724"
            cy="455"
            rx="21.5"
            ry="14.5"
            transform="rotate(-34 724 455)"
          />

          {/* Letter 5: Handwritten Brush 'n' */}
          <g className="letter-unit unit-n">
            <path
              className="logo-ink-path"
              d="
                M 754 490
                C 764 476, 792 478, 792 496
                C 792 512, 776 540, 770 554
                C 792 524, 818 494, 840 484
                C 858 476, 874 485, 871 508
                C 868 530, 856 556, 858 568
                C 860 577, 870 577, 884 568
                C 904 554, 928 530, 945 510
                C 950 504, 956 508, 951 517
                C 932 544, 904 574, 878 587
                C 852 599, 825 590, 825 564
                C 825 544, 837 518, 837 507
                C 837 500, 830 500, 818 511
                C 796 530, 772 562, 758 580
                C 746 595, 724 590, 726 568
                C 728 544, 744 508, 754 490 Z"
            />
          </g>
        </g>

        {/* 2. EXACT RAINBOW HUMMINGBIRD FLIGHT & HOVER */}
        <g className={`bird-flight-master ${isSettled ? 'perch-hidden' : ''}`} id="birdFlightMaster">
          {/* Violet-Purple Tail Feathers */}
          <g className="bird-tail-feathers">
            <path d="M 866 462 C 878 472, 890 488, 898 510 C 888 500, 875 486, 864 472 Z" fill="#00b4d8" opacity="0.92" />
            <path
              d="M 856 470
                 C 868 482, 880 500, 889 514
                 L 886 506 L 894 515
                 L 891 505 L 899 514
                 C 890 494, 878 474, 864 464 Z"
              fill="url(#birdTailGrad)"
            />
            <path d="M 866 472 C 876 485, 886 500, 894 512 C 884 498, 874 482, 866 472 Z" fill="#d426ff" opacity="0.82" />
          </g>

          {/* Emerald Secondary Under-Wing */}
          <g className="bird-wing-secondary">
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
          <g className="bird-wing-primary">
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
              fill="url(#birdWingGrad)"
            />
            <path d="M 852 444 C 874 424, 904 404, 931 393 C 906 411, 880 430, 858 448 Z" fill="#ff9e00" opacity="0.74" />
            <path d="M 850 445 C 866 428, 888 412, 908 402 C 888 418, 870 434, 854 447 Z" fill="#a8eb12" opacity="0.62" />
          </g>

          {/* Cobalt & Cyan-Turquoise Chest + Emerald Back */}
          <g className="bird-body-core">
            <path
              d="M 808 432
                 C 815 439, 818 452, 823 465
                 C 828 478, 840 485, 866 488
                 C 876 489, 884 487, 888 483
                 C 878 469, 864 454, 846 441
                 C 832 432, 819 430, 808 432 Z"
              fill="url(#birdChestGrad)"
            />
            <path
              d="M 830 432
                 C 842 439, 855 450, 868 463
                 C 856 463, 842 452, 830 432 Z"
              fill="#1fd660"
              opacity="0.9"
            />
          </g>

          {/* Slender Indigo-Blue Beak + Cyan-Green Crown + Eye */}
          <g className="bird-head-core">
            <path d="M 770 423 Q 792 423 812 428 L 811 433 Q 792 427 770 423 Z" fill="url(#birdBeakGrad)" />
            <path
              d="M 807 431
                 C 814 422, 824 419, 835 422
                 C 844 425, 852 434, 856 445
                 C 842 447, 825 443, 807 431 Z"
              fill="url(#birdCrownGrad)"
            />
            <ellipse cx="821" cy="431" rx="3.4" ry="2.8" transform="rotate(-6 821 431)" fill="#14226b" />
            <circle cx="820.2" cy="430.3" r="0.85" fill="#00f0ff" opacity="0.78" />
          </g>
        </g>
      </svg>
    </div>
  );
}
