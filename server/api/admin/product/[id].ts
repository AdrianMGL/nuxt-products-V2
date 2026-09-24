export default defineEventHandler(async (event) => {

    const id = getRouterParam(event, 'id') as string;

    // TODO: revisar session de usuario
    const session = await requireUserSession(event);
    const hasAdminRole = session.user.roles.includes('admin');

    if (!hasAdminRole) {
        throw createError({
            statusCode: 401,
            message: `Unauthorize`,
        });
    }


    /** */
    const product = await prisma.product.findUnique({
        where: {
            id: +id,
        },
    });

    if (!product) {
        throw createError({
            statusCode: 404,
            message: `Product with id ${id} not found`,
        });
    }

    return product

});