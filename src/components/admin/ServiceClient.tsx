'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Service {
  id: string;
  name: string;
  price: number;
  imageUrl: string | null;
  description: string | null;
}

export default function ServiceClient() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/services');
      if (!res.ok) {
        throw new Error('Hizmetler yüklenemedi.');
      }
      const data = await res.json();
      setServices(data);
    } catch (err: any) {
      setError(err.message);
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const deleteService = async (id: string) => {
    if (confirm('Bu hizmeti silmek istediğinizden emin misiniz?')) {
      setLoading(true);
      try {
        const res = await fetch(`/api/services/${id}`, { method: 'DELETE' });
        if (!res.ok) {
          throw new Error('Hizmet silinemedi.');
        }
        await fetchServices(); // Listeyi yenile
        alert('Hizmet başarıyla silindi.');
      } catch (error: any) {
        console.error(error);
        alert(error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/admin/dashboard')}
          className="rounded bg-gray-200 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-300 mr-4"
        >
          ← Geri Dön
        </button>
        <h1 className="text-2xl font-bold flex-1">
          Hizmetler ({services.length})
        </h1>
        <button
          onClick={() => router.push(`/admin/services/new`)}
          className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 ml-4"
        >
          Yeni Ekle
        </button>
      </div>
      <hr className="my-4" />
      {error && <p className="text-red-500 bg-red-100 p-4 rounded mb-4">{error}</p>}
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Görsel</th>
              <th scope="col" className="px-6 py-3">Hizmet Adı</th>
              <th scope="col" className="px-6 py-3">Fiyat</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">İşlemler</span></th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={4} className="text-center p-4">Yükleniyor...</td></tr>
            ) : services.map((service) => (
              <tr key={service.id} className="border-b bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  {service.imageUrl && (
                    <img src={service.imageUrl} alt={service.name} className="h-16 w-16 object-contain rounded shadow border" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{service.name}</td>
                <td className="px-6 py-4">{service.price} TL</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => router.push(`/admin/services/${service.id}`)}
                    className="mr-2 font-medium text-blue-600 hover:underline"
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteService(service.id)}
                    className="font-medium text-red-600 hover:underline"
                  >
                    Sil
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
} 