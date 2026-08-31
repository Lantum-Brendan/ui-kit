<template>
  <div style="padding:2rem; max-width:600px; margin:0 auto">
    <h2 style="margin-bottom:1rem">SettingsAccount</h2>
    <SettingsAccount :is-edit-mode="false" :user="user" avatar-url="https://i.pravatar.cc/100?img=5" :labels="labels" />
  </div>
</template>

<script setup>
const user = { first_name: 'Jane', last_name: 'Doe', username: 'janedoe', email: 'jane@example.com' };
const labels = {
  profilePicture: 'Profile Picture',
  userAvatar: 'User Avatar',
  firstName: 'First Name',
  lastName: 'Last Name',
  username: 'Username',
  emailAddress: 'Email Address',
  password: 'Password',
  changePassword: 'Change Password',
  updateAccount: 'Update Account'
};
</script>
