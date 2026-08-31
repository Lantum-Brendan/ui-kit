<template>
  <div class="page">
    <h1>TModal</h1>
    <p>Modal dialog primitive with header, body, and footer sections.</p>

    <section>
      <h2>Basic Modal</h2>
      <TButton text="Open Basic Modal" variant="primary" @click="basicModalOpen = true" />

      <TModal v-model="basicModalOpen">
        <TModalHeader title="Basic Modal" @close="basicModalOpen = false" />
        <TModalBody>
          <p>This is a basic modal with header, body, and footer sections.</p>
        </TModalBody>
        <TModalFooter>
          <TButton text="Cancel" variant="secondary" @click="basicModalOpen = false" />
          <TButton text="Confirm" variant="primary" @click="basicModalOpen = false" />
        </TModalFooter>
      </TModal>
    </section>

    <section>
      <h2>Modal with Form</h2>
      <TButton text="Open Form Modal" variant="primary" @click="formModalOpen = true" />

      <TModal v-model="formModalOpen">
        <TModalHeader title="Edit Profile" @close="formModalOpen = false" />
        <TModalBody>
          <TFormField label="Name" field-id="modal-name" required>
            <TFormInput id="modal-name" v-model="formData.name" placeholder="Enter your name" />
          </TFormField>
          <TFormField label="Email" field-id="modal-email" required>
            <TFormInput id="modal-email" v-model="formData.email" type="email" placeholder="Enter your email" />
          </TFormField>
        </TModalBody>
        <TModalFooter>
          <TButton text="Cancel" variant="secondary" @click="formModalOpen = false" />
          <TButton text="Save" variant="primary" @click="saveForm" />
        </TModalFooter>
      </TModal>
    </section>

    <section>
      <h2>ConfirmModal</h2>
      <TButton text="Open Confirm Dialog" variant="danger" @click="confirmModalOpen = true" />

      <ConfirmModal
        v-model="confirmModalOpen"
        title="Delete Item"
        message="Are you sure you want to delete this item? This action cannot be undone."
        confirm-text="Delete"
        cancel-text="Cancel"
        variant="danger"
        @confirm="handleDelete"
      />
    </section>

    <section>
      <h2>Large Modal</h2>
      <TButton text="Open Large Modal" variant="primary" @click="largeModalOpen = true" />

      <TModal v-model="largeModalOpen" size="lg">
        <TModalHeader title="Large Modal" @close="largeModalOpen = false" />
        <TModalBody>
          <p>This is a larger modal for more complex content.</p>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        </TModalBody>
        <TModalFooter>
          <TButton text="Close" variant="secondary" @click="largeModalOpen = false" />
        </TModalFooter>
      </TModal>
    </section>

    <div v-if="savedData">
      <h3>Saved Data:</h3>
      <pre>{{ savedData }}</pre>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const basicModalOpen = ref(false);
const formModalOpen = ref(false);
const confirmModalOpen = ref(false);
const largeModalOpen = ref(false);

const formData = ref({
  name: '',
  email: ''
});

const savedData = ref(null);

const saveForm = () => {
  savedData.value = { ...formData.value };
  formModalOpen.value = false;
};

const handleDelete = () => {
  alert('Item deleted!');
  confirmModalOpen.value = false;
};
</script>

<style scoped>
.page {
  padding: 2rem;
  max-width: 1200px;
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

h3 {
  font-size: 1.25rem;
  font-weight: 600;
  margin-top: 2rem;
}

pre {
  background: #f3f4f6;
  padding: 1rem;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
