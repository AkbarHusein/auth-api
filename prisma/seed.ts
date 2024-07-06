import { hashSync } from 'bcryptjs'
import pc from '../utils/prisma-client'

async function main() {
    console.log("<---------------- Seeding User ---------------->")

    return await pc.user.upsert({
        where: { email: 'admin@gmail.com' },
        update: {},
        create: {
            email: 'admin@gmail.com',
            name: 'admin',
            password: hashSync('password')
        }
    })

}

main().then(async (result) => {
    console.log(result)
    await pc.$disconnect()
}).catch(async e => {
    console.error(e)
    await pc.$disconnect()
    process.exit(1)
})