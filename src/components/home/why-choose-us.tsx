'use client';

import { Truck, ShieldCheck, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { icon: Truck, title: 'Same-Day Delivery', desc: 'Order before 2PM in Lagos and receive your fragrance the same day.' },
  { icon: ShieldCheck, title: '100% Authentic', desc: 'Every product is verified genuine. No dupes, no counterfeits, ever.' },
  { icon: Sparkles, title: '1,000+ Scents', desc: 'From designer perfumes to artisan oils — find your perfect match.' },
];

export function WhyChooseUs() {
  return (
    <section className="bg-stone-50 py-20 dark:bg-stone-900/50">
      <div className="mx-auto max-w-7xl px-4">
        <h2 className="text-center font-serif text-3xl font-bold text-stone-900 dark:text-white md:text-4xl">
          Why Chi Fragrance?
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3">
          {features.map((f, i) => (
            <motion.div key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className="rounded-2xl bg-white p-8 text-center shadow-sm dark:bg-stone-800"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-amber-100 dark:bg-amber-900/30">
                <f.icon className="h-7 w-7 text-amber-600" />
              </div>
              <h3 className="mt-5 text-lg font-semibold text-stone-900 dark:text-white">{f.title}</h3>
              <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
