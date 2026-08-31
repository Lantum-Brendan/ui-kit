<template>
  <div :key="party.id" class="detail-body">
    <header class="hero surface" :class="netTone">
      <svg class="hero-decor" viewBox="0 0 800 80" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <defs>
          <pattern :id="`phero-dots-${party.id}`" width="18" height="18" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1" fill="var(--surface-deep, var(--color-primary-dark))" opacity="0.12" />
          </pattern>
          <radialGradient :id="`phero-bloom-${party.id}`" cx="100%" cy="50%" r="60%">
            <stop offset="0%" stop-color="var(--surface-accent, var(--color-primary-lighter))" stop-opacity="0.45" />
            <stop offset="100%" stop-color="var(--surface-accent, var(--color-primary-lighter))" stop-opacity="0" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="800" height="80" :fill="`url(#phero-dots-${party.id})`" />
        <circle cx="780" cy="40" r="120" :fill="`url(#phero-bloom-${party.id})`" />
      </svg>
      <button v-if="showBack" class="back-btn" :aria-label="labels.backToList" @click="$emit('back')"><ChevronLeft :size="18" /></button>
      <div class="hero-avatar"><component :is="resolvedIcon" :size="18" /></div>
      <div class="hero-meta"><h2 class="hero-name">{{ party.name }}</h2><span class="hero-sub"><span class="hero-type">{{ displayType }}</span><template v-if="party.description"><span class="hero-dot">·</span><span class="hero-desc">{{ party.description }}</span></template></span></div>
      <div class="hero-actions"><button class="hero-action" :aria-label="labels.edit" @click="$emit('edit', party)"><Edit3 :size="14" /></button><button class="hero-action hero-action--danger" :aria-label="labels.delete" @click="$emit('delete', party)"><Trash2 :size="14" /></button></div>
    </header>
    <section class="totals">
      <div class="total total--income"><span class="total-label">{{ labels.received }}</span><p class="total-value">{{ formatter(party.receivedAmount || 0, currency) }}</p></div>
      <div class="total-divider" />
      <div class="total total--expense"><span class="total-label">{{ labels.spent }}</span><p class="total-value">{{ formatter(party.spentAmount || 0, currency) }}</p></div>
      <div class="total-divider" />
      <div class="total total--net"><span class="total-label">{{ labels.net }}</span><p class="total-value" :class="netValue >= 0 ? 'tone-income' : 'tone-expense'">{{ formatter(netValue, currency) }}</p></div>
    </section>
    <section class="chart-card">
      <header class="chart-head"><div><span class="chart-eyebrow">{{ labels.lastSixMonths }}</span><h3 class="chart-title">{{ labels.activity }}</h3></div><span class="chart-legend"><span class="legend-dot legend-dot--income" />{{ labels.received }}<span class="legend-dot legend-dot--expense" />{{ labels.spent }}</span></header>
      <svg v-if="hasActivity" class="chart-svg" :viewBox="`0 0 ${chartW} ${chartH}`" preserveAspectRatio="none">
        <line v-for="i in 4" :key="`grid-${i}`" :x1="0" :x2="chartW" :y1="(chartH - 24) * (i / 4) + 4" :y2="(chartH - 24) * (i / 4) + 4" class="chart-grid" vector-effect="non-scaling-stroke" />
        <polyline :points="linePoints('receivedAmount')" fill="none" stroke="var(--color-income)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
        <polyline :points="linePoints('spentAmount')" fill="none" stroke="var(--color-expense)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" vector-effect="non-scaling-stroke" />
        <g v-for="(m, i) in monthly" :key="`pt-${i}`"><circle v-if="m.receivedAmount > 0" :cx="xAt(i)" :cy="yAt(m.receivedAmount)" r="3" fill="var(--color-income)" /><circle v-if="m.spentAmount > 0" :cx="xAt(i)" :cy="yAt(m.spentAmount)" r="3" fill="var(--color-expense)" /></g>
        <text v-for="(m, i) in monthly" :key="`label-${i}`" :x="xAt(i)" :y="chartH - 4" text-anchor="middle" class="chart-axis">{{ m.label }}</text>
      </svg>
      <div v-else class="chart-empty"><Activity :size="22" /><span>{{ labels.noActivity }}</span></div>
    </section>
    <section class="recent">
      <header class="recent-head"><div><span class="recent-eyebrow">{{ labels.recentTransactions }}</span><h3 class="recent-title">{{ recentTransactions.length }} {{ labels.shown }}</h3></div><button type="button" class="recent-link" @click="$emit('view-all', party.id)">{{ labels.viewAll }}<ChevronRight :size="14" /></button></header>
      <ul v-if="recentTransactions.length" class="recent-list">
        <li v-for="tx in recentTransactions" :key="tx.id" class="recent-row">
          <div class="recent-row-left"><span class="recent-type" :class="tx.type === 'INCOME' || tx.type === 'income' ? 'tone-income' : 'tone-expense'"><component :is="tx.type === 'INCOME' || tx.type === 'income' ? ArrowDownLeft : ArrowUpRight" :size="14" /></span><div class="recent-text"><span class="recent-name">{{ tx.category || tx.description || labels.transaction }}</span><span class="recent-date">{{ formatDate(tx.date || tx.datetime) }}</span></div></div>
          <span class="recent-amount" :class="tx.type === 'INCOME' || tx.type === 'income' ? 'tone-income' : 'tone-expense'">{{ formatter(parseAmount(tx.amount).value, currency) }}</span>
        </li>
      </ul>
      <div v-else class="recent-empty">{{ labels.noTransactions }}</div>
    </section>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { lucideMap } from '../utils/icons';
