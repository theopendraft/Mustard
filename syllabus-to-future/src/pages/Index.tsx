import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import podcastImg from "@/assets/podcast.png";
import {
  motion,
  useScroll,
  useTransform,
  type Variants,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Matter from "matter-js";

const Index = () => {
  const navigate = useNavigate();
  const heroRef = useRef(null);
  const scrollScaleRef = useRef(null);
  const quoteRef = useRef(null);
  const darkSectionRef = useRef(null);
  const mentorRef = useRef(null);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [cardsAnimated, setCardsAnimated] = useState(false);

  // Motion values for physics-based animation
  const tagX = useMotionValue(0);
  const tagY = useMotionValue(-300);
  const tagRotate = useMotionValue(-45);
  const tagOpacity = useMotionValue(0);

  // Motion values for PhD card
  const phdX = useMotionValue(-150);
  const phdY = useMotionValue(-400);
  const phdRotate = useMotionValue(0);
  const phdOpacity = useMotionValue(0);

  // Motion values for Industry card
  const industryX = useMotionValue(150);
  const industryY = useMotionValue(-400);
  const industryRotate = useMotionValue(0);
  const industryOpacity = useMotionValue(0);

  // Spring animation for smooth updates
  const springConfig = { damping: 20, stiffness: 100 };
  const x = useSpring(tagX, springConfig);
  const y = useSpring(tagY, springConfig);
  const rotate = useSpring(tagRotate, springConfig);

  // Spring animations for cards
  const phdXSpring = useSpring(phdX, springConfig);
  const phdYSpring = useSpring(phdY, springConfig);
  const phdRotateSpring = useSpring(phdRotate, springConfig);

  const industryXSpring = useSpring(industryX, springConfig);
  const industryYSpring = useSpring(industryY, springConfig);
  const industryRotateSpring = useSpring(industryRotate, springConfig);

  // Matter.js physics simulation
  useEffect(() => {
    if (hasAnimated) return;

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 2 },
    });

    // Create falling tag body (rectangle)
    const tagBody = Bodies.rectangle(0, -300, 200, 50, {
      restitution: 0.6, // Bounciness
      friction: 0.01,
      density: 0.004,
      angle: -0.78, // -45 degrees in radians
      angularVelocity: 0.02,
    });

    // Create ground
    const ground = Bodies.rectangle(0, 100, 800, 50, {
      isStatic: true,
    });

    // Add bodies to world
    World.add(engine.world, [tagBody, ground]);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Animation loop
    let animationFrameId: number;
    let startTime = Date.now();
    const duration = 2500; // Animation duration in ms

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        // Update motion values from physics body
        tagX.set(tagBody.position.x);
        tagY.set(tagBody.position.y);
        tagRotate.set((tagBody.angle * 180) / Math.PI);

        // Fade in
        const opacity = Math.min(elapsed / 300, 1);
        tagOpacity.set(opacity);

        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Settle to final position
        tagX.set(0);
        tagY.set(0);
        tagRotate.set(-6);
        tagOpacity.set(1);

        // Cleanup
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
      }
    };

    // Start animation after a short delay
    const timeout = setTimeout(() => {
      animate();
    }, 200);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [hasAnimated, tagX, tagY, tagRotate, tagOpacity]);

  // Matter.js physics simulation for cards
  useEffect(() => {
    if (!cardsAnimated) return;

    const Engine = Matter.Engine;
    const World = Matter.World;
    const Bodies = Matter.Bodies;
    const Runner = Matter.Runner;

    // Create engine
    const engine = Engine.create({
      gravity: { x: 0, y: 2 },
    });

    // Create falling card bodies
    const phdCard = Bodies.rectangle(-150, -400, 280, 380, {
      restitution: 0.4,
      friction: 0.05,
      density: 0.002,
      angle: 0,
    });

    const industryCard = Bodies.rectangle(150, -400, 280, 380, {
      restitution: 0.4,
      friction: 0.05,
      density: 0.002,
      angle: 0,
    });

    // Create ground at the cards' natural position (y: 0)
    const ground = Bodies.rectangle(0, 0, 1200, 20, {
      isStatic: true,
    });

    // Add bodies to world
    World.add(engine.world, [phdCard, industryCard, ground]);

    // Create runner
    const runner = Runner.create();
    Runner.run(runner, engine);

    // Animation loop
    let animationFrameId: number;
    let startTime = Date.now();
    const duration = 2000;

    const animate = () => {
      const elapsed = Date.now() - startTime;

      if (elapsed < duration) {
        // Update motion values from physics bodies
        phdX.set(phdCard.position.x);
        phdY.set(phdCard.position.y);
        phdRotate.set((phdCard.angle * 180) / Math.PI);

        industryX.set(industryCard.position.x);
        industryY.set(industryCard.position.y);
        industryRotate.set((industryCard.angle * 180) / Math.PI);

        // Fade in
        const opacity = Math.min(elapsed / 300, 1);
        phdOpacity.set(opacity);
        industryOpacity.set(opacity);

        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Settle to final positions in grid
        phdRotate.set(0);
        phdOpacity.set(1);

        industryX.set(0);
        industryY.set(0);
        industryRotate.set(0);
        industryOpacity.set(1);

        // Cleanup
        Runner.stop(runner);
        World.clear(engine.world, false);
        Engine.clear(engine);
      }
    };

    // Start animation after a short delay
    const timeout = setTimeout(() => {
      animate();
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
      Runner.stop(runner);
      World.clear(engine.world, false);
      Engine.clear(engine);
    };
  }, [
    cardsAnimated,
    phdX,
    phdY,
    phdRotate,
    phdOpacity,
    industryX,
    industryY,
    industryRotate,
    industryOpacity,
  ]);

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Scroll-linked scaling animation
  const { scrollYProgress: scaleProgress } = useScroll({
    target: scrollScaleRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scaleProgress, [0, 0.5, 1], [0.5, 0.9, 1]);
  const borderRadius = useTransform(scaleProgress, [0, 0.5, 1], [40, 0, 0]);
  const overlayOpacity = useTransform(
    scaleProgress,
    [0.4, 0.5, 0.6],
    [0, 0, 1]
  );

  // Scroll-linked animations for fallDown elements
  const { scrollYProgress: quoteProgress } = useScroll({
    target: quoteRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: darkSectionProgress } = useScroll({
    target: darkSectionRef,
    offset: ["start end", "end start"],
  });

  const { scrollYProgress: mentorProgress } = useScroll({
    target: mentorRef,
    offset: ["start end", "end start"],
  });

  // Tag animation (quote section)
  const tagScrollY = useTransform(quoteProgress, [0, 0.5], [-200, 0]);
  const tagScrollRotate = useTransform(quoteProgress, [0, 0.5], [-45, -6]);
  const tagScrollScale = useTransform(quoteProgress, [0, 0.5], [0.5, 1]);
  const tagScrollOpacity = useTransform(quoteProgress, [0, 0.5], [0, 1]);

  // Dark section cards animation
  const cardsScrollY = useTransform(darkSectionProgress, [0, 0.5], [-200, 0]);
  const cardsScrollRotate = useTransform(
    darkSectionProgress,
    [0, 0.5],
    [-45, -6]
  );
  const cardsScrollScale = useTransform(
    darkSectionProgress,
    [0, 0.5],
    [0.5, 1]
  );
  const cardsScrollOpacity = useTransform(
    darkSectionProgress,
    [0, 0.5],
    [0, 1]
  );

  // Mentor cards animation
  const mentorScrollY = useTransform(mentorProgress, [0, 0.5], [-200, 0]);
  const mentorScrollRotate = useTransform(mentorProgress, [0, 0.5], [-45, -6]);
  const mentorScrollScale = useTransform(mentorProgress, [0, 0.5], [0.5, 1]);
  const mentorScrollOpacity = useTransform(mentorProgress, [0, 0.5], [0, 1]);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const slideFromRightVariants: Variants = {
    hidden: { opacity: 0, x: 100 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 2.5,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const scaleVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const slideUpVariants: Variants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1.4,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  const fallDownVariants: Variants = {
    hidden: {
      opacity: 0,
      y: -200,
      rotate: -45,
      scale: 0.5,
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: -6,
      scale: 1,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.8,
        bounce: 0.4,
      },
    },
  };

  // Character animation variants
  const charVariants: Variants = {
    hidden: {
      opacity: 0,
      x: 100,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-[#FAF4EC]">
      {/* Hero Section Wrapper */}
      <div className="relative" style={{ height: "150vh" }}>
        {/* Hero Heading Section */}
        <section
          ref={heroRef}
          className="sticky top-0 text-center pt-28 px-5 bg-[#FAF4EC] overflow-hidden h-auto flex items-center justify-center"
          style={{ zIndex: 1 }}
        >
          <motion.div className="relative z-10">
            <motion.h1
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
              className="text-black"
              style={{
                fontWeight: 400,
                fontSize: "110px",
                lineHeight: "100%",
                letterSpacing: "-0.03em",
                textAlign: "center",
                opacity: heroOpacity,
              }}
            >
              Don&apos;t Just Learn it.
              <br />
              <motion.h1
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.3,
                  ease: [0.23, 1, 0.32, 1],
                }}
                className="text-black inline-block"
              >
                Build it.
              </motion.h1>
            </motion.h1>
          </motion.div>
        </section>
      </div>

      {/* Scroll-Linked Scaling Video Section */}
      <section
        ref={scrollScaleRef}
        className="relative bg-transparent pb-24"
        style={{ height: "250vh", marginTop: "-100vh", zIndex: 10 }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{
              scale,
              borderRadius,
            }}
            className="relative w-full max-w-7xl mx-4 aspect-video bg-gray-300 overflow-hidden"
          >
            {/* Video/Content Container */}
            <div className="w-full h-full flex items-center justify-center">
              <iframe
                className="w-full h-full rounded-md"
                src="https://www.youtube.com/embed/XaXjY4rhku0?si=PkyJ225B181sa6CG&autoplay=1&mute=1&loop=1&playlist=XaXjY4rhku0"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

            {/* Text Overlay - Fades in at full scale */}
            {/* <motion.div
              style={{ opacity: overlayOpacity }}
              className="absolute inset-0 flex items-center justify-center bg-black/30 pointer-events-none"
            >
              <div className="text-center text-white px-8">
                <h2 className="text-4xl md:text-6xl font-bold mb-4">
                  Experience MUSTARD
                </h2>
                <p className="text-xl md:text-2xl">
                  Transforming Education Through Technology
                </p>
              </div>
            </motion.div> */}
          </motion.div>
        </div>
      </section>

      {/* Quote Section Wrapper */}
      <div className="relative" style={{ height: "200vh" }}>
        {/* Quote Section */}
        <motion.section
          ref={quoteRef}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="sticky top-0 py-24 px-5 bg-[#FAF4EC] h-screen align-middle items-center"
          style={{ zIndex: 5 }}
          onViewportEnter={() => setHasAnimated(true)}
        >
          <div className="max-w-auto mx-auto">
            {/* Slanted label with physics */}
            <motion.div
              style={{
                y: tagScrollY,
                rotate: tagScrollRotate,
                scale: tagScrollScale,
                opacity: tagScrollOpacity,
                fontWeight: 400,
                fontSize: "48px",
                lineHeight: "100%",
                letterSpacing: "-3%",
              }}
              className="inline-block bg-[#7b68ee] text-black px-8 py-3 rounded-2xl text-base md:text-xl font-normal mb-8 shadow-lg text-center mx-14"
            >
              Students learn in silos!
            </motion.div>
            <motion.h2
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              transition={{ staggerChildren: 0.015, delayChildren: 0.3 }}
              className="text-center mx-auto px-3 "
              style={{
                fontFamily: "Inter",
                fontWeight: 400,
                fontSize: "64px",
                lineHeight: "100%",
                letterSpacing: "-0.03em",
              }}
            >
              {`They memorize the 'what',`.split("").map((char, index) => (
                <motion.span
                  key={`line1-${index}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {`but miss the 'why'`.split("").map((char, index) => (
                <motion.span
                  key={`line2-${index}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
              <br />
              {`Why do they learn what they learn?`
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={`line3-${index}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
            </motion.h2>
          </div>
        </motion.section>
      </div>

      {/* Dark Section with Text */}
      <section
        className="pt-24 px-5 relative overflow-hidden h-screen"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto relative z-10 align-middle h-full flex items-center"
        >
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.015, delayChildren: 0.1 }}
            className="text-2xl md:text-auto font-normal text-white text-right ml-auto"
            style={{
              fontWeight: 400,
              fontSize: "56px",
              lineHeight: "100%",
              letterSpacing: "-0.03em",
            }}
          >
            <div className="mb-2">
              {`We transform students from`.split("").map((char, index) => (
                <motion.span
                  key={`dark-section-line1-${index}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
            <div className="mb-2">
              {`passive consumers of technology`
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={`dark-section-line2-${index}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
            </div>
            <div className="mb-2">
              {`into active creators by connecting`
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={`dark-section-line3-${index}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
            </div>
            <div className="mb-2">
              {`the subjects they learn today with`
                .split("")
                .map((char, index) => (
                  <motion.span
                    key={`dark-section-line4-${index}`}
                    variants={charVariants}
                    className="inline-block"
                  >
                    {char === " " ? "\u00A0" : char}
                  </motion.span>
                ))}
            </div>
            <div>
              {`the innovations of tomorrow.`.split("").map((char, index) => (
                <motion.span
                  key={`dark-section-line5-${index}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Cards Section - Scroll-Driven Stacking */}
      <section
        ref={darkSectionRef}
        className="relative"
        style={{
          backgroundColor: "#1c1c1c",
          paddingBottom: "200px",
        }}
      >
        <div className="h-[300vh] md:h-[280vh]">
          <div
            className="sticky top-0 flex items-center justify-center px-5 md:px-0"
            style={{ minHeight: "100vh" }}
          >
            <div className="max-w-auto mx-auto w-full px-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Green Card - Third to enter */}
                <motion.div
                  style={{
                    y: useTransform(
                      darkSectionProgress,
                      [0.5, 0.75, 1],
                      [400, 160, 160]
                    ),
                    opacity: useTransform(
                      darkSectionProgress,
                      [0.5, 0.65, 0.75],
                      [0, 1, 1]
                    ),
                  }}
                  className="w-full"
                >
                  <Card
                    className="p-0 h-[400px] md:h-[476px] rounded-[10px] overflow-hidden w-full border-0"
                    style={{ backgroundColor: "#37e2b4" }}
                  >
                    <motion.div
                      className="text-black h-full flex flex-col "
                      // whileHover={{ y: -8 }}
                      // transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h3
                        className="text-3xl md:text-4xl font-normal leading-tight px-4 md:px-[25px] pt-4 md:pt-[25px] pb-6 md:pb-8 mb-6 md:mb-10"
                        style={{
                          fontWeight: 400,
                          fontSize: "48px",
                          lineHeight: "100%",
                          letterSpacing: "-3%",
                        }}
                      >
                        Evolution, Not
                        <br />
                        Addition
                      </h3>
                      <div className="mt-auto">
                        <div
                          className="bg-[#FAF4EC] px-4 md:px-4 py-4 md:py-5 h-[180px] md:h-[216px] flex flex-col items-end justify-end mx-[12px] mb-[17px]"
                          style={{
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
                              letterSpacing: "-3%",
                              textAlign: "right",
                            }}
                          >
                            We don&apos;t force a foreign
                            <br />
                            curriculum on students.
                            <br />
                            We show how existing lessons
                            <br />
                            evolve into advanced tech.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>

                {/* Purple Card - Second to enter */}
                <motion.div
                  style={{
                    y: useTransform(
                      darkSectionProgress,
                      [0.25, 0.5, 1],
                      [400, 80, 80]
                    ),
                    opacity: useTransform(
                      darkSectionProgress,
                      [0.25, 0.4, 0.5],
                      [0, 1, 1]
                    ),
                  }}
                  className="w-full"
                >
                  <Card
                    className="p-0 h-[400px] md:h-[476px] rounded-[10px] overflow-hidden w-full border-0"
                    style={{ backgroundColor: "#7371FC" }}
                  >
                    <motion.div
                      className="text-black h-full flex flex-col "
                      // whileHover={{ y: -8 }}
                      // transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h3
                        className="text-3xl md:text-4xl font-normal leading-tight px-4 md:px-[25px] pt-4 md:pt-[25px] pb-6 md:pb-8 mb-6 md:mb-10"
                        style={{
                          fontWeight: 400,
                          fontSize: "48px",
                          lineHeight: "100%",
                          letterSpacing: "-3%",
                        }}
                      >
                        Context-First
                        <br />
                        Learning
                      </h3>
                      <div className="mt-auto">
                        <div
                          className="bg-[#FAF4EC] px-4 md:px-4 py-4 md:py-5 h-[180px] md:h-[216px] flex flex-col items-end justify-end mx-[12px] mb-[17px]"
                          style={{
                            clipPath:
                              "polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)",
                            paddingTop: "2rem",
                            borderRadius: "10px",
                          }}
                        >
                          <p
                            className="opacity-90 text-sm md:text-base"
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                              fontSize: "20px",
                              lineHeight: "120%",
                              letterSpacing: "-3%",
                              textAlign: "right",
                            }}
                          >
                            We don&apos;t teach &quot;Robotics&quot;; we
                            <br />
                            teach how physics and code
                            <br />
                            merge to create motion.
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>

                {/* Yellow Card - First to enter */}
                <motion.div
                  style={{
                    y: useTransform(
                      darkSectionProgress,
                      [0, 0.25, 1],
                      [400, 0, 0]
                    ),
                    opacity: useTransform(
                      darkSectionProgress,
                      [0, 0.15, 0.25],
                      [0, 1, 1]
                    ),
                  }}
                  className="w-full"
                >
                  <Card
                    className="p-0 h-[400px] md:h-[476px] rounded-[10px] overflow-hidden w-full border-0"
                    style={{ backgroundColor: "#ffbf1f" }}
                  >
                    <motion.div
                      className="text-black h-full flex flex-col "
                      // whileHover={{ y: -8 }}
                      // transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <h3
                        className="text-3xl md:text-4xl font-normal leading-tight px-4 md:px-[25px] pt-4 md:pt-[25px] pb-6 md:pb-8 mb-6 md:mb-10"
                        style={{
                          fontWeight: 400,
                          fontSize: "48px",
                          lineHeight: "100%",
                          letterSpacing: "-3%",
                        }}
                      >
                        Creator
                        <br />
                        Mindset
                      </h3>
                      <div className="mt-auto">
                        <div
                          className="bg-[#FAF4EC] px-4 md:px-4 py-4 md:py-5 h-[180px] md:h-[216px] flex flex-col items-end justify-end mx-[12px] mb-[17px]"
                          style={{
                            clipPath:
                              "polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)",
                            paddingTop: "2rem",
                            borderRadius: "10px",
                          }}
                        >
                          <p
                            className="opacity-90 text-sm md:text-base font-light"
                            style={{
                              fontFamily: "Inter",
                              fontWeight: 400,
                              fontSize: "20px",
                              lineHeight: "120%",
                              letterSpacing: "-7%",
                              textAlign: "right",
                            }}
                          >
                            We shift the focus from &quot;How do
                            <br />
                            I use this device?&quot; to &quot;How do I <br />
                            build this device?&quot;
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Example Section with Stacking Cards */}
      <div className="relative bg-[#FAF4EC]">
        <div style={{ height: "280vh" }}>
          {/* Stacking Sections Container */}
          <div className="relative">
            {/* Example Section Header - Sticky */}
            <div
              className="sticky py-3 px-5 bg-[#FAF4EC]"
              style={{ top: "0px", zIndex: 0 }}
            >
              <motion.h2
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={itemVariants}
                className="text-3xl md:text-4xl font-semibold text-black pl-20 pb-3 md:px-10 pt-8"
                style={{
                  fontWeight: 400,
                  fontSize: "56px",
                  lineHeight: "100%",
                  letterSpacing: "-3%",
                }}
              >
                Let us show you an example
              </motion.h2>
            </div>

            {/* School Lesson Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="sticky px-5 bg-transparent flex items-center"
              style={{ top: "120px", zIndex: 1, height: "calc(100vh - 120px)" }}
            >
              <div className="max-w-screen mx-auto w-full ">
                <motion.div
                  variants={slideUpVariants}
                  className="bg-[#e6ded1] px-12 md:px-16 py-8 md:py-6 relative duration-500 max-w-full"
                  style={{ borderRadius: "24px", height: "100%" }}
                >
                  <div
                    className=" bg-white text-black px-8 py-3 rounded-md  mb-12 inline-block items-center justify-cente"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 500,
                      fontSize: "32px",
                      lineHeight: "121%",
                      letterSpacing: "-3%",
                    }}
                  >
                    The School Lesson
                  </div>
                  <div className=" items-start">
                    <h3
                      className="text-4xl md:text-5xl font-normal leading-tight text-black mb-14"
                      style={{
                        fontWeight: 500,
                        fontSize: "72px",
                        lineHeight: "121%",
                        letterSpacing: "-3%",
                      }}
                    >
                      Differentiation is used to find
                      <br />
                      the minimum and
                      <br />
                      maximum of a curve
                    </h3>
                    <div className="flex flex-col items-end gap-1 absolute top-8 right-8 md:top-64 md:right-36">
                      <svg
                        viewBox="0 0 240 180"
                        className="w-56 h-40 md:w-64 md:h-44"
                      >
                        <path
                          d="M 30 160 Q 120 40, 210 160"
                          fill="none"
                          stroke="#2c2c2c"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                        <line
                          x1="20"
                          y1="160"
                          x2="220"
                          y2="160"
                          stroke="#2c2c2c"
                          strokeWidth="1.2"
                          strokeLinecap="round"
                        />
                      </svg>
                      <span className="text-sm md:text-base text-black italic font-light">
                        dy/dx=0
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* MUSTARD Upgrade Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="sticky px-5 bg-transparent flex items-center"
              style={{ top: "120px", zIndex: 2, height: "calc(100vh - 120px)" }}
            >
              <div className="max-w-screen mx-auto w-full mt-20">
                <motion.div
                  variants={slideUpVariants}
                  className="bg-[#ffc700] px-12 md:px-16 py-8 md:py-6 relative duration-500 max-w-full"
                  style={{ borderRadius: "24px", height: "100%" }}
                >
                  <div
                    className=" bg-white text-black px-8 py-3 rounded-md  mb-12 inline-block items-center justify-center"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 500,
                      fontSize: "32px",
                      lineHeight: "121%",
                      letterSpacing: "-3%",
                    }}
                  >
                    MUSTARD Upgrade
                  </div>
                  <div className="absolute top-8 right-8 md:top-36 md:right-36">
                    <div
                      className="bg-[#7371FC] text-black px-8 py-6  transform rotate-6"
                      style={{
                        borderRadius: "16px",
                        fontWeight: 400,
                        fontSize: "36px",
                        lineHeight: "100%",
                        letterSpacing: "-3%",
                        textAlign: "center",
                      }}
                    >
                      This is how neural networks learn!
                    </div>
                  </div>
                  <div className=" py-20">
                    <h3
                      className="text-4xl md:text-5xl font-normal leading-tight text-black"
                      style={{
                        fontWeight: 500,
                        fontSize: "72px",
                        lineHeight: "121%",
                        letterSpacing: "-3%",
                      }}
                    >
                      AI detects which way error
                      <br />
                      goes down and moves in
                      <br />
                      that direction.
                    </h3>
                    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-7xl md:text-8xl font-bold text-white/20">
                      02
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>

            {/* The Build Section */}
            <motion.section
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="sticky px-5 bg-transparent flex items-center "
              style={{ top: "120px", zIndex: 3, height: "calc(100vh - 120px)" }}
            >
              <div className="max-w-screen mx-auto w-full mt-20">
                <motion.div
                  variants={slideUpVariants}
                  className="bg-[#2bdba0] px-12 md:px-16 py-8 md:py-6 relative duration-500 max-w-full"
                  style={{ borderRadius: "24px", height: "100%" }}
                >
                  <div
                    className="inline-block bg-white text-black px-8 py-3 rounded-md shadow-sm mb-12 items-center justify-center"
                    style={{
                      fontFamily: "Inter",
                      fontWeight: 500,
                      fontSize: "32px",
                      lineHeight: "121%",
                      letterSpacing: "-3%",
                    }}
                  >
                    The Build
                  </div>
                  <div className="py-20">
                    <h3
                      className="text-4xl md:text-5xl font-normal leading-tight text-black"
                      style={{
                        fontWeight: 500,
                        fontSize: "72px",
                        lineHeight: "121%",
                        letterSpacing: "-3%",
                      }}
                    >
                      A self-driving bot that uses
                      <br />
                      calculus to mathematically
                      <br />
                      minimize steering error.
                    </h3>
                    <div className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-7xl md:text-8xl font-bold text-white/20">
                      03
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.section>
          </div>
        </div>
      </div>

      {/* Mentored by Masters */}
      <motion.section
        ref={mentorRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 bg-[#FAF4EC]"
        onViewportEnter={() => setCardsAnimated(true)}
      >
        <div className="max-w-auto mx-auto text-center pt-14">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-semibold mb-14 text-black pd-14"
            style={{
              fontWeight: 400,
              fontSize: "64px",
              lineHeight: "100%",
              letterSpacing: "-3%",
            }}
          >
            Mentored by Masters
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-4 justify-items-center px-[145px]"
          >
            {/* PhD Scholars card */}
            <motion.div>
              <Card className="bg-black text-white rounded-[10px] overflow-hidden hover:-translate-y-1 w-full md:w-[481px] h-[466px] mx-auto">
                <div className=" flex flex-col h-full">
                  <h3 className="text-4xl md:text-5xl font-normal text-left mb-10 leading-tight px-[45px] pt-[36px]"
                  style={{
                fontWeight: 400,
                fontSize: "64px",
                lineHeight: "100%",
                letterSpacing: "-0.03em",
              }}>
                    PhD
                    <br />
                    Scholars
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#7371FC] rounded-xl  h-[215.8297576904297px] flex flex-col items-end justify-end mx-[20px] mb-[29px] px-[26px] pb-[34px]"
                      style={{
                        clipPath: "polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)",
                        paddingTop: "3rem",
                      }}
                    >
                      <p
                        className="opacity-90 text-black"
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: "24px",
                          lineHeight: "100%",
                          letterSpacing: "-7%",
                          textAlign: "right",
                        }}
                      >
                        Academic rigour delivered by
                        <br />
                        doctorate holders who ensure
                        <br />
                        theoretical depth and accuracy.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>

            {/* Industry Leaders card */}
            <motion.div>
              <Card className="bg-black text-white rounded-[10px] overflow-hidden hover:-translate-y-1 w-full md:w-[481px] h-[466px] mx-auto">
                <div className=" flex flex-col h-full">
                  <h3 className="text-4xl md:text-5xl font-normal text-left mb-10 leading-tight px-[45px] pt-[36px]"
                  style={{
                fontWeight: 400,
                fontSize: "64px",
                lineHeight: "100%",
                letterSpacing: "-0.03em",
              }}>
                    Industry
                    <br />
                    Leaders
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#43DDA4] rounded-xl  h-[215.8297576904297px] flex flex-col items-end justify-end mx-[20px] mb-[29px] px-[26px] pb-[34px]"
                      style={{
                        clipPath: "polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)",
                        paddingTop: "3rem",
                      }}
                    >
                      <p
                        className="opacity-90 text-black"
                        style={{
                          fontFamily: "Inter",
                          fontWeight: 400,
                          fontSize: "24px",
                          lineHeight: "100%",
                          letterSpacing: "-7%",
                          textAlign: "right",
                        }}
                      >
                        Practical insights from
                        <br />
                        engineering veterans who have
                        <br />
                        built the technologies of today.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Divider */}
      <div className="bg-[#FAF4EC]">
        <div className="max-w-6xl mx-auto px-5">
          <hr className="border-t border-gray-500" />
        </div>
      </div>

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 px-5 bg-[#FAF4EC] text-center relative h-screen"
      >
        <div className="max-w-auto mx-auto relative z-10">
          <motion.h2
            variants={itemVariants}
            className=" font-normal mb-8 leading-tight"
            style={{
              fontWeight: 400,
              fontSize: "64px",
              lineHeight: "100%",
              letterSpacing: "-3%",
            }}
          >
            Your Students Are Ready to
            <br />
            Build
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-12 max-w-auto mx-auto text-gray-700 leading-relaxed"
            style={{
              fontWeight: 400,
              fontSize: "32px",
              lineHeight: "100%",
              letterSpacing: "-3%",
            }}
          >
            Stop teaching them to just use technology. Partner with
            <br />
            MUSTARD and teach them to master it.
          </motion.p>
          <motion.div variants={scaleVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Button
                className="bg-[#7371FC] text-white px-12 py-6 text-xl font-normal rounded-md w-[339px] h-[76px]"
                style={{
                  fontFamily: "Inter",
                  fontWeight: 500,
                  fontSize: "32px",
                  lineHeight: "121%",
                  letterSpacing: "-3%",
                }}
                onClick={() => navigate("/contact")}
              >
                Book a Demo
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
};

export default Index;
