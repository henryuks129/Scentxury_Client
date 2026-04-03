'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function HeroSection() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden bg-gradient-to-br from-stone-950 via-stone-900 to-amber-950">
      {/* Animated background particles */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-amber-500/30 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-amber-700/20 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 py-20 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.3em] text-amber-400"
        >
          Nigeria&apos;s Premier Fragrance House
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-serif text-5xl font-bold leading-tight text-white md:text-7xl lg:text-8xl"
        >
          Discover Your
          <br />
          <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Signature Scent
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-lg text-stone-400"
        >
          Authentic perfumes, body mists, and diffusers. Over 1,000 premium scents
          with same-day delivery in Lagos.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/products"
            className="rounded-full bg-amber-600 px-8 py-4 text-lg font-semibold text-white transition-all hover:bg-amber-700 hover:shadow-lg hover:shadow-amber-600/25"
          >
            Shop Collection
          </Link>
          <Link
            href="/survey"
            className="rounded-full border-2 border-stone-600 px-8 py-4 text-lg font-semibold text-white transition-colors hover:border-amber-500 hover:text-amber-400"
          >
            Take the Scent Quiz
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
