'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Product {
  id: string;
  title: string;
  price: number | null;
  imageUrl: string;
  rating: number;
  reviewCount: number;
}

interface Service {
  id: string;
  name: string;
  description: string | null;
  imageUrl: string | null;
  price: number;
}

export default function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [servicesLoading, setServicesLoading] = useState(true);
  const [servicesError, setServicesError] = useState<string | null>(null);
  const [productsLoading, setProductsLoading] = useState(true);
  const [productsError, setProductsError] = useState<string | null>(null);

  useEffect(() => {
    // Hizmetleri API'den çek
    const fetchServices = async () => {
      try {
        const res = await fetch('/api/services');
        if (!res.ok) throw new Error('Hizmetler yüklenemedi');
        const data = await res.json();
        setServices(data);
      } catch (err: any) {
        setServicesError(err.message);
      } finally {
        setServicesLoading(false);
      }
    };
    fetchServices();
  }, []);

  useEffect(() => {
    // Ürünleri API'den çek
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Ürünler yüklenemedi');
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setProductsError(err.message);
      } finally {
        setProductsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span
        key={i}
        className={`text-2xl ${i < Math.round(rating) ? 'text-yellow-400' : 'text-gray-300'}`}
      >
        ★
      </span>
    ));
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Hero Section */}
      <div className="relative h-screen bg-gradient-to-r from-pink-100 to-purple-100 flex items-center justify-center">
        <Image
          src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1500&q=80"
          alt="Ata Kuaför Dükkanı"
          fill
          className="object-cover object-center opacity-70"
          priority
        />
        <div className="absolute inset-0 bg-black bg-opacity-60"></div>
        <div className="relative z-10 flex items-center justify-center h-full text-center text-white">
          <div>
            <div className="flex flex-col items-center mb-10">
              <h1 className="text-6xl font-bold mb-6">Ata Kuaför Güzellik Salonu</h1>
            </div>
            <p className="text-xl mb-8">Profesyonel hizmet, kaliteli ürünler</p>
            <div className="space-x-4">
              <Link href="#hizmetler" className="bg-pink-500 hover:bg-pink-600 px-8 py-3 rounded-full text-white font-semibold transition duration-300">
                Hizmetlerimiz
              </Link>
              <Link href="#urunler" className="bg-transparent border-2 border-white hover:bg-white hover:text-pink-500 px-8 py-3 rounded-full text-white font-semibold transition duration-300">
                Ürünlerimiz
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">👥</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Profesyonel Ekip</h3>
              <p className="text-gray-600">Deneyimli ve uzman kadromuzla en iyi hizmeti sunuyoruz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Modern Teknikler</h3>
              <p className="text-gray-600">En son trendleri ve teknikleri takip ediyoruz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🌟</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Kaliteli Ürünler</h3>
              <p className="text-gray-600">Sadece en kaliteli markaların ürünlerini kullanıyoruz</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🧼</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">Hijyen ve Güvenlik</h3>
              <p className="text-gray-600">Salonumuzda hijyen ve müşteri güvenliği en ön plandadır</p>
            </div>
          </div>
        </div>
      </div>

      {/* Services Section */}
      <div id="hizmetler" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Hizmetlerimiz</h2>
          {servicesLoading ? (
            <div className="text-center text-lg py-12">Hizmetler yükleniyor...</div>
          ) : servicesError ? (
            <div className="text-center text-red-500 py-12">{servicesError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="relative h-40">
                    {service.imageUrl && (
                      <Image
                        src={service.imageUrl}
                        alt={service.name}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{service.name}</h3>
                    {service.description && <p className="text-gray-600 text-sm mb-2">{service.description}</p>}
                    <p className="text-pink-500 font-bold">{service.price} TL</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div id="urunler" className="py-16 bg-white relative">
        <div className="absolute inset-0 bg-cover bg-center bg-fixed opacity-10" style={{ backgroundImage: "url('/images/background.jpg')" }}></div>
        <div className="relative z-10 max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Ürünlerimiz</h2>
          {productsLoading ? (
            <div className="text-center text-lg py-12">Ürünler yükleniyor...</div>
          ) : productsError ? (
            <div className="text-center text-red-500 py-12">{productsError}</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition duration-300">
                  <div className="relative h-40">
                    {product.imageUrl && (
                      <Image
                        src={product.imageUrl}
                        alt={product.title}
                        fill
                        className="object-cover"
                      />
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-semibold mb-2">{product.title}</h3>
                    <p className="text-pink-500 font-bold mb-2">{product.price ? product.price + ' TL' : ''}</p>
                    <div className="flex items-center mb-2">
                      {renderStars(product.rating)}
                      <span className="ml-2 text-gray-500 text-sm">({product.reviewCount})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div id="contact" className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">İletişim</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">📍</span>
                <p>Adres: Atatürk Mah. 123. Sok. No:45, Kadıköy/İstanbul</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">📞</span>
                <p>Telefon: 0 (555) 123 45 67</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-pink-500 text-xl">🕒</span>
                <p>Çalışma Saatleri: Pazartesi - Cumartesi, 09:00 - 20:00</p>
              </div>
              <div className="flex items-center space-x-3">
                <a href="https://instagram.com/atakuafor" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-pink-600 hover:underline font-semibold">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.062-1.366.334-2.633 1.308-3.608C4.515 2.567 5.782 2.295 7.148 2.233 8.414 2.175 8.794 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.98.98-1.274 2.092-1.333 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.282.353 2.394 1.333 3.374.98.98 2.092 1.274 3.374 1.333C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.282-.059 2.394-.353 3.374-1.333.98-.98 1.274-2.092 1.333-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.282-.353-2.394-1.333-3.374-.98-.98-2.092-1.274-3.374-1.333C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/></svg>
                  Instagram: @atakuafor
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <a href="https://wa.me/905551234567" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-green-600 hover:underline font-semibold">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M20.52 3.48A11.93 11.93 0 0 0 12 0C5.37 0 0 5.37 0 12c0 2.11.55 4.16 1.6 5.97L0 24l6.22-1.62A11.94 11.94 0 0 0 12 24c6.63 0 12-5.37 12-12 0-3.19-1.24-6.19-3.48-8.52zM12 22c-1.85 0-3.66-.5-5.22-1.44l-.37-.22-3.69.96.99-3.59-.24-.37A9.94 9.94 0 0 1 2 12c0-5.52 4.48-10 10-10s10 4.48 10 10-4.48 10-10 10zm5.2-7.6c-.28-.14-1.65-.81-1.9-.9-.25-.09-.43-.14-.61.14-.18.28-.28.7-.9.86-.16.18-.32.2-.6.07-.28-.14-1.18-.44-2.25-1.4-.83-.74-1.39-1.65-1.55-1.93-.16-.28-.02-.43.12-.57.12-.12.28-.32.42-.48.14-.16.18-.28.28-.46.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.01-.22-.53-.45-.46-.61-.47-.16-.01-.34-.01-.52-.01-.18 0-.48.07-.73.34-.25.28-.97.95-.97 2.3 0 1.34.99 2.64 1.13 2.82.14.18 1.95 2.98 4.74 4.06.66.28 1.18.45 1.58.58.66.21 1.26.18 1.73.11.53-.08 1.65-.67 1.88-1.32.23-.65.23-1.2.16-1.32-.07-.12-.25-.18-.53-.32z"/></svg>
                  WhatsApp: 0 (555) 123 45 67
                </a>
              </div>
            </div>
            <div className="h-96 rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps?q=Kadıköy,İstanbul&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
