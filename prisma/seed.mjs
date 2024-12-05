/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // Create a section
  const section = await prisma.section.create({
    data: {
      name: 'portofolio',
    },
  });

  // Create a set for the section
  const set = await prisma.set.create({
    data: {
      sectionId: section.id,
    },
  });

  // Create images for the set
  const images = [];
  for (let col = 1; col <= 4; col++) {
    for (let row = 1; row <= 3; row++) {
      images.push({
        setId: set.id,
        setColumn: col,
        setRow: row,
        filePath: `/uploads/portofolio-set${set.id}-[${col}-${row}].jpg`,
      });
    }
  }

  await prisma.image.createMany({
    data: images,
  });

  console.log('Seeding completed.');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
