/* eslint-disable no-console */
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Category and style options
const categoryOptions = [
  { label: 'Prewedding', value: 'prewedding' },
  { label: 'Wedding', value: 'wedding' },
  { label: 'Corporate', value: 'corporate' },
  { label: 'Graduate', value: 'graduate' },
];

const styleOptions = [
  { label: 'Moody', value: 'moody' },
  { label: 'Traditional', value: 'traditional' },
  { label: 'Clean', value: 'clean' },
  { label: 'Modern', value: 'modern' },
  { label: 'Vintage', value: 'vintage' },
  { label: 'Pastel', value: 'pastel' },
  { label: 'Colourful', value: 'colourful' },
];

async function main() {
  // Create the "portfolio" section
  const portfolioSection = await prisma.section.create({
    data: {
      name: 'portofolio',
      sets: {
        create: {
          setIndex: 0,
          images: {
            create: Array.from({ length: 4 }, (_, col) =>
              Array.from({ length: 3 }, (_, row) => ({
                setColumn: col + 1,
                setRow: row + 1,
                filePath: `/uploads/portofolio-set.0-${col + 1}-${row + 1}.png`,
              }))
            ).flat(),
          },
        },
      },
    },
  });
  console.log('Created portfolio section:', portfolioSection.name);

  // Create sections for each category and style
  for (const category of categoryOptions) {
    for (const style of styleOptions) {
      const sectionName = `${category.value}.${style.value}`;
      const newSection = await prisma.section.create({
        data: {
          name: sectionName,
          sets: {
            create: {
              setIndex: 0,
              images: {
                create: Array.from({ length: 4 }, (_, col) =>
                  Array.from({ length: 3 }, (_, row) => ({
                    setColumn: col + 1,
                    setRow: row + 1,
                    filePath: `/uploads/${sectionName}-set.0-${col + 1}-${row + 1}.png`,
                  }))
                ).flat(),
              },
            },
          },
        },
      });
      console.log('Created section:', newSection.name);
    }
  }

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