import { Edit3, Trash2, ChevronLeft, ChevronRight, ArrowDownLeft, ArrowUpRight, Activity } from 'lucide-vue-next';

const parseAmount = (val) => {
  if (val == null) return { value: 0, currency: 'USD' };
  if (typeof val === 'object' && 'value' in val) return val;
  const num = typeof val === 'string' ? Number(val.replace(/[^0-9.-]/g, '')) : Number(val);
  return { value: Number.isFinite(num) ? num : 0, currency: 'USD' };
};

const props = defineProps({
  party: { type: Object, required: true },
  transactions: { type: Array, default: () => [] },
  currency: { type: String, default: 'USD' },
  formatter: { type: Function, default: (n) => `${Math.round(n)}` },
  showBack: { type: Boolean, default: false },
  locale: { type: String, default: 'en' },
  labels: { type: Object, required: true }
});
defineEmits(['edit', 'delete', 'back', 'view-all']);

const chartW = 720;
const chartH = 200;
const typeLabels = computed(() => ({ individual: props.labels.individual, business: props.labels.business, organization: props.labels.organization, vendor: props.labels.vendor, client: props.labels.client }));
const displayType = computed(() => { const t = props.party?.type?.toLowerCase(); return typeLabels.value[t] || (props.party?.type ? props.party.type : props.labels.party); });
const netValue = computed(() => Number(props.party.receivedAmount || 0) - Number(props.party.spentAmount || 0));
const netTone = computed(() => { if (!props.party) return 'surface--brand'; if (netValue.value > 0) return 'surface--income'; if (netValue.value < 0) return 'surface--expense'; return 'surface--brand'; });
const resolvedIcon = computed(() => { const icon = props.party?.icon; let v=''; if(icon){ if(typeof icon==='string') v=icon; else if(icon.path) v=icon.path; else if(icon.content) v=icon.content; } if(!v) return props.party?.type==='individual'? lucideMap.User : lucideMap.Building2; return lucideMap[v] || (props.party?.type==='individual'? lucideMap.User : lucideMap.Building2); });
const partyTransactions = computed(() => props.transactions.filter((tx) => tx.partyId === props.party.id).sort((a,b)=> new Date(b.date||b.datetime).getTime() - new Date(a.date||a.datetime).getTime()));
const recentTransactions = computed(() => partyTransactions.value.slice(0,6));
const monthly = computed(() => {
  const out=[]; const now=new Date();
  for(let i=5;i>=0;i-=1){ const d=new Date(now.getFullYear(), now.getMonth()-i,1); out.push({key:`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}`, label:new Intl.DateTimeFormat(props.locale,{month:'short'}).format(d), receivedAmount:0, spentAmount:0});}
  partyTransactions.value.forEach((tx)=>{ const txDate=new Date(tx.date||tx.datetime); const key=`${txDate.getFullYear()}-${String(txDate.getMonth()+1).padStart(2,'0')}`; const bucket=out.find((m)=>m.key===key); if(!bucket) return; const v=parseAmount(tx.amount).value; if(tx.type==='INCOME'||tx.type==='income') bucket.receivedAmount+=v; else bucket.spentAmount+=v;});
  return out;
});
const maxMonthValue = computed(()=>{ let max=0; monthly.value.forEach((m)=>{ max=Math.max(max, m.receivedAmount, m.spentAmount);}); return max||1;});
const hasActivity = computed(()=> maxMonthValue.value>0);
const xAt = (i)=>{ const padding=8; const span=chartW-padding*2; return padding + (span*i)/Math.max(monthly.value.length-1,1);};
const yAt = (v)=>{ const padding=12; const span=chartH-padding*2-14; return padding+span*(1 - v/maxMonthValue.value);};
const linePoints = (key)=> monthly.value.map((m,i)=> `${xAt(i)},${yAt(m[key])}`).join(' ');
const formatDate = (val)=>{ if(!val) return ''; const d=new Date(val); return new Intl.DateTimeFormat(props.locale,{month:'short', day:'numeric', year:'numeric'}).format(d);};
</script>

