import { Navbar } from "../components/navbar";
import imageSrc from "../assets/img/1.jpg"; // Adjust path if needed
import Homeone from "../components/Homeone";
import Hometwo from "../components/Hometwo";
import Footer from "../components/footer";
import { motion } from "framer-motion";

export const HomePage = () => {
  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative w-full h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <motion.img
          src={imageSrc}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-[0.6]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Overlay Text */}
        <motion.div
          className="relative z-10 text-center text-white px-4 md:px-10"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
        >
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-lg"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            Book your game, skip the wait
          </motion.h1>

          <motion.h2
            className="text-xl sm:text-2xl md:text-3xl font-semibold text-gray-100 mb-4"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Game On!
          </motion.h2>

          <motion.p
            className="text-base sm:text-lg md:text-xl font-medium text-gray-200 max-w-2xl mx-auto mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
          >
            Hassle-free ground and turf bookings!
          </motion.p>

          <motion.p
            className="text-base sm:text-lg md:text-xl font-medium text-gray-100 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Own the field, book your game spot in a click!
          </motion.p>

          {/* CTA Button */}
          <motion.button
            className="mt-8 px-8 py-3 bg-blue-600 text-white font-semibold rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Book Now
          </motion.button>
        </motion.div>
      </section>

      {/* Other Sections */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        viewport={{ once: true }}
      >
        <Homeone />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3 }}
        viewport={{ once: true }}
      >
        <Hometwo />
      </motion.div>

      <Footer />
    </>
  );
};
