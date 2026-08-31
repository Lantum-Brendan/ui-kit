<template>
  <div style="padding:2rem; max-width:900px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TSidebar</h2>
    <div style="position:relative; height:400px; border:1px solid var(--color-border-light); overflow:hidden">
      <TSidebar current-path="/dashboard" :is-sidebar-open="false" :is-mobile="false" :collapsed="false" />
    </div>
    <div style="margin-top:1rem"><TButton text="Navigate" variant="primary" :full-width="false" /></div>
  </div>
</template>
