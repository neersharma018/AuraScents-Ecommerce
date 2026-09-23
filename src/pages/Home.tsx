import React from 'react';
import { Helmet } from 'react-helmet-async';
import Hero from '../components/Hero';
import ShopSection from '../components/ShopSection';
import Collections from '../components/Collections';
import CollectionProductGrid from '../components/CollectionProductGrid';
import BestSellers from '../components/BestSellers';
import Ingredients from '../components/Ingredients';
import About from '../components/About';
import WhyAuraScents from '../components/WhyAuraScents';

import Reviews from './Reviews';
import InstagramGallery from '../components/InstagramGallery';
import Newsletter from '../components/Newsletter';

const Home: React.FC = () => {
  return (
    <>
      <Helmet>
        <title>AuraScents | Luxury Maison de Parfum</title>
        <meta name="description" content="Discover handcrafted luxury fragrances designed to become your signature. Crafted in Grasse, France." />
      </Helmet>
      
      <main>
        <Hero />
        <BestSellers />
        <Collections />
        <CollectionProductGrid />
        <ShopSection />
        <WhyAuraScents />
        <Ingredients />
        <About />

        <Reviews />
        <InstagramGallery />
        <Newsletter />
      </main>
    </>
  );
};

export default Home;
