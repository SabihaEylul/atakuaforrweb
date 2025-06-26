'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | null;
  rating: number;
  reviewCount: number;
}

export default function ProductClient() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu.');
        }
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (confirm('Bu ürünü silmek istediğinizden emin misiniz?')) {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`, {
          method: 'DELETE',
        });
        
        if (!res.ok) {
          throw new Error('Ürün silinirken bir hata oluştu.');
        }
        
        setProducts(products.filter(product => product.id !== id));
        alert('Ürün başarıyla silindi.');
      } catch (error) {
        console.error(error);
        alert('Bir hata oluştu.');
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
          Ürünler ({products.length})
        </h1>
        <button
          onClick={() => router.push(`/admin/products/new`)}
          className="rounded-md bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 ml-4"
        >
          Yeni Ekle
        </button>
      </div>
      <hr className="my-4" />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
            <tr>
              <th scope="col" className="px-6 py-3">Görsel</th>
              <th scope="col" className="px-6 py-3">Ürün Adı</th>
              <th scope="col" className="px-6 py-3">Fiyat</th>
              <th scope="col" className="px-6 py-3">Puan</th>
              <th scope="col" className="px-6 py-3"><span className="sr-only">İşlemler</span></th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b bg-white hover:bg-gray-50">
                <td className="px-6 py-4">
                  {product.imageUrl && (
                    <img src={product.imageUrl} alt={product.title} className="h-16 w-16 object-contain rounded shadow border" />
                  )}
                </td>
                <td className="px-6 py-4 font-medium text-gray-900">{product.title}</td>
                <td className="px-6 py-4">{product.price ? `${product.price} TL` : 'Belirsiz'}</td>
                <td className="px-6 py-4">{product.rating.toFixed(1)} ({product.reviewCount} oy)</td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => router.push(`/admin/products/${product.id}`)}
                    className="mr-2 font-medium text-blue-600 hover:underline"
                    disabled={loading}
                  >
                    Düzenle
                  </button>
                  <button
                    onClick={() => deleteProduct(product.id)}
                    className="font-medium text-red-600 hover:underline"
                    disabled={loading}
                  >
                    {loading ? 'Siliniyor...' : 'Sil'}
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