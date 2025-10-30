import prisma from "../utils/prisma";
import { SignUpValues } from "../utils/schema/user";

export const isEmailExist = async (email: string) => {
    return await prisma.user.count({
        where: {
            email: email
        }
    })
}

export const createUser = async (data: SignUpValues,photo: string) => {
    return await prisma.user.create({
        data: {
            email: data.email,
            password: data.password,
            name: data.name,
            role: {
                connect: {
                    role: {
                        equals: "USER'"
                    }
                }
            }
        }
    })
}