<template>
    <div>
        <h1>Home</h1>
        <p>Welcome to the home page!</p>
    </div>

    <UBanner class="my-25" title="This is a banner with an important message." />

    <div class="flex items-center gap-4 m-25">
        <USkeleton class="size-12 rounded-full" />
        <div class="grid gap-2">
            <USkeleton class="h-4 w-[250px]" />
            <USkeleton class="h-4 w-[200px]" />
        </div>
    </div>

    <UButton class="m-25" icon="i-lucide-rocket" size="md" color="primary" variant="solid">Button</UButton>

</template>