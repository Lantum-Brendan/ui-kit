<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">ImportUploadDropzone</h2>
    <ImportUploadDropzone
      :labels="{ dropzone: 'Drop your file here or click to browse', supportedFormats: 'Supports CSV, PDF, PNG, JPG, TIFF, BMP' }"
    />
    <div style="margin-top:1rem">
      <TButton text="Browse" variant="primary" :full-width="false" />
    </div>
  </div>
</template>
