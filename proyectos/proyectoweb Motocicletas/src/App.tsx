import React from 'react';
import { Toaster } from "sonner@2.0.3";
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { Gallery } from './components/Gallery';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <div className="dark">
        <Header />
        <main>
          <Hero />
          <Services />
          <Gallery />
          <Contact />
        </main>
        <Footer />
        <Toaster theme="dark" position="top-right" />
      </div>
    </div>
  );
}