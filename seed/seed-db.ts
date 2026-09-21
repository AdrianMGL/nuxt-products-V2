import "dotenv/config";
import { prisma } from "../server/utils/db";
import { siteReviews } from './site-reviews.seed';
import { products } from "./products.seed";
import { users } from "./users.seed";

async function seedDB() {

    // Purgar DB
    await prisma.siteReview.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // Insertar registros
    await prisma.siteReview.createMany({
        data: siteReviews,
    });

    await prisma.product.createMany({
        data: products,
    });

    await prisma.user.createMany({
        data: users,
    });

    console.log('DB Succesfully');
}

seedDB();