import Link from 'next/link';

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-stone-50 dark:border-stone-800 dark:bg-stone-950">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-serif text-xl font-bold text-stone-900 dark:text-white">Scentxury</h3>
            <p className="mt-3 text-sm text-stone-600 dark:text-stone-400">
              Nigeria&apos;s premier fragrance destination. Authentic scents, same-day delivery.
            </p>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">Shop</h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link href="/products?category=male" className="hover:text-amber-600">Men</Link></li>
              <li><Link href="/products?category=female" className="hover:text-amber-600">Women</Link></li>
              <li><Link href="/products?category=unisex" className="hover:text-amber-600">Unisex</Link></li>
              <li><Link href="/survey" className="hover:text-amber-600">Find Your Scent</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">Account</h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li><Link href="/profile" className="hover:text-amber-600">My Profile</Link></li>
              <li><Link href="/orders" className="hover:text-amber-600">Orders</Link></li>
              <li><Link href="/wishlist" className="hover:text-amber-600">Wishlist</Link></li>
              <li><Link href="/referrals" className="hover:text-amber-600">Referrals</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="mb-3 text-sm font-semibold uppercase tracking-wider text-stone-900 dark:text-white">Contact</h4>
            <ul className="space-y-2 text-sm text-stone-600 dark:text-stone-400">
              <li>Lagos, Nigeria</li>
              <li>info@chifragrance.com</li>
              <li>+234 800 000 0000</li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-stone-200 pt-6 text-center text-sm text-stone-500 dark:border-stone-800">
          &copy; {new Date().getFullYear()} Scentxury by Chi Fragrance. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
