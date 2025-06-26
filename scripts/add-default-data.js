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

async function addDefaultData() {
  console.log('🌱 Varsayılan veriler ekleniyor...');

  // Hizmetleri ekle
  console.log('📋 Hizmetler ekleniyor...');
  for (const service of defaultServices) {
    try {
      const response = await fetch('http://localhost:3000/api/services', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(service),
      });

      if (response.ok) {
        console.log(`✅ ${service.name} eklendi`);
      } else {
        console.log(`❌ ${service.name} eklenemedi: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${service.name} eklenirken hata: ${error.message}`);
    }
  }

  // Ürünleri ekle
  console.log('📦 Ürünler ekleniyor...');
  for (const product of defaultProducts) {
    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(product),
      });

      if (response.ok) {
        console.log(`✅ ${product.title} eklendi`);
      } else {
        console.log(`❌ ${product.title} eklenemedi: ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${product.title} eklenirken hata: ${error.message}`);
    }
  }

  console.log('🎉 İşlem tamamlandı!');
}

// Scripti çalıştır
addDefaultData(); 