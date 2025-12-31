import { Card } from "@/components/ui/card";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import teachingMethod from "@/assets/teaching-method.jpg";

const Method = () => {
  const heroRef = useRef(null);
  const evolutionRef = useRef(null);
  const [activeTrack, setActiveTrack] = useState("physics");
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const { scrollYProgress: evolutionProgress } = useScroll({
    target: evolutionRef,
    offset: ["start end", "end start"],
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

  // Track data
  const trackData = {
    physics: [
      {
        title: "Newton's\nLaws",
        description:
          "Understanding force, motion, and acceleration in classical mechanics.",
        color: "#e8e0d4",
      },
      {
        title: "Electro\nmagnetism",
        description:
          "Exploring electric fields, magnetic forces, and electromagnetic waves.",
        color: "#ffbf1f",
      },
      {
        title: "Robotics &\nAutomation",
        description:
          "Building robots that understand and respond to physical forces.",
        color: "#37e2b4",
      },
    ],
    maths: [
      {
        title: "Basic \nArithmetic & \nMatrices",
        description:
          "Learning how to arrange numbers in rows and columns and perform operations.",
        color: "#e8e0d4",
      },
      {
        title: "Linear \nAlgebra",
        description:
          "Understanding how massive grids of numbers (tensors) can represent complex data like images or language.",
        color: "#ffbf1f",
      },
      {
        title: "Neural \nNetworks & AI",
        description:
          'Building AI models where matrix multiplication determines how a computer "thinks" and learns.',
        color: "#37e2b4",
      },
    ],
    chemistry: [
      {
        title: "Atomic \nStructure",
        description:
          "Learning about electrons, protons, and the fundamental building blocks of matter.",
        color: "#e8e0d4",
      },
      {
        title: "Chemical \nReactions",
        description:
          "Understanding how molecules interact and transform through chemical processes.",
        color: "#ffbf1f",
      },
      {
        title: "Material \nScience",
        description:
          "Creating new materials and compounds for advanced technology applications.",
        color: "#37e2b4",
      },
    ],
  };

  return (
    <div className="min-h-screen bg-[#fbf1e5]">
      {/* Hero Section */}
      <div className="relative" style={{ height: "200vh" }}>
        <section
          ref={heroRef}
          className="sticky top-0 py-32 px-5 bg-[#FAF4EC] h-screen flex items-center justify-center"
        >
          <div className="max-w-auto mx-auto text-center animate-fade-in">
            <h1
              className="text-7xl md:text-8xl font-normal mb-16 text-black tracking-tight"
              style={{
                fontFamily: "'Haffer', sans-serif",
                fontWeight: 400,
                fontSize: "96px",
                lineHeight: "90%",
                letterSpacing: "-0.03em",
              }}
            >
              The Evolutionary
              <br />
              Framework
            </h1>

            <p
              className="text-2xl md:text-3xl text-black leading-relaxed max-w-auto mx-auto font-medium"
              style={{
                fontFamily: "'Haffer', sans-serif",
                fontWeight: 400,
                fontSize: "32px",
                lineHeight: "100%",
                letterSpacing: "-0.03em",
              }}
            >
              We believe that advanced technology is simply basic principles
              scaled up.
              <br />
              Our methodology takes students on a journey from the textbooks to
              <br />
              technology
            </p>
          </div>
        </section>
      </div>

      {/* Evolutionary Framework Section */}
      <section
        ref={evolutionRef}
        className="relative bg-[#fbf1e5]"
        style={{ marginTop: "-100vh", zIndex: 10 }}
      >
        <div style={{ height: "400vh", position: "relative" }}>
          <div className="relative">
            {/* The Root (Concept) */}
            <div
              className="sticky px-5 flex items-center"
              style={{
                top: "0px",
                zIndex: 1,
                height: "100vh",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-screen mx-auto w-full"
              >
                <div className="bg-[#e8e0d4] p-12 relative flex flex-col rounded-3xl h-[calc(100vh-40px)]">
                  <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                    <span
                      className="text-black font-semibold"
                      style={{
                        fontFamily: "'Haffer', sans-serif",
                        fontWeight: 500,
                        fontSize: "32px",
                        lineHeight: "121%",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      The Root (Concept)
                    </span>
                  </div>

                  <p
                    className="text-black leading-relaxed font-normal mt-auto text-right"
                    style={{
                      fontFamily: "'Haffer', sans-serif",
                      fontWeight: 400,
                      fontSize: "56px",
                      lineHeight: "100%",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Matrices
                    <br />
                    Students solve standard row-and-column addition problems
                    from their Class 12 textbook.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* The Stem (Context) */}
            <div
              className="sticky px-5 flex items-center"
              style={{
                top: "0px",
                zIndex: 2,
                height: "100vh",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-screen mx-auto w-full"
              >
                <div
                  className="rounded-3xl p-12 text-black relative flex flex-col h-[calc(100vh-40px)]"
                  style={{ backgroundColor: "#ffbf1f" }}
                >
                  <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                    <span
                      className="text-black font-semibold"
                      style={{
                        fontFamily: "'Haffer', sans-serif",
                        fontWeight: 500,
                        fontSize: "32px",
                        lineHeight: "121%",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      The Stem (Context)
                    </span>
                  </div>
                  <p
                    className="text-black leading-relaxed font-normal mt-auto text-right"
                    style={{
                      fontFamily: "'Haffer', sans-serif",
                      fontWeight: 400,
                      fontSize: "56px",
                      lineHeight: "100%",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    A digital image is just a giant matrix. To a computer, a
                    photograph is literally a grid of numbers representing light
                    intensity.
                  </p>
                </div>
              </motion.div>
            </div>

            {/* The Leaf (Experimentation) */}
            <div
              className="sticky px-5 flex items-center"
              style={{
                top: "0px",
                zIndex: 3,
                height: "100vh",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-screen mx-auto w-full"
              >
                <div
                  className="rounded-3xl p-12 text-white relative flex flex-col h-[calc(100vh-40px)]"
                  style={{ backgroundColor: "#706cff" }}
                >
                  <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                    <span
                      className="text-black font-semibold"
                      style={{
                        fontFamily: "'Haffer', sans-serif",
                        fontWeight: 500,
                        fontSize: "32px",
                        lineHeight: "121%",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      The Leaf (Experimentation)
                    </span>
                  </div>
                  <p
                    className="text-black leading-relaxed font-normal mt-auto text-right"
                    style={{
                      fontFamily: "'Haffer', sans-serif",
                      fontWeight: 400,
                      fontSize: "56px",
                      lineHeight: "100%",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Math as a Filter.
                    <br />
                    Students add +50 to every number in the grid. Instantly, a
                    dark image becomes bright
                  </p>
                </div>
              </motion.div>
            </div>

            {/* The Flower (Innovation) */}
            <div
              className="sticky px-5 flex items-center"
              style={{
                top: "0px",
                zIndex: 4,
                height: "100vh",
                willChange: "transform, opacity",
                transform: "translateZ(0)",
                backfaceVisibility: "hidden",
              }}
            >
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                className="max-w-screen mx-auto w-full"
              >
                <div
                  className="rounded-3xl p-12 text-black relative flex flex-col h-[calc(100vh-40px)]"
                  style={{ backgroundColor: "#37e2b4" }}
                >
                  <div className="bg-white rounded-md px-6 py-2 inline-block mb-4 w-fit">
                    <span
                      className="text-black font-semibold"
                      style={{
                        fontFamily: "'Haffer', sans-serif",
                        fontWeight: 500,
                        fontSize: "32px",
                        lineHeight: "121%",
                        letterSpacing: "-0.03em",
                      }}
                    >
                      The Flower (Innovation)
                    </span>
                  </div>
                  <p
                    className="text-black leading-relaxed font-normal mt-auto text-right"
                    style={{
                      fontFamily: "'Haffer', sans-serif",
                      fontWeight: 400,
                      fontSize: "56px",
                      lineHeight: "100%",
                      letterSpacing: "-0.03em",
                    }}
                  >
                    Building the Tool.
                    <br />
                    Students code an algorithm to detect where numbers change
                    suddenly. The result? A Document Scanner that auto-detects
                    and crops page edges.
                  </p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* From Textbooks to Technology Section */}
      <section className="py-24 px-5 relative overflow-hidden bg-[#FAF4EC]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-screen mx-auto relative z-10"
        >
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-6xl lg:text-7xl font-normal text-black mb-[49px] text-center leading-tight"
            style={{
              fontFamily: "'Haffer', sans-serif",
              fontWeight: 400,
              fontSize: "80px",
              lineHeight: "100%",
              letterSpacing: "-0.03em",
            }}
          >
            From Textbooks to
            <br />
            Technology
          </motion.h2>

          {/* Track Navigation */}
          <motion.nav
            variants={itemVariants}
            className="flex justify-center gap-4 md:gap-6 mb-[49px] "
          >
            <button
              onClick={() => setActiveTrack("physics")}
              className={`px-10 py-3 rounded-md text-base md:text-lg font-normal transition-all duration-300 shadow-sm ${
                activeTrack === "physics"
                  ? "bg-[#FFC00D] text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "121%",
                letterSpacing: "-0.03em",
              }}
            >
              Physics Track
            </button>
            <button
              onClick={() => setActiveTrack("maths")}
              className={`px-10 py-3 rounded-md text-base md:text-lg font-normal transition-all duration-300 shadow-sm ${
                activeTrack === "maths"
                  ? "bg-[#FFC00D]   text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "121%",
                letterSpacing: "-0.03em",
              }}
            >
              Maths Track
            </button>
            <button
              onClick={() => setActiveTrack("chemistry")}
              className={`px-10 py-3 rounded-md text-base md:text-lg font-normal transition-all duration-300 shadow-sm ${
                activeTrack === "chemistry"
                  ? "bg-[#FFC00D] text-white"
                  : "bg-white text-black hover:bg-gray-50"
              }`}
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "24px",
                lineHeight: "121%",
                letterSpacing: "-0.03em",
              }}
            >
              Chemistry Track
            </button>
          </motion.nav>

          {/* Evolution Cards */}
          <motion.div
            key={activeTrack}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 bg-[#EAE4D8] px-8 py-12 rounded-xl max-w-full"
          >
            {trackData[activeTrack as keyof typeof trackData].map(
              (card, index) => (
                <motion.div
                  key={`${activeTrack}-${index}`}
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + index * 0.2 }}
                  className="w-full"
                >
                  <Card
                    className="p-0 h-[400px] md:h-[436px] w-[332px rounded-[10px] overflow-hidden w-full border-0"
                    style={{ backgroundColor: "#FAF4EC" }}
                  >
                    <motion.div
                      className="text-black h-full flex flex-col relative"
                      whileHover={{ y: -8 }}
                      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <div
                        className="absolute top-[25px] right-[25px] text-6xl font-normal opacity-20"
                        style={{
                          fontFamily: "'Haffer', sans-serif",
                          fontWeight: 400,
                          fontSize: "40px",
                          lineHeight: "90%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        0{index + 1}
                      </div>
                      <h3
                        className="text-3xl md:text-4xl font-normal leading-tight px-4 md:px-[25px] pt-4 md:pt-[25px] pb-6 md:pb-8 mb-6 md:mb-10"
                        style={{
                          fontFamily: "'Haffer', sans-serif",
                          fontWeight: 400,
                          fontSize: "40px",
                          lineHeight: "90%",
                          letterSpacing: "-0.03em",
                        }}
                      >
                        {card.title.split("\n").map((line, i) => (
                          <span key={i}>
                            {line}
                            {i < card.title.split("\n").length - 1 && <br />}
                          </span>
                        ))}
                      </h3>
                      <div className="mt-auto">
                        <div
                          className="px-4 md:px-5 py-4 md:py-5 h-[180px] md:h-[216px] flex flex-col items-end justify-end mx-[12px] mb-[17px] "
                          style={{
                            backgroundColor: card.color,
                            clipPath:
                              "polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)",
                            paddingTop: "2rem",
                            borderRadius: "10px",
                          }}
                        >
                          <p
                            className="opacity-90 text-black text-sm md:text-base"
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                              fontSize: "20px",
                              lineHeight: "120%",
                              letterSpacing: "-0.03em",
                              textAlign: "right",
                            }}
                          >
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              )
            )}
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
};

export default Method;
