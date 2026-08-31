<template>
  <div style="padding:2rem; max-width:800px; margin:0 auto">
    <h2 style="margin-bottom:1rem">TransactionFormGroups</h2>
    <TForm title="Transaction groups" submit-label="Save" cancel-label="Cancel">
      <TransactionFormGroups
        :groups="groups"
        :categories="categories"
        group-search-query=""
        category-search-query=""
        :selected-group-id="1"
        :selected-additional-category-ids="[10]"
        :labels="labels"
        :category-error="false"
        :is-group-default="false"
      />
    </TForm>
    <div style="margin-top:1rem"><TButton text="Action" variant="outline" :full-width="false" /></div>
  </div>
</template>

<script setup>
const groups = [
  { id: 1, name: 'General', label: 'General', value: 1 },
  { id: 2, name: 'Work', label: 'Work', value: 2 }
];
const categories = [
  { id: 10, name: 'Food', label: 'Food', value: 10 },
  { id: 11, name: 'Transport', label: 'Transport', value: 11 }
];
const labels = {
  group: 'Group',
  groupError: 'Group required',
  searchGroup: 'Search groups…',
  categories: 'Categories',
  searchCategories: 'Search categories…',
  defaultGroup: 'Default group',
  default: 'Default'
};
</script>
