<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TPagination</h2>
    <TPagination :current-page="2" :total-pages="5" :total-entries="48" :items-per-page="10" :max-visible="5" entry-text="Showing 11 to 20 of 48 entries" />
  </div>
</template>
