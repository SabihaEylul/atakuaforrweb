# Admin Panel Kurulum ve Kullanım Kılavuzu

## Kurulum Adımları

### 1. Bağımlılıkları Yükleyin
```bash
npm install
```

### 2. Veritabanını Hazırlayın
```bash
npx prisma generate
npx prisma db push
```

### 3. Admin Kullanıcısı Oluşturun
```bash
npm run create-admin
```

Bu komut varsayılan olarak şu bilgilerle bir admin kullanıcısı oluşturur:
- **Kullanıcı Adı:** admin
- **Şifre:** admin123

### 4. Uygulamayı Başlatın
```bash
npm run dev
```

## Admin Paneline Giriş

1. Tarayıcınızda `http://localhost:3000/admin/login` adresine gidin
2. Varsayılan bilgilerle giriş yapın:
   - Kullanıcı Adı: `admin`
   - Şifre: `admin123`

## Özellikler

### Admin Dashboard
- Ürün yönetimi
- Hizmet yönetimi
- Güvenli çıkış yapma

### Güvenlik
- Şifre hashleme (bcrypt)
- Session yönetimi
- Middleware ile korumalı rotalar

## Yeni Admin Kullanıcısı Ekleme

Yeni bir admin kullanıcısı eklemek için:

1. `scripts/create-admin.js` dosyasını düzenleyin
2. `username` ve `password` değerlerini değiştirin
3. `npm run create-admin` komutunu çalıştırın

## API Endpoints

### Giriş
- **POST** `/api/auth/login`
- Body: `{ "username": "admin", "password": "admin123" }`

### Kayıt (Geliştirme için)
- **POST** `/api/auth/register`
- Body: `{ "username": "newadmin", "password": "password123" }`

## Güvenlik Notları

- Şifreler bcrypt ile hashlenir
- Admin bilgileri localStorage'da saklanır
- Middleware ile admin sayfaları korunur
- Production ortamında JWT token kullanımı önerilir

## Sorun Giderme

### Veritabanı Bağlantı Hatası
- `.env` dosyasında `DATABASE_URL` değişkeninin doğru olduğundan emin olun
- MongoDB bağlantısını kontrol edin

### Admin Giriş Yapamıyor
- Admin kullanıcısının oluşturulduğundan emin olun
- `npm run create-admin` komutunu tekrar çalıştırın

### Middleware Hatası
- `src/middleware.ts` dosyasının doğru konumda olduğundan emin olun
- Next.js sürümünüzün middleware'i desteklediğinden emin olun 