<style lang="scss" scoped>
@use '../assets/scss/_vars.scss' as *;
.hero{position:relative;display:flex;align-items:center;gap:10px;padding:10px 14px;min-height:52px;border-bottom:1px solid $border-light;overflow:hidden}
.hero-decor{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0}
.hero > *:not(.hero-decor){position:relative;z-index:1}
.back-btn{width:28px;height:28px;border-radius:8px;background:var(--glass-bg);border:1px solid $border-light;color:var(--surface-deep, var(--color-primary-dark));display:none;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;@media(max-width:$breakpoint-md){display:inline-flex}}
.hero-avatar{flex-shrink:0;width:32px;height:32px;border-radius:10px;background:var(--glass-bg);border:1px solid $border-light;color:var(--surface-deep, var(--color-primary-dark));display:inline-flex;align-items:center;justify-content:center}
.hero-meta{flex:1;min-width:0;display:flex;flex-direction:column;gap:0;line-height:1.2}
.hero-name{margin:0;font-size:$font-size-base;font-weight:$font-bold;color:var(--surface-ink, var(--color-text-primary));letter-spacing:-0.015em;line-height:1.2;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hero-sub{display:inline-flex;align-items:center;gap:4px;min-width:0;font-size:11px;color:var(--surface-ink, var(--color-text-primary));opacity:0.7;font-weight:$font-medium;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.hero-type{text-transform:uppercase;letter-spacing:0.05em;font-weight:$font-bold;color:var(--surface-deep, var(--color-primary-dark));opacity:0.85}
.hero-dot{opacity:0.6}
.hero-desc{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;min-width:0}
.hero-actions{display:inline-flex;gap:2px;flex-shrink:0}
.hero-action{width:28px;height:28px;border-radius:8px;background:transparent;border:none;color:var(--surface-deep, var(--color-primary-dark));display:inline-flex;align-items:center;justify-content:center;cursor:pointer;transition:background-color $duration-fast $easing-standard, color $duration-fast $easing-standard;&:hover{background:var(--glass-bg)}&--danger:hover{color:var(--color-expense);background:rgba(var(--color-expense-rgb),0.1)}}
.totals{display:grid;grid-template-columns:1fr auto 1fr auto 1fr;align-items:center;padding:10px 14px;border-bottom:1px solid $border-light}
.total{display:flex;flex-direction:column;gap:0;min-width:0;line-height:1.2}
.total-label{font-size:10px;font-weight:$font-bold;text-transform:uppercase;letter-spacing:0.05em;color:$text-muted}
.total-value{margin:0;font-size:$font-size-sm;font-weight:$font-bold;font-variant-numeric:tabular-nums;letter-spacing:-0.005em;color:$text-primary}
.total-divider{width:1px;height:22px;background:$border-light}
.tone-income{color:var(--color-income)}.tone-expense{color:var(--color-expense)}
.chart-card,.recent{padding:12px 14px;border-bottom:1px solid $border-light;&:last-child{border-bottom:none}}
.chart-head,.recent-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;gap:$spacing-3}
.chart-eyebrow,.recent-eyebrow{font-size:11px;font-weight:$font-bold;text-transform:uppercase;letter-spacing:0.06em;color:$text-muted}
.chart-title,.recent-title{margin:2px 0 0;font-size:$font-size-base;font-weight:$font-bold;color:$text-primary;letter-spacing:-0.01em}
.chart-legend{display:inline-flex;align-items:center;gap:6px;font-size:11px;font-weight:$font-semibold;color:$text-muted;white-space:nowrap}
.legend-dot{display:inline-block;width:8px;height:8px;border-radius:50%;margin-left:4px;margin-right:2px;&--income{background:var(--color-income)}&--expense{background:var(--color-expense)}}
.chart-svg{width:100%;height:180px;display:block;@media(max-width:$breakpoint-md){height:140px}}
.chart-grid{stroke:$border-light}
.chart-axis{font-size:10px;fill:$text-muted;font-family:$font-family-sans;font-variant-numeric:tabular-nums}
.chart-empty{display:flex;flex-direction:column;align-items:center;justify-content:center;gap:6px;padding:$spacing-4;font-size:$font-size-sm;color:$text-muted;svg{opacity:0.5}}
.recent-link{display:inline-flex;align-items:center;gap:4px;font-size:$font-size-sm;font-weight:$font-semibold;color:$primary;text-decoration:none;padding:4px 8px;border-radius:8px;transition:background-color $duration-fast $easing-standard;&:hover{background:$primary-light}}
.recent-list{list-style:none;padding:0;margin:0;display:flex;flex-direction:column}
.recent-row{display:flex;align-items:center;justify-content:space-between;gap:$spacing-3;padding:$spacing-2 0;border-bottom:1px solid $border-light;&:last-child{border-bottom:none}}
.recent-row-left{display:flex;align-items:center;gap:$spacing-3;min-width:0;flex:1}
.recent-type{width:28px;height:28px;border-radius:8px;display:inline-flex;align-items:center;justify-content:center;&.tone-income{background:rgba(var(--color-income-rgb),0.12)}&.tone-expense{background:rgba(var(--color-expense-rgb),0.12)}}
.recent-text{display:flex;flex-direction:column;gap:0;min-width:0;flex:1}
.recent-name{font-size:$font-size-sm;font-weight:$font-semibold;color:$text-primary;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.recent-date{font-size:11px;color:$text-muted;font-variant-numeric:tabular-nums}
.recent-amount{font-size:$font-size-sm;font-weight:$font-bold;font-variant-numeric:tabular-nums;flex-shrink:0}
.recent-empty{padding:$spacing-3 0;text-align:center;font-size:$font-size-sm;color:$text-muted}
</style>
