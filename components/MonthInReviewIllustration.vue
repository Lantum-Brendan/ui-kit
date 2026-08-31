<template>
  <svg
    class="illustration"
    viewBox="0 0 600 600"
    preserveAspectRatio="xMidYMid slice"
    aria-hidden="true"
  >
    <defs>
      <radialGradient :id="`grad-${kind}`" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stop-color="var(--slide-accent)" stop-opacity="0.7" />
        <stop offset="100%" stop-color="var(--slide-accent)" stop-opacity="0.05" />
      </radialGradient>
      <pattern :id="`dots-${kind}`" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="2" cy="2" r="1.4" fill="var(--slide-deep)" opacity="0.18" />
      </pattern>
    </defs>

    <g v-if="kind === 'opening'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <circle cx="300" cy="620" r="320" :fill="`url(#grad-${kind})`" />
      <g transform="translate(300 620)" stroke="var(--slide-deep)" stroke-width="6" stroke-linecap="round" opacity="0.55">
        <line v-for="i in 12" :key="i" :x1="0" :y1="-330" :x2="0" :y2="-380" :transform="`rotate(${(i - 6) * 15})`" />
      </g>
      <circle cx="300" cy="620" r="180" fill="var(--slide-accent)" opacity="0.5" />
      <circle cx="300" cy="620" r="110" fill="var(--slide-deep)" opacity="0.85" />
      <circle cx="120" cy="120" r="10" fill="var(--slide-deep)" opacity="0.6" />
      <circle cx="500" cy="80" r="14" fill="var(--slide-accent)" opacity="0.85" />
      <circle cx="540" cy="220" r="6" fill="var(--slide-deep)" opacity="0.7" />
      <circle cx="80" cy="280" r="8" fill="var(--slide-accent)" opacity="0.7" />
    </g>

    <g v-else-if="kind === 'income'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <path d="M 0 600 L 0 510 L 80 470 L 160 410 L 240 340 L 320 260 L 400 200 L 480 130 L 560 70 L 600 50 L 600 600 Z" :fill="`url(#grad-${kind})`" />
      <path d="M 0 510 L 80 470 L 160 410 L 240 340 L 320 260 L 400 200 L 480 130 L 560 70 L 600 50" fill="none" stroke="var(--slide-deep)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round" />
      <g v-for="(p, i) in [[80, 470],[160, 410],[240, 340],[320, 260],[400, 200],[480, 130],[560, 70]]" :key="i">
        <circle :cx="p[0]" :cy="p[1]" r="10" fill="var(--slide-bg)" stroke="var(--slide-deep)" stroke-width="4" />
      </g>
      <g v-for="(b, i) in [70, 140, 210, 280, 350, 420, 490]" :key="`b-${i}`">
        <rect :x="b" y="540" width="40" :height="40 + i * 14" rx="6" fill="var(--slide-deep)" opacity="0.16" />
      </g>
    </g>

    <g v-else-if="kind === 'spending'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <circle cx="300" cy="300" r="260" fill="var(--slide-accent)" opacity="0.14" />
      <circle cx="300" cy="300" r="210" fill="none" stroke="var(--slide-deep)" stroke-width="30" stroke-dasharray="380 1320" stroke-linecap="round" opacity="0.85" transform="rotate(-90 300 300)" />
      <circle cx="300" cy="300" r="210" fill="none" stroke="var(--slide-accent)" stroke-width="30" stroke-dasharray="260 1320" stroke-linecap="round" opacity="0.95" transform="rotate(38 300 300)" />
      <circle cx="300" cy="300" r="210" fill="none" stroke="var(--slide-deep)" stroke-width="30" stroke-dasharray="180 1320" stroke-linecap="round" opacity="0.6" transform="rotate(96 300 300)" />
      <circle cx="300" cy="300" r="210" fill="none" stroke="var(--slide-accent)" stroke-width="30" stroke-dasharray="120 1320" stroke-linecap="round" opacity="0.45" transform="rotate(146 300 300)" />
      <circle cx="300" cy="300" r="150" fill="var(--slide-bg)" />
      <circle cx="300" cy="300" r="120" fill="var(--slide-accent)" opacity="0.25" />
    </g>

    <g v-else-if="kind === 'topCategory'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <g transform="translate(300 300)" stroke="var(--slide-deep)" stroke-width="5" stroke-linecap="round" opacity="0.55">
        <line v-for="i in 18" :key="i" x1="0" y1="-240" x2="0" y2="-280" :transform="`rotate(${i * 20})`" />
      </g>
      <circle cx="300" cy="300" r="220" fill="var(--slide-accent)" opacity="0.18" />
      <circle cx="300" cy="300" r="170" fill="var(--slide-accent)" opacity="0.32" />
      <circle cx="300" cy="300" r="120" fill="var(--slide-deep)" opacity="0.9" />
      <g transform="translate(300 300)" fill="var(--slide-bg)">
        <polygon points="0,-58 17,-18 60,-18 25,8 40,52 0,26 -40,52 -25,8 -60,-18 -17,-18" />
      </g>
    </g>

    <g v-else-if="kind === 'topPayee'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <path d="M 300 200 C 240 130 100 130 100 270 C 100 380 220 460 300 510 C 380 460 500 380 500 270 C 500 130 360 130 300 200 Z" :fill="`url(#grad-${kind})`" />
      <path d="M 300 240 C 260 190 170 190 170 280 C 170 350 240 410 300 440 C 360 410 430 350 430 280 C 430 190 340 190 300 240 Z" fill="var(--slide-deep)" opacity="0.85" />
      <g fill="var(--slide-accent)">
        <path d="M 90 110 C 78 100 56 100 56 122 C 56 138 74 152 90 162 C 106 152 124 138 124 122 C 124 100 102 100 90 110 Z" opacity="0.8" />
        <path d="M 510 110 C 498 100 476 100 476 122 C 476 138 494 152 510 162 C 526 152 544 138 544 122 C 544 100 522 100 510 110 Z" opacity="0.7" />
        <path d="M 60 470 C 52 463 38 463 38 477 C 38 487 50 496 60 503 C 70 496 82 487 82 477 C 82 463 68 463 60 470 Z" opacity="0.6" />
        <path d="M 540 480 C 530 471 510 471 510 491 C 510 505 526 517 540 526 C 554 517 570 505 570 491 C 570 471 550 471 540 480 Z" opacity="0.55" />
      </g>
    </g>

    <g v-else-if="kind === 'biggest'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <circle cx="300" cy="300" r="280" :fill="`url(#grad-${kind})`" />
      <g transform="translate(300 300)" stroke="var(--slide-deep)" stroke-width="6" stroke-linecap="round" opacity="0.7">
        <line v-for="i in 16" :key="i" x1="0" y1="-160" x2="0" y2="-230" :transform="`rotate(${i * 22.5})`" />
      </g>
      <circle cx="300" cy="300" r="140" fill="var(--slide-accent)" opacity="0.5" />
      <circle cx="300" cy="300" r="100" fill="var(--slide-deep)" opacity="0.95" />
      <g transform="translate(300 300)" fill="var(--slide-bg)">
        <path d="M 0 -54 C 25 -30 35 -10 30 14 C 40 6 50 -4 54 -16 C 68 -2 72 22 60 42 C 48 60 24 70 0 70 C -24 70 -48 60 -60 42 C -72 22 -68 -2 -54 -16 C -50 -4 -40 6 -30 14 C -35 -10 -25 -30 0 -54 Z" />
      </g>
    </g>

    <g v-else-if="kind === 'closing'">
      <rect x="0" y="0" width="600" height="600" :fill="`url(#dots-${kind})`" />
      <circle cx="300" cy="300" r="260" :fill="`url(#grad-${kind})`" />
      <circle cx="300" cy="300" r="170" fill="var(--slide-accent)" opacity="0.4" />
      <circle cx="300" cy="300" r="110" fill="var(--slide-deep)" opacity="0.9" />
      <g transform="translate(300 300)" stroke="var(--slide-bg)" stroke-width="6" stroke-linecap="round">
        <polyline points="-32,4 -10,28 36,-26" fill="none" />
      </g>
      <g>
        <rect v-for="(p, i) in confettiDots" :key="i" :x="p.x - p.r" :y="p.y - p.r" :width="p.r * 2" :height="p.r * 2" :fill="p.fill" :opacity="p.o" :transform="`rotate(${(i * 37) % 360} ${p.x} ${p.y})`" rx="2" />
      </g>
    </g>
  </svg>
</template>

<script setup>
defineProps({
  kind: { type: String, required: true },
  confettiDots: { type: Array, default: () => [] }
});
</script>

<style lang="scss" scoped>
.illustration {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
</style>
