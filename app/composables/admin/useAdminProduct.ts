export const useAdminProduct = async (id: string) => {

    const { data, error, status, execute, refresh, pending } = await useFetch(
        `/api/admin/product/${id}`
    );


    const createOrUpdate = async (data: Partial<Product>, files?: File[]) => {
        const isCreating = data.id === 0;

        // form-multipart data + archivos


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
        /*
        const { algo } = await $fetch('', {
            method: 'PATCH',
            body: data,
        });
        */

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