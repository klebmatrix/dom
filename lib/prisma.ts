// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';

// Declaração global para evitar múltiplas instâncias do PrismaClient em hot-reloads
declare global {
  var prisma: PrismaClient | undefined;
}

let prisma: PrismaClient;

// Garante que apenas uma instância do PrismaClient seja criada
if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

export default prisma;