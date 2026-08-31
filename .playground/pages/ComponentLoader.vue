<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ComponentLoader</h2>
    <ComponentLoader :is-loading="false" :has-data="true" />
    <div style="margin-top:1rem"><ComponentLoader :is-loading="true" /></div>
    <div style="margin-top:1rem"><ComponentLoader :has-data="false" empty-state-name="transactions" /></div>
  </div>
</template>
