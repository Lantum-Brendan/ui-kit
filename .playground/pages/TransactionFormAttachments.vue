<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormAttachments</h2>
    <TForm title="Attachments" submit-label="Save" cancel-label="Cancel">
      <TransactionFormAttachments
        :existing-attachments="existing"
        :existing-previews="{}"
        :new-attachments="[]"
        input-id="file-input"
        :labels="labels"
      />
    </TForm>
    <div style="margin-top:1rem"><TButton text="Upload" variant="primary" :full-width="false" /></div>
  </div>
</template>

<script setup>
const existing = [
  { id: 1, path: 'receipt.jpg' },
  { id: 2, path: 'invoice.pdf' }
];
const labels = {
  attachment: 'Attachment',
  remove: 'Remove',
  browseFiles: 'Browse files',
  fileHint: 'Up to 5 files, images or PDFs'
};
</script>
