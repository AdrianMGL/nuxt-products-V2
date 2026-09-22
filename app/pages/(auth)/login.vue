<script setup lang="ts">
import * as z from 'zod'
import type { FormSubmitEvent, AuthFormField } from '@nuxt/ui'

definePageMeta({
  layout: 'login-layout'
});

const toast = useToast()

const cookieLoginEmail = useCookie<string | null>('login_email', {
  sameSite: 'strict',
  maxAge: 60 * 60 * 24 * 30, // 30 dias
});

const { login } = useAuthentication();
const isPosting = ref(false);

const fields: AuthFormField[] = [{
  name: 'email',
  type: 'email',
  label: 'Email',
  placeholder: 'Enter your email',
  required: true,
  defaultValue: cookieLoginEmail.value || '',
}, {
  name: 'password',
  label: 'Password',
  type: 'password',
  placeholder: 'Enter your password',
  required: true,
}, {
  name: 'remember',
  label: 'Remember me',
  type: 'checkbox',
  defaultValue: !!(cookieLoginEmail.value),
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
  email: z.email('Invalid email'),
  password: z.string('Password is required').min(8, 'Must be at least 8 characters'),
  remember: z.boolean().optional(),
})

type Schema = z.output<typeof schema>

async function onSubmit(payload: FormSubmitEvent<Schema>) {
  const { email, password, remember } = payload.data;

  isPosting.value = true;

  if (remember) {
    cookieLoginEmail.value = email;
  } else {
    cookieLoginEmail.value = null;
  }

  const isSuccessfully = await login(email, password);

  if (!isSuccessfully) {
    toast.add({
      title: 'Login failed',
      description: 'Credenciales no son validas.',
    });
  }

}

</script>

<template>
  <div class="flex flex-col items-center justify-center gap-4 p-4">
    <UPageCard class="w-full max-w-md">
      <UAuthForm 
          :schema="schema" 
          title="Login" 
          description="Enter your credentials to access your account."
          icon="i-lucide-user" 
          :fields="fields" 
          :providers="providers" 
          @submit="onSubmit" 
          :disabled="isPosting" 
          :loading="isPosting" 
          :ui="{
              leadingIcon: 'text-5xl text-primary',
            }" 
          />
    </UPageCard>

    <UButton color="primary" variant="ghost" class="mt-4" to="/register" label="Don't have an account? Sign up" />
  </div>
</template>