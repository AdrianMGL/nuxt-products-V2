import { prisma } from '~~/server/utils/db';

export default defineEventHandler(async () => {

    const reviews = await prisma.siteReview.findMany({
        take: 10,
        orderBy: {
            id: 'desc',
        },
        select: {
            name: true,
            subtitle: true,
            description: true,
            profileImage: true,
        },
    });

    return reviews;
});