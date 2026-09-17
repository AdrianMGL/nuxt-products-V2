import "dotenv/config";
import { prisma } from "../server/utils/db";
import { siteReviews } from './site-reviews.seed';

async function seedDB() {

    // Purgar DB
    await prisma.siteReview.deleteMany();


    // Insertar registros
    await prisma.siteReview.createMany({
        data: siteReviews,
    });

    console.log('DB Succesfully');
}

seedDB();