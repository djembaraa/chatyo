import { PrismaClient, RoleType } from "../src/generated/prisma";

const prisma = new PrismaClient()

async function main() {
    const roles: RoleType[] = ['ADMIN', 'USER', 'MEMBER', 'OWNER']
    for (const role of roles) {
        const roleExists = await prisma.role.findFirst({
            where: { role: role }
        })
        await prisma.role.upsert({
            where: { id: roleExists?.id ?? '' },
            create: {
                role: role
            },
            update: {}
        })
    }
    console.log("Succes Seeding Roles")
}

main().then(async () => {
    await prisma.$disconnect()
}).catch(async (e) => {
    console.error(e)

    await prisma.$disconnect()

    process.exit(1)
})