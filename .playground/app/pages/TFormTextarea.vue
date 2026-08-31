<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TFormTextarea</h2>
    <TFormTextarea model-value="A short description with a few lines of text to preview the textarea component." :rows="4" placeholder="Enter details..." />
    <div style="margin-top:1rem"><TFormTextarea model-value="" :rows="3" placeholder="Empty state..." /></div>
  </div>
</template>
