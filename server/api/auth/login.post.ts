import { z } from 'zod';
import { prisma } from "~~/server/utils/db";
import bcrypt from 'bcryptjs';

const bodySchema = z.object({
    email: z
        .string()
        .toLowerCase()
        .trim()
        .refine((val) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
            message: 'Email is not valid',
        }),
    password: z.string().min(8, 'Password must be at least 8 characters'),
});

export default defineEventHandler(async (event) => {
    const { email, password } = await readValidatedBody(event, bodySchema.parse);

    const user = await prisma.user.findUnique({
        where: {
            email: email,
        }
    })

    if (!user) {
        throw createError({
            status: 401,
            message: 'Bad credentials (email)',
        })
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        throw createError({
            statusCode: 401,
            message: 'Bad Credentials (password)',
        });
    };

    return {
        message: 'Login successfully',
        user: user,
    };
})