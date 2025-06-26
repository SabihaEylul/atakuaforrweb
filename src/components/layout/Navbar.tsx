'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const adminData = localStorage.getItem('admin');
      setIsAdmin(!!adminData);
    }
    // Dinamik güncelleme için event listener ekle (başka sekmede çıkış/giriş olursa da güncellesin)
    const handleStorage = () => {
      const adminData = localStorage.getItem('admin');
      setIsAdmin(!!adminData);
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    setIsAdmin(false);
    router.push('/admin/login');
  };

  return (
    <header className="bg-white shadow-lg fixed w-full top-0 z-50">
      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        <div className="flex lg:flex-1 items-center gap-3">
          <img src="/images/sac-boyama.jpeg" alt="AtaKuaför Logo" className="h-12 w-12 rounded-full object-cover border-2 border-pink-400 shadow-md" />
          <div className="flex flex-col justify-center">
            <span className="sr-only">Hoşgeldin AtaKuaför</span>
            <h1 className="text-xl font-semibold text-pink-500 tracking-tight">Ata Kuaför'e <span className="text-gray-800 font-normal">Hoşgeldiniz</span></h1>
          </div>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <svg className="h-6 w-6" xmlns="çok güzel hizmetler kısmındaki bu şeyleri yan yana 3 tahttp://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-8">
          <Link href="/" className={`text-sm font-semibold leading-6 transition duration-300 ${pathname === '/' ? 'text-pink-600' : 'text-pink-500 hover:text-pink-600'}`}>Ana Sayfa</Link>
          <Link href="/services" className={`text-sm font-semibold leading-6 transition duration-300 ${pathname.startsWith('/services') ? 'text-pink-600' : 'text-pink-500 hover:text-pink-600'}`}>Hizmetler</Link>
          <Link href="/products" className={`text-sm font-semibold leading-6 transition duration-300 ${pathname.startsWith('/products') ? 'text-pink-600' : 'text-pink-500 hover:text-pink-600'}`}>Ürünler</Link>
          <Link href="/contact" className={`text-sm font-semibold leading-6 transition duration-300 ${pathname.startsWith('/contact') ? 'text-pink-600' : 'text-pink-500 hover:text-pink-600'}`}>İletişim</Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          {isAdmin ? (
            <button
              onClick={handleLogout}
              className="text-sm font-semibold leading-6 text-red-500 hover:text-red-600 transition duration-300"
            >
              Admin Çıkışı <span aria-hidden="true">&rarr;</span>
            </button>
          ) : (
            <Link href="/admin/login" className="text-sm font-semibold leading-6 text-pink-500 hover:text-pink-600 transition duration-300">
              Admin Girişi <span aria-hidden="true">&rarr;</span>
            </Link>
          )}
        </div>
      </nav>
      
      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" role="dialog" aria-modal="true">
          <div className="fixed inset-0 z-10" />
          <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <Link href="#" className="-m-1.5 p-1.5 flex items-center gap-2">
                <img src="/images/sac-boyama.jpeg" alt="AtaKuaför Logo" className="h-8 w-8 rounded-full object-cover border-2 border-pink-400 shadow-md" />
                <span className="sr-only">Hoşgeldin AtaKuaför</span>
                <h1 className="text-base font-semibold text-pink-500">Ata Kuaför'e <span className="text-gray-800 font-normal">Hoşgeldiniz</span></h1>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="space-y-2 py-6">
                  <Link href="/" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition duration-300 ${pathname === '/' ? 'text-pink-600 bg-pink-50' : 'text-pink-500 hover:text-pink-600 hover:bg-pink-50'}`}>Ana Sayfa</Link>
                  <Link href="/services" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition duration-300 ${pathname.startsWith('/services') ? 'text-pink-600 bg-pink-50' : 'text-pink-500 hover:text-pink-600 hover:bg-pink-50'}`}>Hizmetler</Link>
                  <Link href="/products" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition duration-300 ${pathname.startsWith('/products') ? 'text-pink-600 bg-pink-50' : 'text-pink-500 hover:text-pink-600 hover:bg-pink-50'}`}>Ürünler</Link>
                  <Link href="/contact" className={`-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 transition duration-300 ${pathname.startsWith('/contact') ? 'text-pink-600 bg-pink-50' : 'text-pink-500 hover:text-pink-600 hover:bg-pink-50'}`}>İletişim</Link>
                </div>
                <div className="py-6">
                  {isAdmin ? (
                    <button
                      onClick={() => {
                        handleLogout();
                        setMobileMenuOpen(false);
                      }}
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-red-500 hover:bg-pink-50 transition duration-300 w-full text-left"
                    >
                      Admin Çıkışı
                    </button>
                  ) : (
                    <Link href="/admin/login" className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-pink-500 hover:bg-pink-50 transition duration-300">Admin Girişi</Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
} 