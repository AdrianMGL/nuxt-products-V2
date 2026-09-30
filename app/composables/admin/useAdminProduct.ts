export const useAdminProduct = async (id: string) => {

    const { data, error, status, execute, refresh, pending } = await useFetch(
        `/api/admin/product/${id}`
    );


    const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
        const isCreating = data.id === 0;
        const formData = new FormData();

        // TODO: form-multipart data + archivos
        formData.append('data', JSON.stringify(data));

        /*
        if (isCreating) {
            // TODO: crear enpoint
            const { algo } = await $fetch('', {
                method: 'POST',
                body: data,
            });

            return algo;
        }
        */

        // TODO: actualizar producto
        try {
            const { product } = await $fetch(`/api/admin/product/${id}`, {
                method: 'PATCH',
                body: formData,
            });
            
            return product;
        } catch (error) {
            throw createError({
                status: 400,
                message: error instanceof Error ? error.message : 'Unknown error',
            });
        }

    }


    return {
        data,
        error,
        status,
        execute,
        pending,

        // methods
        createOrUpdate,
        refresh,
    }
}