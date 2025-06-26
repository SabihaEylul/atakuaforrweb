"use client";

import { useRouter } from 'next/navigation';
import ServiceClient from '@/components/admin/ServiceClient';

export default function AdminServicesPage() {
  const router = useRouter();
  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => router.push('/admin/dashboard')}
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
      <ServiceClient />
    </div>
  );
} 