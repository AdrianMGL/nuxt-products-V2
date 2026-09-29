import z from 'zod';

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

    if (!formData || formData.length === 0) {
        throw createError({
            status: 400,
            statusMessage: 'Bad request',
            message: 'There is data inside the body',
        });
    }

    // TODO: procesar los archivos


    let dataString = '';

    for (const part of formData) {
        if (part.name === 'data' && part.data) {
            dataString = part.data.toString('utf-8');
            console.log({ dataString });
        };
    }


    // TODO: Leer files


    const body = bodySchema.safeParse(dataString);

    if (!body.success) {
        throw createError({
            status: 400,
            statusMessage: 'Bad request',
            message: 'Check the body of the request',
            data: body.error,
        });
    }


    return {}
});