<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ChatImportReviewBlock</h2>
    <ChatImportReviewBlock :block="{ file_name: 'july.csv', total: 24 }" status="ready" />
    <div style="margin-top:1rem"><ChatImportReviewBlock :block="{}" status="analyzing" /></div>
  </div>
</template>
