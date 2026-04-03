import { Metadata } from 'next';
import { HeroSection } from '@/components/home/hero-section';
import { FeaturedProducts } from '@/components/home/featured-products';
import { WhyChooseUs } from '@/components/home/why-choose-us';
import { ScentFamilies } from '@/components/home/scent-families';

export const metadata: Metadata = {
  title: 'Scentxury — Premium Fragrances | Chi Fragrance Nigeria',
  description:
    'Shop authentic perfumes with same-day delivery in Lagos.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <WhyChooseUs />
      <ScentFamilies />
    </>
  );
}
