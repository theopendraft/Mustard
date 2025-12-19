import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import teachingMethod from "@/assets/teaching-method.jpg";

const Method = () => {
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#fbf1e5]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative text-center py-20 px-5 bg-[#FAF4EC] overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-5xl md:text-7xl lg:text-8xl font-normal mb-12 text-black leading-tight"
          >
            The Evolutionary
            <br />
            Framework
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="text-xl md:text-2xl lg:text-3xl text-black mb-10 max-w-5xl mx-auto leading-relaxed font-medium"
          >
            We believe that advanced technology is simply basic principles scaled up.
            <br />
            Our methodology takes students on a journey from the textbooks to technology
          </motion.p>
        </motion.div>
      </section>

      {/* Evolutionary Framework Section */}
      <section className="py-16 px-5 bg-[#fbf1e5]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* The Root (Concept) */}
          <motion.div variants={itemVariants} className="mb-8">
            <div className="bg-[#e8e0d4] rounded-md p-12 relative min-h-[350px] flex flex-col max-w-full">
              <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                <span className="text-black font-semibold text-sm">
                  The Root (Concept)
                </span>
              </div>

              <p className="text-black text-2xl md:text-3xl leading-relaxed font-normal mt-auto text-right">
                Matrices 
                <br/>
                Students solve standard row-and-column addition problems from their Class 12 textbook.
              </p>
            </div>
          </motion.div>

          {/* The Stem (Context) */}
          <motion.div variants={itemVariants} className="mb-8 relative">
            <div
              className="rounded-md p-12 text-black relative min-h-[350px] flex flex-col max-w-full"
              style={{ backgroundColor: "#ffbf1f" }}
            >
              <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                <span className="text-black font-semibold text-sm">
                  The Stem (Context)
                </span>
              </div>
              <p className="text-black text-2xl md:text-3xl leading-relaxed font-normal mt-auto text-right">
                A digital image is just a giant matrix. To a computer, a photograph is literally a grid of numbers representing light intensity.
              </p>
            </div>
          </motion.div>

          {/* The Leaf (Experimentation) */}
          <motion.div variants={itemVariants} className="mb-8">
            <div
              className="rounded-md p-12 text-white relative min-h-[350px] flex flex-col max-w-full"
              style={{ backgroundColor: "#706cff" }}
            >
              <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                <span className="text-black font-semibold text-sm">
                  The Leaf (Experimentation)
                </span>
              </div>
              <p className="text-white text-2xl md:text-3xl leading-relaxed font-normal mt-auto text-right">
                Math as a Filter. 
                <br/>
                Students add +50 to every number in the grid. Instantly, a dark image becomes bright
              </p>
            </div>
          </motion.div>

          {/* The Flower (Innovation) */}
          <motion.div variants={itemVariants} className="mb-8">
            <div
              className="rounded-md p-12 text-black relative min-h-[350px] flex flex-col max-w-full"
              style={{ backgroundColor: "#37e2b4" }}
            >
              <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                <span className="text-black font-semibold text-sm">
                  The Flower (Innovation)
                </span>
              </div>
              <p className="text-black text-2xl md:text-3xl leading-relaxed font-normal mt-auto text-right">
                Building the Tool. 
                <br />
                Students code an algorithm to detect where numbers change suddenly. The result? A Document Scanner that auto-detects and crops page edges.
              </p>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* From Textbooks to Technology Section */}
      <section
        className="py-24 px-5 relative overflow-hidden bg-[#FAF4EC]"
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-black mb-16 text-center leading-tight"
          >
            From Textbooks to 
            <br/>
            Technology
          </motion.h2>

          {/* Track Navigation */}
          <motion.nav
            variants={itemVariants}
            className="flex justify-center gap-4 md:gap-6 mb-24 "
          >
            <button className="bg-white text-black px-8 py-4 rounded-md text-base md:text-lg font-normal hover:bg-gray-50 transition-colors duration-300 shadow-sm">
              Physics Track
            </button>
            <button className="bg-white text-black px-8 py-4 rounded-md text-base md:text-lg font-normal hover:bg-gray-50 transition-colors duration-300 shadow-sm">
              Maths Track
            </button>
            <button className="bg-white text-black px-8 py-4 rounded-md text-base md:text-lg font-normal hover:bg-gray-50 transition-colors duration-300 shadow-sm">
              Maths Track
            </button>
          </motion.nav>

          {/* Evolution Cards */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#EAE4D8] px-8 py-12 rounded-xl max-w-full"
          >
            {/* Basic Arithmetic & Matrices */}
            <motion.div variants={itemVariants}>
              <div
                className="relative h-[450px] md:h-[500px] transition-all duration-500 rounded-xl overflow-hidden bg-white p-8"
              >
                <span className="absolute top-8 right-8 text-6xl font-normal text-gray-300 opacity-50">01</span>
                <h3 className="text-3xl md:text-4xl font-normal leading-tight text-black max-w-[70%]">
                  Basic Arithmetic & Matrices
                </h3>
                <div 
                  className="absolute bottom-4 right-4 p-10 w-[88%] h-[48%] flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: "#e8e0d4",
                    clipPath: "polygon( 0% 30%, 100% 0%, 100% 100%, 0% 100%)",
                    borderRadius: "12px"
                  }}
                >
                  <p className="text-black text-lg md:text-xl leading-relaxed font-normal text-center pt-8">
                    Learning how to arrange numbers in rows and columns and perform operations.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Linear Algebra */}
            <motion.div variants={itemVariants}>
              <div
                className="relative h-[450px] md:h-[500px] transition-all duration-500 rounded-xl overflow-hidden bg-white p-8"
              >
                <span className="absolute top-8 right-8 text-6xl font-normal text-gray-300 opacity-50">02</span>
                <h3 className="text-3xl md:text-4xl font-normal leading-tight text-black max-w-[70%]">
                  Linear Algebra
                </h3>
                <div 
                  className="absolute bottom-4 right-4 p-10 w-[88%] h-[58%] flex items-center justify-center shadow-lg"
                  style={{ 
                    backgroundColor: "#ffbf1f",
                    clipPath: "polygon( 0% 30%, 100% 0%, 100% 100%, 0% 100%)",
                    borderRadius: "12px"
                  }}
                >
                  <p className="text-black text-lg md:text-xl leading-relaxed font-normal text-center pt-8">
                    Understanding how massive grids of numbers (tensors) can represent complex data like images or language.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Neural Networks & AI */}
            <motion.div variants={itemVariants}>
              <div
                className="relative h-[450px] md:h-[500px] transition-all duration-500 rounded-xl overflow-hidden bg-white p-8"
              >
                <span className="absolute top-8 right-8 text-6xl font-normal text-gray-300 opacity-50">03</span>
                <h3 className="text-3xl md:text-4xl font-normal leading-tight text-black max-w-[70%]">
                  Neural Networks & AI
                </h3>
                <div 
                  className="absolute bottom-4 right-4 p-10 w-[88%] h-[58%] flex items-center justify-center shadow-lg"
                  style={{ 
                    borderRadius: "12px",
                    backgroundColor: "#37e2b4",
                    clipPath: "polygon( 0% 30%, 100% 0%, 100% 100%, 0% 100%)"
                    
                  }}
                >
                  <p className="text-black text-lg md:text-xl leading-relaxed font-normal text-center pt-8">
                    Building AI models where matrix multiplication determines how a computer "thinks" and learns.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Method;
