<template>
    <div class="flex flex-col h-screen">
        <!-- <MainNavigation /> -->

        <!-- Header -->
        <SharedHeader />

        <main class="container mx-auto mt-2 flex-1">
            <slot />
        </main>

        <!-- footer -->
        <SharedFooter />

    </div>
</template>