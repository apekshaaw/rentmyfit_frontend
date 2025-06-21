import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const LandingPage = () => {
  return (
    <div className="font-sans w-full h-full bg-white text-black">
      <header className="fixed w-full top-0 left-0 bg-white shadow-md z-50 px-8 py-4 flex items-center justify-between">
        <img src="/assets/rentmyfit_text_logo.png" alt="RentMyFit" className="w-36" />

        <nav className="space-x-6 hidden md:flex">
          {['home', 'about', 'pricing', 'contact'].map((section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth
              duration={500}
              className="cursor-pointer text-pink-700 hover:text-pink-800 capitalize"
            >
              {section === 'home'
                ? 'Home'
                : section === 'about'
                ? 'About Us'
                : section === 'pricing'
                ? 'Pricing'
                : 'Contact Us'}
            </ScrollLink>
          ))}
        </nav>
      </header>

      <section
        id="home"
        className="flex flex-col items-center justify-center min-h-[90vh] pt-32 px-6 text-center"
      >
        <img
          src="/assets/rf.png"
          alt="RF Illustration"
          className="w-32 md:w-40 mb-6"
        />

        <h1 className="text-3xl md:text-5xl font-bold mb-6">
          Why own when you can Rent the Runway Every Time
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-xl mb-8">
          RentMyFit gives you access to premium fashion without the commitment. Style smarter. Spend less. Look better.
        </p>
        <a href="/login">
          <button className="bg-pink-700 text-white px-8 py-3 rounded-full text-lg hover:bg-pink-800 transition">
            Start Renting
          </button>
        </a>
      </section>

      <section
        id="about"
        className="min-h-screen px-6 py-20 bg-gray-50 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-pink-700">About Us</h2>
        <p className="max-w-3xl mx-auto text-gray-600 text-lg">
          We’re on a mission to make luxury fashion accessible to everyone. Whether it’s a weekend event or a wedding, RentMyFit lets you shine without the full price tag.
        </p>
      </section>

      <section id="pricing" className="min-h-screen px-6 py-20 text-center">
        <h2 className="text-3xl font-bold mb-4 text-pink-700">Pricing</h2>
        <p className="max-w-2xl mx-auto text-gray-600 text-lg">
          Plans start as low as $29/month. One-time rentals available. Free returns. No dry cleaning stress. Pay only for the days you wear it.
        </p>
      </section>

      <section
        id="contact"
        className="min-h-screen px-6 py-20 bg-gray-50 text-center"
      >
        <h2 className="text-3xl font-bold mb-4 text-pink-700">Contact Us</h2>
        <p className="max-w-xl mx-auto text-gray-600 text-lg">
          Have questions? We're here to help. Drop us a message and our style team will get back to you within 24 hours.
        </p>
      </section>
    </div>
  );
};

export default LandingPage;
