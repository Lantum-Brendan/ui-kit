<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ImportUploadFileList</h2>
    <ImportUploadFileList :files="files" />
    <div style="margin-top:1rem"><TButton text="Remove" variant="outline" :full-width="false" /></div>
  </div>
</template>

<script setup>
const files = [
  { name: 'bank-statement.csv', size: 24576 },
  { name: 'receipt.jpg', size: 102400 }
];
</script>
