<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TFormInput</h2>
    <div style="display:flex; flex-direction:column; gap:1rem">
      <TFormInput model-value="Hello world" type="text" placeholder="Enter text..." size="md" />
      <TFormInput model-value="" type="email" placeholder="you@example.com" size="md" />
      <TFormInput model-value="Error value" type="text" :error="true" size="md" />
    </div>
  </div>
</template>
