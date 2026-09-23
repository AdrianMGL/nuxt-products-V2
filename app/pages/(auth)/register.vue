<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'login-layout',
  middleware: 'not-authenticated',
});

const toast = useToast()

const fields: AuthFormField[] = [
{
  name: 'name',
  type: 'text',
  label: 'Full  Name',
  placeholder: 'Enter your name',
  required: true
},  
{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox'
}]

const providers = [{
  label: 'Google',
  icon: 'i-simple-icons-google',
  onClick: () => {
    toast.add({ title: 'Google', description: 'Login with Google' })
  }
}, {
  label: 'GitHub',
  icon: 'i-simple-icons-github',
  onClick: () => {
    toast.add({ title: 'GitHub', description: 'Login with GitHub' })
  }
}]

const schema = z.object({
  name: z.string('Name is required').min(2, 'Must be at least 2 characters'),
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters')
})

type Schema = z.output<typeof schema>

function onSubmit(payload: FormSubmitEvent<Schema>) {
  console.log('Submitted', payload)
}
</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm
        :schema="schema"
        title="Crear una cuenta"
        description="Enter your credentials to access your account."
        icon="i-lucide-user"
        :fields="fields"
        @submit="onSubmit"
        :ui="{
          leadingIcon: 'text-5xl text-primary',
        }"
      />
    </UPageCard>

    <UButton 
        color="primary"
        variant="ghost" 
        class="mt-4" 
        to="/login"
        label="Already have an account? Sign in"
    />
  </div>
</template>