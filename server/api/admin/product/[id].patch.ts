import z from 'zod';

interface FileData {
    name: string;
    type: string;
    data: Buffer;
}

const bodySchema = z.object({
    slug: z.string().min(1),
    name: z.string().min(1),
    description: z.string().min(1),
    price: z.number().min(0),
    images: z.array(z.string()).min(0),
    tags: z.array(z.string()).min(0),
});

// Form Multipart


export default defineEventHandler(async (event) => {

    const id = getRouterParam(event, 'id') as string;
    const formData = await readMultipartFormData(event);
    const files: FileData[] = [];  // Array<FileData>

    if (!formData || formData.length === 0) {
        throw createError({
            status: 400,
            statusMessage: 'Bad request',
            message: 'There is data inside the body',
        });
    }

    // TODO: procesar los archivos
    console.log({ formData });

    let dataString = '';

    for (const part of formData) {
        if (part.name === 'data' && part.data) {
            dataString = part.data.toString('utf-8');
            console.log({ dataString });
        };

         // TODO: Leer files
        if (part.name === 'files' && part.filename) {
            files.push({
                name: part.filename,
                type: part.type || 'application/octet-stream',
                data: part.data,
            });
        }
    }

    const body = bodySchema.safeParse(JSON.parse(dataString));

    if (!body.success) {
        throw createError({
            status: 400,
            statusMessage: 'Bad request',
            message: 'Check the body of the request',
            data: body.error,
        });
    }

    // Confirmar si el producto existe
    const product = await prisma.product.findUnique({
        where: {
            id: +id,
        },
    });

    if (!product) {
        throw createError({
            status: 404,
            statusMessage: 'Product not found',
        });
    }

    // Enviar los archivos a Cloudinary
    if (files.length > 0) {
        const uploadFiles = await Promise.all(
            files.map(async (file) => {
                const url = await fileUpload(file.data);
                return url;
            }),
        );
        // body.data.images = [...body.data.images, ...uploadFiles]
        body.data.images = body.data.images.concat(uploadFiles);
    }

    // updateProduct
    const updatedProduct = await prisma.product.update({
        where: {
            id: +id,
        },
        data: body.data,
    });

    return {
        message: 'Product updated',
        product: updatedProduct,
        // files: [], // depurar files
    }
});