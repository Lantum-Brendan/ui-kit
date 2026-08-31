<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TTab</h2>
    <div style="display:flex; gap:0.5rem; border-bottom:1px solid var(--color-border-light); padding-bottom:1rem">
      <TTab value="overview" label="Overview" :active="true" variant="pill" />
      <TTab value="transactions" label="Transactions" :active="false" variant="pill" />
      <TTab value="budgets" label="Budgets" :count="3" variant="pill" />
    </div>
    <div style="margin-top:1rem"><TButton text="Action" variant="primary" :full-width="false" /></div>
  </div>
</template>
