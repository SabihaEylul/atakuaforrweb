const { PrismaClient } = require('../src/generated/prisma');

const prisma = new PrismaClient();

async function seedDatabase() {
  try {
    console.log('🌱 Veritabanına varsayılan veriler ekleniyor...');

    // Varsayılan hizmetler
    const defaultServices = [
      {
        name: 'Saç Boyama',
        description: 'Profesyonel saç boyama hizmeti. En kaliteli boyalar kullanılır.',
        price: 250,
        imageUrl: '/images/sac-boyama.jpeg'
      },
      {
        name: 'Saç Kesimi',
        description: 'Modern ve şık saç kesimi. Uzman kuaförlerimiz tarafından yapılır.',
        price: 150,
        imageUrl: '/images/sac-kesimi.jpeg'
      },
      {
        name: 'Protez Tırnak',
        description: 'Uzun ömürlü ve şık protez tırnak uygulaması.',
        price: 300,
        imageUrl: '/images/protez-tirnak.jpeg'
      },
      {
        name: 'Kaynak Saç',
        description: 'Doğal görünümlü kaynak saç uygulaması.',
        price: 400,
        imageUrl: '/images/kaynak-sac.jpeg'
      },
      {
        name: 'Kirpik Lifting',
        description: 'Kirpiklerinizi daha uzun ve dolgun gösteren lifting işlemi.',
        price: 200,
        imageUrl: '/images/kirpik-lifting.jpeg'
      },
      {
        name: 'Kaş Tasarımı',
        description: 'Yüzünüze en uygun kaş tasarımı ve şekillendirme.',
        price: 120,
        imageUrl: '/images/kas-tasarimi.jpeg'
      }
    ];

    // Varsayılan ürünler
    const defaultProducts = [
      {
        title: 'Saç Boyama Ürünü',
        description: 'Profesyonel saç boyama ürünü. Uzun süreli renk koruması.',
        price: 350,
        imageUrl: '/images/sac-boyama.jpeg'
      },
      {
        title: 'Saç Kesimi Seti',
        description: 'Evde saç kesimi için profesyonel set.',
        price: 420,
        imageUrl: '/images/sac-kesimi.jpeg'
      },
      {
        title: 'Protez Tırnak Seti',
        description: 'Kendi tırnaklarınızı yapabilmeniz için tam set.',
        price: 390,
        imageUrl: '/images/protez-tirnak.jpeg'
      },
      {
        title: 'Kaynak Saç Ürünü',
        description: 'Kaynak saç bakımı için özel ürünler.',
        price: 480,
        imageUrl: '/images/kaynak-sac.jpeg'
      },
      {
        title: 'Kirpik Lifting Seti',
        description: 'Evde kirpik lifting için profesyonel set.',
        price: 310,
        imageUrl: '/images/kirpik-lifting.jpeg'
      }
    ];

    // Mevcut hizmetleri kontrol et ve ekle
    console.log('📋 Hizmetler ekleniyor...');
    for (const service of defaultServices) {
      const existingService = await prisma.service.findFirst({
        where: { name: service.name }
      });

      if (!existingService) {
        await prisma.service.create({
          data: service
        });
        console.log(`✅ ${service.name} eklendi`);
      } else {
        console.log(`⏭️ ${service.name} zaten mevcut`);
      }
    }

    // Mevcut ürünleri kontrol et ve ekle
    console.log('📦 Ürünler ekleniyor...');
    for (const product of defaultProducts) {
      const existingProduct = await prisma.product.findFirst({
        where: { title: product.title }
      });

      if (!existingProduct) {
        await prisma.product.create({
          data: product
        });
        console.log(`✅ ${product.title} eklendi`);
      } else {
        console.log(`⏭️ ${product.title} zaten mevcut`);
      }
    }

    console.log('🎉 Veritabanı başarıyla dolduruldu!');
  } catch (error) {
    console.error('❌ Hata:', error);
  } finally {
    await prisma.$disconnect();
  }
}

seedDatabase(); 