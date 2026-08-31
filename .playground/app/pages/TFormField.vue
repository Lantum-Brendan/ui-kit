<template>
  <div class="page">
    <h1>TFormField</h1>
    <p>Form field wrapper with label, hints, and error display.</p>

    <section>
      <h2>Basic Field</h2>
      <TFormField label="Username" field-id="username">
        <input id="username" type="text" placeholder="Enter username" class="demo-input" />
      </TFormField>
    </section>

    <section>
      <h2>Required Field</h2>
      <TFormField label="Email" field-id="email" required>
        <input id="email" type="email" placeholder="Enter email" class="demo-input" />
      </TFormField>
    </section>

    <section>
      <h2>Field with Hint</h2>
      <TFormField label="Password" field-id="password" hint="Must be at least 8 characters" required>
        <input id="password" type="password" placeholder="Enter password" class="demo-input" />
      </TFormField>
    </section>

    <section>
      <h2>Field with Error</h2>
      <TFormField label="Confirm Password" field-id="confirm-password" error="Passwords do not match" required>
        <input id="confirm-password" type="password" placeholder="Confirm password" class="demo-input error" />
      </TFormField>
    </section>

    <section>
      <h2>Full Width Field</h2>
      <TFormField label="Bio" field-id="bio" hint="Tell us about yourself" full>
        <textarea id="bio" rows="4" placeholder="Enter your bio" class="demo-input"></textarea>
      </TFormField>
    </section>

    <section>
      <h2>With TFormInput</h2>
      <TFormField label="Name" field-id="name" required>
        <TFormInput id="name" v-model="name" placeholder="Enter your name" />
      </TFormField>
      <p v-if="name">Hello, {{ name }}!</p>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const name = ref('');
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
}

section {
  margin: 2rem 0;
  padding: 1.5rem;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

h1 {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

h2 {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 1rem;
}

.demo-input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 0.875rem;
}

.demo-input:focus {
  outline: 2px solid #047844;
  outline-offset: 2px;
}

.demo-input.error {
  border-color: #dc2626;
}

textarea.demo-input {
  resize: vertical;
  font-family: inherit;
}
</style>
