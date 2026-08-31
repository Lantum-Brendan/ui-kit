<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TFilterToggle</h2>
    <div style="display:flex; gap:1rem; align-items:center">
      <TFilterToggle :active-count="0" label="Filters" />
      <TFilterToggle :active-count="2" label="Filters" />
      <TFilterToggle :active-count="5" label="Active" />
    </div>
    <div style="margin-top:1rem"><TButton text="Action" variant="outline" :full-width="false" /></div>
  </div>
</template>
