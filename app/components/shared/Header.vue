<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [{
  label: 'Productos',
  to: '/products',
  icon: 'i-lucide-wallet',
  active: route.path.startsWith('/products')
}, {
  label: 'Precios',
  to: '/pricing',
  icon: 'i-lucide-box',
  active: route.path.startsWith('/pricing')
}, {
  label: 'Nosotros',
  icon: 'i-simple-icons-figma',
  to: '/about',
  active: route.path.startsWith('/about')
}, {
  label: 'Contacto',
  icon: 'i-lucide-mail',
  to: '/contact',
  active: route.path.startsWith('/contact')
}, 
{
  label: 'Releases',
  icon: 'i-lucide-rocket',
  to: 'https://github.com/nuxt/ui/releases',
  target: '_blank'
}])

const responsiveMenu = ref ([
    ...items.value,
    {
        label: 'Iniciar Sesión',
        icon: 'i-heroicons-user-circle',
        to: '/login',
        active: route.path.startsWith('/login'),
    },
]);

</script>

<template>
  <UHeader>
    <template #title>
      <IconsNuxtui class="h-6 w-auto" />
    </template>

    <UNavigationMenu :items="items" />

    <template #right>
      <UColorModeButton />

      <UTooltip text="Open on GitHub" :kbds="['meta', 'G']">
        <UButton
          color="neutral"
          variant="ghost"
          to="https://github.com/nuxt/ui"
          target="_blank"
          icon="i-simple-icons-github"
          aria-label="GitHub"
        />
      </UTooltip>

      <UButton
        color="primary"
        variant="solid"
        icon="i-heroicons-user-circle"
        to="/login"
        label="Login"
        aria-label="Login"
        />

    </template>

    <template #body>
      <UNavigationMenu :items="responsiveMenu" orientation="vertical" class="-mx-2.5" />
    </template>
  </UHeader>
</template>