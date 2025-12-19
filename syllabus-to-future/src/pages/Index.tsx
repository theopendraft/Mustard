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
    <div className="min-h-screen bg-[#fbf1e5]">
      {/* Hero Section */}
      <section
        ref={heroRef}
        className="relative text-center py-16 px-5 bg-[#fbf1e5] overflow-hidden"
      >
        <motion.div
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10"
        >
          <motion.h1
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="text-4xl md:text-6xl font-normal mb-8 text-black leading-tight"
          >
            Don&apos;t Just Learn it.
            <br />
            <motion.strong
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.3, ease: [0.23, 1, 0.32, 1] }}
              className="text-[#7b68ee] inline-block"
            >
              Build it.
            </motion.strong>
          </motion.h1>

          {/* Podcast Interview Image with Float Animation */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.23, 1, 0.32, 1] }}
            className="mx-auto mb-10"
            style={{ maxWidth: "1158px" }}
          >
            <motion.img
              src={podcastImg}
              alt="MUSTARD Podcast Interview"
              className="w-full object-cover shadow-3xl border-4 border-white"
              style={{
                height: "558px",
                borderRadius: "20px",
              }}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.6, ease: [0.23, 1, 0.32, 1] },
              }}
            />
          </motion.div> */}
        </motion.div>
      </section>

      {/* Scroll-Linked Scaling Video Section */}
      <section
        ref={scrollScaleRef}
        className="relative bg-[#fbf1e5]"
        style={{ height: "250vh" }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
          <motion.div
            style={{
              scale,
              borderRadius,
            }}
            className="relative w-full max-w-7xl mx-4 aspect-video bg-gray-300 shadow-2xl overflow-hidden"
          >
            {/* Video/Content Container */}
            <div className="w-full h-full flex items-center justify-center">
              <video
                className="w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
              >
                {/* Replace with your video source */}
                <source src="/video.mp4" type="video/mp4" />
              </video>

              {/* Placeholder if no video */}
              {/* <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#7b68ee] to-[#6a5acd]">
                <div className="text-center text-white">
                  <h3 className="text-5xl md:text-7xl font-bold mb-4">
                    Your Video Here
                  </h3>
                  <p className="text-xl md:text-2xl opacity-90">
                    Scales as you scroll
                  </p>
                </div>
              </div> */}
            </div>

            {/* Text Overlay - Fades in at full scale */}
            <motion.div
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
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Quote Section */}
      <motion.section
        ref={quoteRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 px-5 bg-[#fbf1e5]"
        onViewportEnter={() => setHasAnimated(true)}
      >
        <div className="max-w-5xl mx-auto ">
          {/* Slanted label with physics */}
          <motion.div
            style={{
              y: tagScrollY,
              rotate: tagScrollRotate,
              scale: tagScrollScale,
              opacity: tagScrollOpacity,
            }}
            className="inline-block bg-[#7b68ee] text-white px-8 py-3 rounded-md text-base md:text-xl font-normal mb-8 shadow-lg"
          >
            Students learn in silos
          </motion.div>
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.015, delayChildren: 0.3 }}
            className="text-4xl md:text-5xl font-normal leading-tight text-center mx-auto"
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

      {/* Dark Section with Cards */}
      <section
        ref={darkSectionRef}
        className="py-24 px-5 relative overflow-hidden"
        style={{ backgroundColor: "#1c1c1c" }}
      >
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto relative z-10"
        >
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            transition={{ staggerChildren: 0.015, delayChildren: 0.1 }}
            className="text-2xl md:text-4xl font-normal text-white mb-10 text-right leading-relaxed max-w-2xl md:max-w-3xl ml-auto pl-40"
          >
            {`We transform students from passive consumers of technology into active creators by connecting the subjects they learn today with the innovations of tomorrow.`
              .split("")
              .map((char, index) => (
                <motion.span
                  key={`dark-section-${index}`}
                  variants={charVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12"
          >
            {/* Green Card */}
            <motion.div
              style={{
                y: cardsScrollY,
                rotate: cardsScrollRotate,
                scale: cardsScrollScale,
                opacity: cardsScrollOpacity,
              }}
            >
              <Card
                className="p-0 h-auto md:h-[420px] transition-all duration-500 ease-smooth hover:shadow-2xl rounded-[28px] overflow-hidden"
                style={{ backgroundColor: "#37e2b4" }}
              >
                <motion.div
                  className="text-white h-full flex flex-col px-10 pt-10 pb-8"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-normal leading-tight mb-10">
                    Evolution, Not
                    <br />
                    Addition
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#fff7eb] text-black text-sm md:text-base leading-relaxed px-6 py-6 rounded-[24px]"
                      style={{ transform: "skewY(-3deg)" }}
                    >
                      <p
                        className="opacity-90"
                        style={{ transform: "skewY(3deg)" }}
                      >
                        We don&apos;t force a foreign curriculum on students. We
                        show how existing lessons evolve into advanced tech.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Purple Card - Context-First Learning */}
            <motion.div
              style={{
                y: cardsScrollY,
                rotate: cardsScrollRotate,
                scale: cardsScrollScale,
                opacity: cardsScrollOpacity,
              }}
            >
              <Card
                className="p-0 h-auto md:h-[420px] transition-all duration-500 ease-smooth hover:shadow-2xl rounded-[28px] overflow-hidden"
                style={{ backgroundColor: "#706cff" }}
              >
                <motion.div
                  className="text-white h-full flex flex-col px-10 pt-10 pb-8"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-normal leading-tight mb-10">
                    Context-First
                    <br />
                    Learning
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#fff7eb] text-black text-sm md:text-base leading-relaxed px-6 py-6 rounded-[24px]"
                      style={{ transform: "skewY(-3deg)" }}
                    >
                      <p
                        className="opacity-90"
                        style={{ transform: "skewY(3deg)" }}
                      >
                        We don&apos;t teach &quot;Robotics&quot;; we teach how
                        physics and code merge to create motion.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>

            {/* Yellow Card - Creator Mindset */}
            <motion.div
              style={{
                y: cardsScrollY,
                rotate: cardsScrollRotate,
                scale: cardsScrollScale,
                opacity: cardsScrollOpacity,
              }}
            >
              <Card
                className="p-0 h-auto md:h-[420px] transition-all duration-500 ease-smooth hover:shadow-2xl rounded-[28px] overflow-hidden"
                style={{ backgroundColor: "#ffbf1f", color: "#1c1c1c" }}
              >
                <motion.div
                  className="h-full flex flex-col px-10 pt-10 pb-8"
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                >
                  <h3 className="text-3xl md:text-4xl font-normal leading-tight mb-10">
                    Creator
                    <br />
                    Mindset
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#fff7eb] text-black text-sm md:text-base leading-relaxed px-6 py-6 rounded-[24px]"
                      style={{ transform: "skewY(-3deg)" }}
                    >
                      <p
                        className="opacity-90"
                        style={{ transform: "skewY(3deg)" }}
                      >
                        We shift the focus from &quot;How do I use this
                        device?&quot; to &quot;How do I build this device?&quot;
                      </p>
                    </div>
                  </div>
                </motion.div>
              </Card>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Example Section Header */}
      <section className="py-5 px-5 bg-[#fbf1e5]">
        <motion.h2
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="text-3xl md:text-4xl font-semibold text-black px-12 md:px-10 pt-14"
        >
          Let us show you an example
        </motion.h2>
      </section>

      {/* Stacking Sections Container */}
      <div className="relative" style={{ height: "300vh" }}>
        {/* School Lesson Section */}
        <motion.section
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="sticky top-0 py-5 px-5 bg-transparent h-screen flex items-center"
          style={{ zIndex: 1 }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              variants={slideUpVariants}
              className="bg-[#e6ded1] px-12 md:px-16 py-16 md:py-8 relative shadow-lg hover:shadow-xl transition-shadow duration-500"
              style={{ borderRadius: "24px" }}
            >
              <div className="inline-block bg-white text-black text-base font-semibold px-8 py-3 rounded-md shadow-sm mb-12">
                The School Lesson
              </div>
              <div className="grid grid-cols-1 md:grid-cols-[3fr_1fr] gap-16 items-start py-20">
                <h3 className="text-4xl md:text-5xl font-normal leading-tight text-black">
                  Differentiation is used to find
                  <br />
                  the minimum and
                  <br />
                  maximum of a curve
                </h3>
                <div className="flex justify-center md:justify-end items-start pt-4">
                  <div className="flex flex-col items-end gap-1">
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
          className="sticky top-0 py-5 px-5 bg-transparent h-screen flex items-center"
          style={{ zIndex: 2 }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              variants={slideUpVariants}
              className="bg-[#ffc700] px-12 md:px-16 py-16 md:py-8 relative shadow-lg hover:shadow-xl transition-shadow duration-500"
              style={{ borderRadius: "24px" }}
            >
              <div className="inline-block bg-white text-black text-base font-semibold px-8 py-3 rounded-md shadow-sm mb-12">
                MUSTARD Upgrade
              </div>
              <div className="absolute top-8 right-8 md:top-40 md:right-56">
                <div
                  className="bg-[#6b63ff] text-white text-base md:text-lg font-medium px-8 py-4 shadow-lg transform rotate-6"
                  style={{ borderRadius: "16px" }}
                >
                  This is how neural networks learn!
                </div>
              </div>
              <div className="relative pb-14">
                <h3 className="text-4xl md:text-5xl font-normal text-black leading-tight max-w-2xl py-20">
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
          className="sticky top-0 py-5 px-5 bg-transparent h-screen flex items-center"
          style={{ zIndex: 3 }}
        >
          <div className="max-w-6xl mx-auto w-full">
            <motion.div
              variants={slideUpVariants}
              className="bg-[#2bdba0] px-12 md:px-16 py-16 md:py-8 relative shadow-lg hover:shadow-xl transition-shadow duration-500"
              style={{ borderRadius: "24px" }}
            >
              <div className="inline-block bg-white text-black text-base font-semibold px-8 py-3 rounded-md shadow-sm mb-12">
                The Build
              </div>
              <div className="relative pb-14">
                <h3 className="text-4xl md:text-5xl font-normal text-black leading-tight max-w-2xl py-20">
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

      {/* Mentored by Masters */}
      <motion.section
        ref={mentorRef}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-24 px-5 bg-[#fbf1e5]"
        onViewportEnter={() => setCardsAnimated(true)}
      >
        <div className="max-w-6xl mx-auto text-center px-32">
          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl font-semibold mb-14 text-black pd-14"
          >
            Mentored by Masters
          </motion.h2>

          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-4 pt-20"
          >
            {/* PhD Scholars card */}
            <motion.div
              style={{
                y: mentorScrollY,
                rotate: mentorScrollRotate,
                scale: mentorScrollScale,
                opacity: mentorScrollOpacity,
              }}
            >
              <Card className="bg-black text-white rounded-md overflow-hidden shadow-3xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
                <div className="px-10 pt-10 pb-8 flex flex-col h-full">
                  <h3 className="text-4xl md:text-5xl font-normal text-left mb-10 leading-tight">
                    PhD
                    <br />
                    Scholars
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#6b63ff] text-black text-sm md:text-base leading-relaxed px-6 py-6 rounded-[24px]"
                      style={{ transform: "skewY(-4deg)" }}
                    >
                      <p
                        className="text-black opacity-90"
                        style={{ transform: "skewY(4deg)" }}
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
            <motion.div
              style={{
                y: mentorScrollY,
                rotate: mentorScrollRotate,
                scale: mentorScrollScale,
                opacity: mentorScrollOpacity,
              }}
            >
              <Card className="bg-black text-white rounded-md overflow-hidden shadow-3xl transition-all duration-500 hover:shadow-3xl hover:-translate-y-1">
                <div className="px-10 pt-10 pb-8 flex flex-col h-full">
                  <h3 className="text-4xl md:text-5xl font-normal text-left mb-10 leading-tight">
                    Industry
                    <br />
                    Leaders
                  </h3>
                  <div className="mt-auto">
                    <div
                      className="bg-[#2bdba0] text-black text-sm md:text-base leading-relaxed px-6 py-6 rounded-[24px] text-align-left"
                      style={{ transform: "skewY(-4deg)" }}
                    >
                      <p
                        className="text-black opacity-90 text-align-left"
                        style={{ transform: "skewY(4deg)" }}
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

      {/* CTA Section */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
        className="py-28 px-5 bg-gradient-to-br from-[#f5f5f5] to-white text-center relative overflow-hidden"
      >
        <div className="max-w-3xl mx-auto relative z-10">
          <motion.h2
            variants={itemVariants}
            className="text-5xl md:text-7xl font-normal mb-8 leading-tight"
          >
            Your Students Are Ready to
            <br />
            <strong className="text-[#7b68ee]">Build</strong>
          </motion.h2>
          <motion.p
            variants={itemVariants}
            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-700 leading-relaxed"
          >
            Stop teaching them to just use technology. Partner with MUSTARD and
            teach them to master it.
          </motion.p>
          <motion.div variants={scaleVariants}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
            >
              <Button
                className="bg-[#7b68ee] hover:bg-[#6a5acd] text-white px-12 py-6 text-xl font-normal rounded-md shadow-2xl hover:shadow-3xl transition-all duration-300"
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
