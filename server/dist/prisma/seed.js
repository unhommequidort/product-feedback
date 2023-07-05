"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function seed() {
    return __awaiter(this, void 0, void 0, function* () {
        yield prisma.role.deleteMany();
        yield prisma.user.deleteMany();
        yield prisma.category.deleteMany();
        yield prisma.status.deleteMany();
        yield prisma.userRole.deleteMany();
        const adminRole = yield prisma.role.create({
            data: {
                name: 'admin',
            },
        });
        const userRole = yield prisma.role.create({
            data: {
                name: 'user',
            },
        });
        const matt = yield prisma.user.upsert({
            where: { username: '@unhommequidort' },
            update: {},
            create: {
                username: 'unhommequidort',
                password: 'password',
                firstName: 'Matthew',
                lastName: 'Lyons',
                userRole: {
                    create: {
                        roleId: adminRole.id,
                    },
                },
            },
        });
        const jean = yield prisma.user.upsert({
            where: { username: '@NYHeraldTribune' },
            update: {},
            create: {
                username: 'NYHeraldTribune',
                password: 'password',
                firstName: 'Jean',
                lastName: 'Seberg',
                userRole: {
                    create: {
                        roleId: userRole.id,
                    },
                },
            },
        });
        const categories = yield prisma.category.createMany({
            data: [
                {
                    name: 'UI',
                },
                {
                    name: 'UX',
                },
                {
                    name: 'Enhancement',
                },
                {
                    name: 'Bug',
                },
                {
                    name: 'Feature',
                },
            ],
        });
        const statuses = yield prisma.status.createMany({
            data: [
                {
                    name: 'Suggestion',
                },
                {
                    name: 'Planned',
                },
                {
                    name: 'In-Progress',
                },
                {
                    name: 'Live',
                },
            ],
        });
        console.log({ matt, jean, categories, statuses });
    });
}
seed();
