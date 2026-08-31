<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">MonthInReviewIllustration</h2>
    <div style="display:grid; grid-template-columns:repeat(2,1fr); gap:1rem; height:300px">
      <div style="position:relative; border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
        <MonthInReviewIllustration kind="opening" />
        <span style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px; font-size:12px">opening</span>
      </div>
      <div style="position:relative; border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
        <MonthInReviewIllustration kind="income" />
        <span style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px; font-size:12px">income</span>
      </div>
      <div style="position:relative; border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
        <MonthInReviewIllustration kind="spending" />
        <span style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px; font-size:12px">spending</span>
      </div>
      <div style="position:relative; border:1px solid var(--color-border-light); border-radius:12px; overflow:hidden">
        <MonthInReviewIllustration kind="closing" />
        <span style="position:absolute; bottom:8px; left:8px; background:rgba(0,0,0,0.6); color:#fff; padding:2px 6px; border-radius:4px; font-size:12px">closing</span>
      </div>
    </div>
    <div style="margin-top:1rem"><TButton text="Next" variant="primary" :full-width="false" /></div>
  </div>
</template>
