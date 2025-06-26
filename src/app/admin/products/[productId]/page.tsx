'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | null;
  rating: number;
  reviewCount: number;
}

// This component will handle both creating a new product and editing an existing one.
export default function ProductForm() {
  const router = useRouter();
  const params = useParams();
  const productId = params.productId as string;

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    if (productId && productId !== 'new') {
      setIsNew(false);
      setLoading(true);
      const fetchProduct = async () => {
        try {
          const res = await fetch(`/api/products/${productId}`);
          if (!res.ok) {
            throw new Error('Ürün bulunamadı.');
          }
          const product = await res.json();
          setTitle(product.title);
          setDescription(product.description);
          setPrice(String(product.price || ''));
          setImageUrl(product.imageUrl);
          setPreview(product.imageUrl);
        } catch (error) {
          console.error('Error fetching product:', error);
          alert('Ürün yüklenirken bir hata oluştu.');
        } finally {
          setLoading(false);
        }
      };
      fetchProduct();
    } else {
      setLoading(false);
    }
  }, [productId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !description || !imageUrl) {
      alert('Lütfen tüm alanları doldurun.');
      return;
    }
    setLoading(true);

    try {
      const productData = {
        title,
        description,
        imageUrl,
        price: price ? parseFloat(price) : null,
      };

      const url = isNew ? '/api/products' : `/api/products/${productId}`;
      const method = isNew ? 'POST' : 'PUT';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(productData),
      });

      if (!res.ok) {
        throw new Error('Ürün kaydedilirken bir hata oluştu.');
      }

      alert(isNew ? 'Ürün başarıyla oluşturuldu!' : 'Ürün başarıyla güncellendi!');
      router.push('/admin/products');
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const pageTitle = isNew ? 'Yeni Ürün Oluştur' : 'Ürünü Düzenle';
  const buttonText = isNew ? 'Oluştur' : 'Değişiklikleri Kaydet';

  if (loading && !isNew) {
    return <p>Ürün verileri yükleniyor...</p>;
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <button
        onClick={() => router.push('/admin/products')}
        className="mb-4 rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
      >
        ← Geri Dön
      </button>
      <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium text-gray-900">
            Ürün Adı
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="description" className="mb-2 block text-sm font-medium text-gray-900">
            Açıklama
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900">
            Fiyat (TL)
          </label>
           <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            placeholder="Fiyat giriniz"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="imageUrl" className="mb-2 block text-sm font-medium text-gray-900">
            Resim URL veya Dosya
          </label>
          <input
            type="text"
            id="imageUrl"
            value={imageUrl}
            onChange={(e) => { setImageUrl(e.target.value); setPreview(e.target.value); }}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500 mb-2"
            required
            disabled={loading}
          />
          <div className="flex items-center gap-3 mb-2">
            <input
              type="file"
              accept="image/*"
              id="fileInput"
              onChange={handleFileChange}
              className="hidden"
              disabled={loading}
            />
            <label htmlFor="fileInput">
              <span className="inline-block rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white cursor-pointer hover:bg-pink-600 transition duration-200">
                Fotoğraf Seç
              </span>
            </label>
            {preview && imageUrl && imageUrl.startsWith('data:') && (
              <span className="text-gray-700 text-xs">{imageUrl.length > 30 ? 'Dosya seçildi' : imageUrl}</span>
            )}
          </div>
          {preview && (
            <img src={preview} alt="Önizleme" className="h-32 rounded shadow border object-contain" />
          )}
        </div>
        <div className="flex items-center space-x-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : buttonText}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/products')}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
} 