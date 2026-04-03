'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

const families = [
  { name: 'Woody', emoji: '🪵', color: 'from-amber-800 to-amber-950' },
  { name: 'Floral', emoji: '🌸', color: 'from-pink-500 to-rose-700' },
  { name: 'Oud', emoji: '🕌', color: 'from-stone-700 to-stone-900' },
  { name: 'Sweet', emoji: '🍯', color: 'from-orange-400 to-amber-600' },
  { name: 'Fresh', emoji: '🌿', color: 'from-emerald-500 to-teal-700' },
  { name: 'Citrus', emoji: '🍊', color: 'from-yellow-400 to-orange-500' },
];

export function ScentFamilies() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-20">
      <h2 className="text-center font-serif text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">
        Explore by Scent Family
      </h2>
      <div className="mt-12 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
        {families.map((f, i) => (
          <motion.div key={f.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
          >
            <Link href={`/products?scentFamily=${f.name.toLowerCase()}`}
              className={`flex flex-col items-center rounded-2xl bg-gradient-to-br ${f.color} p-6 text-white transition-transform hover:scale-105`}
            >
              <span className="text-4xl">{f.emoji}</span>
              <span className="mt-3 text-sm font-semibold">{f.name}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
