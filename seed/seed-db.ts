import "dotenv/config";
import { prisma } from "../server/utils/db";
import { siteReviews } from './site-reviews.seed';
import { products } from "./products.seed";
import { users } from "./users.seed";

import bcrypt from 'bcryptjs';

async function seedDB() {

    // Purgar DB
    await prisma.siteReview.deleteMany();
    await prisma.product.deleteMany();
    await prisma.user.deleteMany();

    // HASH de contraseñas
    const usersWithHashedPassword = users.map((user) => ({
        ...user,
        password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10)),
    }));

    // Insertar registros
    await prisma.siteReview.createMany({
        data: siteReviews,
    });

    await prisma.product.createMany({
        data: products,
    });

    await prisma.user.createMany({
        data: usersWithHashedPassword,
    });

    console.log('DB Succesfully');
}

seedDB();