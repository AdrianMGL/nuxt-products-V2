import "dotenv/config";
import bcrypt from 'bcryptjs';
import { prisma } from "../server/utils/db";

import { siteReviews } from './site-reviews.seed';
import { products } from "./products.seed";
import { users } from "./users.seed";
import { productReviews } from "./product-reviews.seed";

async function seedDB() {

    // Purgar DB
    await prisma.productReview.deleteMany();
    await prisma.product.deleteMany();
    await prisma.siteReview.deleteMany();
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

    const dbProducts = await prisma.product.createMany({
        data: products,
    });

    await prisma.user.createMany({
        data: usersWithHashedPassword,
    });

    // Obtener los productos (usuarios) para tomar sus IDs y asignarlos a los reviews
    const productsCreated = await prisma.product.findMany();

    // TODO: Usuarios
    const productReviewsCreated = productReviews.map((review) => ({
        ...review,
        productId: productsCreated[Math.floor(Math.random() * products.length)].id,
    }));

    await prisma.productReview.createMany({
        data: productReviewsCreated,
    });

    console.log('DB Succesfully');
}

seedDB();