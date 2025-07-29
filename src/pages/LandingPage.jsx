import React from 'react';
import { Link as ScrollLink } from 'react-scroll';

const LandingPage = () => {
  return (
    <div className="font-sans w-full h-full bg-white text-black">
      <header className="fixed w-full top-0 left-0 bg-white shadow-md z-50 px-8 py-4 flex items-center justify-between">
        <img src="/assets/rentmyfit_text_logo.png" alt="RentMyFit" className="w-36" />

        <nav className="space-x-6 hidden md:flex">
          {['home', 'pricing', 'contact'].map((section) => (
            <ScrollLink
              key={section}
              to={section}
              smooth
              duration={500}
              className="cursor-pointer text-pink-700 hover:text-pink-800 capitalize"
            >
              {section === 'home'
                ? 'Home'
                : section === 'pricing'
                ? 'Pricing'
                : 'Contact Us'}
            </ScrollLink>
          ))}
        </nav>
      </header>

      <section
  id="home"
  className="flex flex-col md:flex-row items-start justify-between px-6 pt-32 pb-20 gap-10 max-w-7xl mx-auto"
>
  {/* Text Section */}
  <div className="md:w-1/2 text-left">
    <h1 className="text-3xl md:text-4xl font-bold text-pink-700 mb-4">
      Smart Style, Shared Fashion.
    </h1>
    <p className="text-gray-700 text-base leading-relaxed mb-6">
      RentMyFit was born out of a simple belief that fashion should be accessible,
      sustainable, and fun. Whether it's for a wedding, a weekend trip, or a photoshoot,
      you shouldn’t have to spend a fortune or hoard clothes you'll never wear again.
    </p>
    <p className="text-gray-700 text-base leading-relaxed mb-6">
      We're helping people across Nepal embrace fashion freedom by renting high-quality fits
      that suit their vibe without the waste. By reducing fast fashion consumption and
      encouraging circular usage, we’re not just saving wardrobes we’re saving the planet,
      one fit at a time.
    </p>
    <p className="text-gray-700 text-base leading-relaxed mb-8">
      From Kathmandu to Pokhara, and beyond RentMyFit is more than a rental platform.
      It’s a movement. A lifestyle. A smarter way to wear what you love.
    </p>
    <a href="/login">
      <button className="bg-pink-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-pink-800 transition">
        Start Renting
      </button>
    </a>
  </div>

  {/* Image Section */}
  <div className="md:w-1/2">
    <img
      src="/assets/about.png"
      alt="About RentMyFit"
      className="rounded-3xl shadow-lg w-full max-h-[450px] object-cover"
    />
  </div>
</section>


      {/* About Us section REMOVED */}

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
