<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ContentTablePagination</h2>
    <ContentTablePagination :current-page="2" :total-pages="5" :per-page="10" />
    <div style="margin-top:1rem"><TButton text="Next" variant="outline" :full-width="false" /></div>
  </div>
</template>
