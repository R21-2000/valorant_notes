// /lib/prisma.ts
import { PrismaClient } from '@prisma/client';

declare global {
  // Biarkan var, bukan let atau const
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma =
  global.prisma ||
  new PrismaClient({
    log: ['query'],
  });

if (process.env.NODE_ENV !== 'production') {
  global.prisma = prisma;
}