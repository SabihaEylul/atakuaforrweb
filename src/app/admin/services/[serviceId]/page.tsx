'use client';

import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import { useRouter, useParams } from 'next/navigation';

// Veritabanı modeline uygun Service arayüzü
interface Service {
  id: string;
  name: string;
  description: string | null;
  price: number;
  imageUrl: string | null;
}

export default function ServiceForm() {
  const router = useRouter();
  const params = useParams();
  const serviceId = params.serviceId as string;

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [preview, setPreview] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isNew = serviceId === 'new';

  useEffect(() => {
    if (!isNew) {
      setLoading(true);
      fetch(`/api/services/${serviceId}`)
        .then(res => {
          if (!res.ok) throw new Error('Hizmet bilgileri alınamadı.');
          return res.json();
        })
        .then((data: Service) => {
          setName(data.name);
          setDescription(data.description || '');
          setPrice(String(data.price));
          setImageUrl(data.imageUrl || '');
          setPreview(data.imageUrl || '');
        })
        .catch(err => setError(err.message))
        .finally(() => setLoading(false));
    }
  }, [serviceId, isNew]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!name || !price) {
      alert('Lütfen Ad ve Fiyat alanlarını doldurun.');
      return;
    }
    setLoading(true);
    setError(null);

    const body = JSON.stringify({
      name,
      description,
      price: parseFloat(price),
      imageUrl,
    });

    const url = isNew ? '/api/services' : `/api/services/${serviceId}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body,
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || (isNew ? 'Hizmet oluşturulamadı.' : 'Hizmet güncellenemedi.'));
      }

      alert(isNew ? 'Hizmet başarıyla oluşturuldu!' : 'Hizmet başarıyla güncellendi!');
      router.push('/admin/services');
      router.refresh(); 
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };
  
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImageUrl(result);
      setPreview(result);
    };
    reader.readAsDataURL(file);
  };

  const pageTitle = isNew ? 'Yeni Hizmet Oluştur' : 'Hizmeti Düzenle';
  const buttonText = isNew ? 'Oluştur' : 'Değişiklikleri Kaydet';

  if (loading && !isNew) {
    return <div className="p-8"><p>Hizmet verileri yükleniyor...</p></div>;
  }

  return (
    <div className="mx-auto max-w-2xl p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/admin/services')}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300"
        >
          ← Geri Dön
        </button>
        <button
          onClick={() => router.push('/admin/services/new')}
          className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 ml-4"
        >
          Yeni Hizmet
        </button>
      </div>
      <h1 className="mb-6 text-2xl font-bold">{pageTitle}</h1>
      {error && <p className="mb-4 rounded bg-red-100 p-3 text-sm text-red-600">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6 rounded-lg bg-white p-6 shadow-md">
        <div>
          <label htmlFor="name" className="mb-2 block text-sm font-medium text-gray-900">
            Hizmet Adı
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            disabled={loading}
          />
        </div>
        <div>
          <label htmlFor="price" className="mb-2 block text-sm font-medium text-gray-900">
            Fiyat
          </label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            required
            disabled={loading}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-900">
            Resim
          </label>
          <div className="flex items-center gap-4">
            <input
                type="file"
                accept="image/*"
                id="fileInput"
                onChange={handleFileChange}
                className="hidden"
                disabled={loading}
            />
            <label htmlFor="fileInput" className="cursor-pointer rounded-lg bg-pink-500 px-4 py-2 text-sm font-medium text-white hover:bg-pink-600 transition">
              Dosya Seç
            </label>
             {preview && (
                <img src={preview} alt="Önizleme" className="h-20 w-20 rounded-md border object-cover shadow-sm" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-2">veya</p>
           <input
            type="text"
            placeholder="Resim URL'i yapıştırın"
            value={imageUrl}
            onChange={(e) => { setImageUrl(e.target.value); setPreview(e.target.value); }}
            className="mt-2 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-pink-500 focus:ring-pink-500"
            disabled={loading}
          />
        </div>
        <div className="flex items-center space-x-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="rounded-lg bg-pink-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-4 focus:ring-pink-300 disabled:opacity-50"
          >
            {loading ? 'Kaydediliyor...' : buttonText}
          </button>
          <button
            type="button"
            onClick={() => router.push('/admin/services')}
            className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-pink-700"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  );
} 