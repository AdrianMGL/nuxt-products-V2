<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { data } = await useFetch('/api/hello');
const { data: users } = await useFetch('/api/users')

const links = ref<ButtonProps[]>([
  {
    label: 'Get started',
    color: 'neutral'
  },
  {
    label: 'Learn more',
    color: 'neutral',
    variant: 'subtle',
    trailingIcon: 'i-lucide-arrow-right'
  }
])
</script>

<template>
  <div>
    <div>
      <h1>Users</h1>
      <ul v-if="users?.length">
        <li v-for="user in users" :key="user.id">{{ user.name }} ({{ user.email }})</li>
      </ul>
      <p v-else>No users yet.</p>
    </div>

    <UPageCTA
      :title="data?.message"
      :description="data?.description"
      orientation="horizontal"
      :links="links"
    >
      <img
        src="https://picsum.photos/640/728"
        width="320"
        height="364"
        alt="Illustration"
        class="w-full rounded-lg"
        loading="lazy"
      />
    </UPageCTA>
  </div>
</template>