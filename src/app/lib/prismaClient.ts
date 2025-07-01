import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaClient } from "../../generated/prisma";

const connectionString = process.env.DATABASE_URL;

const adapter = new PrismaNeon({ connectionString });
const prisma = new PrismaClient({ adapter });

export { adapter, prisma };
