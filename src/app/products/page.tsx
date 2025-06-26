'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  price: number | null;
  rating: number;
  reviewCount: number;
}

interface ProductReview {
  id: string;
  name: string;
  comment: string;
  rating: number;
  productId: string;
  createdAt: string;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reviews, setReviews] = useState<ProductReview[]>([]);
  const [newReview, setNewReview] = useState<{ [key: string]: { rating: number; comment: string } }>({});

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        if (!res.ok) {
          throw new Error('Ürünler yüklenirken bir hata oluştu.');
        }
        const data = await res.json();
        setProducts(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    // Yorumları veritabanından yükle
    const fetchReviews = async () => {
      try {
        const res = await fetch('/api/reviews');
        if (res.ok) {
          const data = await res.json();
          setReviews(data);
        }
      } catch (error) {
        console.error('Yorumlar yüklenirken hata:', error);
      }
    };

    fetchReviews();
  }, []);

  const handleReviewChange = (productId: string, field: 'rating' | 'comment', value: any) => {
    setNewReview((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleReviewSubmit = async (productId: string) => {
    if (!newReview[productId]?.rating || !newReview[productId]?.comment) {
      alert('Lütfen puan ve yorum alanlarını doldurun.');
      return;
    }

    try {
      const res = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: 'Anonim', // Varsayılan isim
          comment: newReview[productId].comment,
          rating: newReview[productId].rating,
          productId: productId,
        }),
      });

      if (res.ok) {
        const newReviewData = await res.json();
        setReviews([...reviews, newReviewData]);
        setNewReview((prev) => ({ ...prev, [productId]: { rating: 0, comment: '' } }));
        alert('Yorum başarıyla eklendi!');
      } else {
        alert('Yorum eklenirken bir hata oluştu.');
      }
    } catch (error) {
      console.error('Yorum eklenirken hata:', error);
      alert('Yorum eklenirken bir hata oluştu.');
    }
  };

  const handleReviewDelete = async (reviewId: string) => {
    if (confirm('Bu yorumu silmek istediğinizden emin misiniz?')) {
      try {
        const res = await fetch(`/api/reviews/${reviewId}`, {
          method: 'DELETE',
        });

        if (res.ok) {
          setReviews(reviews.filter(review => review.id !== reviewId));
          alert('Yorum başarıyla silindi!');
        } else {
          alert('Yorum silinirken bir hata oluştu.');
        }
      } catch (error) {
        console.error('Yorum silinirken hata:', error);
        alert('Yorum silinirken bir hata oluştu.');
      }
    }
  };

  const renderStars = (rating: number, setRating?: (r: number) => void) => (
    <div className="flex space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`text-2xl cursor-pointer ${star <= rating ? 'text-yellow-400' : 'text-gray-300'}`}
          onClick={setRating ? () => setRating(star) : undefined}
        >
          ★
        </span>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">Ürünler Yükleniyor...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white pt-16">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-5xl lg:px-8">
        <h2 className="text-3xl font-bold tracking-tight text-pink-600 mb-8">Ürünlerimiz</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {products.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Henüz ürün eklenmemiş.</p>
              <p className="text-gray-400 mt-2">Ana sayfadan admin girişi yaparak ürün ekleyebilirsiniz.</p>
            </div>
          ) : (
            products.map((product) => {
              const productReviews = reviews.filter((r) => r.productId === product.id);
              const avgRating = productReviews.length
                ? productReviews.reduce((sum, r) => sum + r.rating, 0) / productReviews.length
                : 0;
              return (
                <div key={product.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div className="relative w-full h-64">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-2">{product.title}</h3>
                    <p className="text-xl font-bold text-pink-500 mb-2">{product.price} TL</p>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-sm text-gray-500">
                        Ortalama: {avgRating.toFixed(1)} ({productReviews.length} oy)
                      </span>
                    </div>
                    <div className="mt-4">
                      <h4 className="font-semibold mb-2">Yorum Ekle</h4>
                      <div className="flex items-center gap-2 mb-2">
                        {renderStars(
                          newReview[product.id]?.rating || 0,
                          (r) => handleReviewChange(product.id, 'rating', r)
                        )}
                      </div>
                      <textarea
                        className="w-full border rounded p-2 mb-2"
                        rows={2}
                        placeholder="Yorumunuz..."
                        value={newReview[product.id]?.comment || ''}
                        onChange={(e) => handleReviewChange(product.id, 'comment', e.target.value)}
                      />
                      <button
                        className="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded"
                        onClick={() => handleReviewSubmit(product.id)}
                      >
                        Gönder
                      </button>
                    </div>
                    <div className="mt-6">
                      <h4 className="font-semibold mb-2">Müşteri Yorumları</h4>
                      {productReviews.length === 0 && (
                        <p className="text-gray-400 text-sm">Henüz yorum yok.</p>
                      )}
                      <ul className="space-y-2">
                        {productReviews.map((r, idx) => (
                          <li key={idx} className="border-b pb-2">
                            <div className="flex items-center justify-between mb-1">
                              <div className="flex items-center gap-2">
                                {renderStars(r.rating)}
                              </div>
                              <button
                                onClick={() => handleReviewDelete(r.id)}
                                className="text-red-500 hover:text-red-700 text-xs font-medium"
                              >
                                Sil
                              </button>
                            </div>
                            <p className="text-gray-700 text-sm">{r.comment}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
} 