<template>
  <div class="space-y-6">
    <!-- Header with Action Button -->
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
          Productos
        </h1>
        <p class="text-gray-600 dark:text-gray-400 mt-2">
          Gestiona y organiza tu catálogo de productos
        </p>
      </div>
      <UButton
        icon="i-lucide-plus"
        label="Agregar Producto"
        color="primary"
        size="lg"
      />
    </div>

    <UTable :data="products" :columns="columns" class="flex-1" />

    <SharedPagination
      :total="total" 
      :model-value="currentPage"
      :per-page="perPage"
    />
  </div>
</template>

<script setup lang="ts">
import { h, resolveComponent } from 'vue';
import type { TableColumn } from '@nuxt/ui';
const UBadge = resolveComponent('UBadge');

const { products, currentPage, perPage, total } = await usePaginatedProducts();

/*
type Product = {
  id: string;
  date: string;
  status: 'paid' | 'failed' | 'refunded';
  email: string;
  amount: number;
};
*/
/*
const data = ref<Product[]>([
  {
    id: '4600',
    date: '2024-03-11T15:30:00',
    status: 'paid',
    email: 'james.anderson@example.com',
    amount: 594,
  },
  {
    id: '4599',
    date: '2024-03-11T10:10:00',
    status: 'failed',
    email: 'mia.white@example.com',
    amount: 276,
  },
  {
    id: '4598',
    date: '2024-03-11T08:50:00',
    status: 'refunded',
    email: 'william.brown@example.com',
    amount: 315,
  },
  {
    id: '4597',
    date: '2024-03-10T19:45:00',
    status: 'paid',
    email: 'emma.davis@example.com',
    amount: 529,
  },
  {
    id: '4596',
    date: '2024-03-10T15:55:00',
    status: 'paid',
    email: 'ethan.harris@example.com',
    amount: 639,
  },
]);
*/
const columns: TableColumn<Product>[] = [
  {
    accessorKey: 'id',
    header: '#',
    cell: ({ row }) => `#${row.getValue('id')}`,
  },
  {
    accessorKey: 'images',
    header: 'Producto',
    cell: ({ row }) => {
      const images = row.getValue('images') as string[];
      const url = Array.isArray(images) && images.length > 0 ? images[0] : '';

      if (!url) 
        return h('span', { class: 'text-gray-500',}, 'Sin Imagen');

        /* return h('img',{
          src: url,
          alt: 'Imagen del producto',
          style: 'width: 48px; heigth: 48px; object-fit: cover; border-radius: 0.5rem;'
        }); */

        return h('div', { class: 'flex items-center gap-3' }, [
          h('img', {
            src: url,
            alt: 'Imagen del producto',
            style: 'width: 48px; heigth: 48px; object-fit: cover; border-radius: 0.5rem;'
          }),
          h('div', undefined, [
            h('p', { class: 'font-medium text-highlighted' }, row.original.name),
            h('p', { class: '' }, `${formatCurrency(row.original.price)}`)
          ])
        ]);

    },
  },
  /*
  {
    accessorKey: 'name',
    header: 'Nombre',
    cell: ({row}) => row.getValue('name'),
  },
  */
  {
    accessorKey: 'description',
    header: 'Descripcion',
    cell: ({ row }) => {
      return h(
        'div',
        {
          style: 'white-space: normal, word-break: break-word; max-width: 400px; px-5 mx-5',
          class: 'truncate-text',
        },
        String(row.getValue('description')).slice(0, 40) + '...',
      );
    },
  },
  /*
  {
    accessorKey: 'price',
    header: 'Precio',
    cell: ({ row }) => formatCurrency(row.getValue('price')),
  },
  */
  {
    accessorKey: 'tags',
    header: 'Etiquetas',
    cell: ({ row }) => {
      const tags = row.getValue('tags') as string[];
      
      if(!Array.isArray(tags)) return '';

      return h('div', { class: 'flex flex-wrap gap-1' },
        tags.map((tag) =>
          h(
            UBadge, {
              size:'xs',
              color:'primary',
              variant: 'subtle',
              class: 'mr-0.5',
            },
            () => tag
          )
        )
      )
    },
  },
  {
    accessorKey: 'createdAt',
    header: 'Creado',
    cell: ({ row }) => {
      const value = row.getValue('createdAt');
      return value ? dayMonthYearFormat(new Date(value as string)) : ' ';
    }
  }
];
</script>