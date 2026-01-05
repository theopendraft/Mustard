import { motion } from "framer-motion";
import classroom1 from "@/assets/classroom-1.jpg";
import classroom2 from "@/assets/classroom-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import studentSuccess from "@/assets/student-success.jpg";
import mathToAi from "@/assets/math-to-ai.jpg";

// Data structure for easy updates
const GALLERY_ITEMS = [
  // Column 1 - Three standard images
  {
    id: 1,
    imageUrl: classroom1,
    altText: "Interactive STEM Learning Session",
    span: "col-span-1 row-span-1",
  },
  {
    id: 2,
    imageUrl: mathToAi,
    altText: "Math to Machine Learning Workshop",
    span: "col-span-1 row-span-1",
  },
  {
    id: 3,
    imageUrl: gallery1,
    altText: "Science Lab Innovation",
    span: "col-span-1 row-span-1",
  },
  // Column 2 - First image spans 2 columns horizontally
  {
    id: 4,
    imageUrl: gallery2,
    altText: "Robotics Competition Event",
    span: "col-span-2 row-span-1",
    height: "h-[321px]",
    width: "w-[710px]", // Combines two columns (349px + 12px + 349px)
  },
  {
    id: 5,
    imageUrl: gallery3,
    altText: "Teacher Training Workshop",
    span: "col-span-1 row-span-1",
  },
  // Column 3 - Three images with middle one taller
  {
    id: 6,
    imageUrl: studentSuccess,
    altText: "Student Achievement Celebration",
    span: "col-span-1 row-span-1",
  },
  {
    id: 7,
    imageUrl: classroom2,
    altText: "Collaborative Team Projects",
    span: "col-span-1 row-span-1",
    height: "row-span-1 h-[400px]", // Taller middle image
  },
  {
    id: 8,
    imageUrl: classroom1,
    altText: "Final Gallery Image",
    span: "col-span-1 row-span-1",
  },
];

const Gallery = () => {
  return (
    <div className="min-h-screen" style={{ backgroundColor: "#FAF4EC" }}>
      {/* First Section - Image Left, Text Right */}
      <section className="px-5 pt-40 pb-[12px]">
        <div className="max-w-6xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 align-bottom">
            {/* Left - Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-end align-bottom"
            >
              <img
                src={classroom1}
                alt="MUSTARD Gallery"
                className="rounded-[20px] h-[321px] w-[349px] object-cover"
              />
            </motion.div>

            {/* Right - Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-col align-right justify-center mb-24"
            >
              <h1
                className="mb-8 text-right pr-8"
                style={{
                  fontFamily: "'Haffer', sans-serif",
                  fontWeight: 400,
                  fontSize: "96px",
                  lineHeight: "90%",
                  letterSpacing: "-0.03em",
                  color: "#000",
                }}
              >
                Gallery
              </h1>
              <p
                className="text-black text-right"
                style={{
                  fontFamily: "'Haffer', sans-serif",
                  fontWeight: 400,
                  fontSize: "32px",
                  lineHeight: "120%",
                  letterSpacing: "-0.03em",
                }}
              >
                These aren't just tutors; they are
                <br />
                experts in their field. We bring deep
                <br />
                industry knowledge to the
                <br />
                whiteboard, answering the 'Why'
                <br />
                behind every equation
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Asymmetric Gallery Grid */}
      <section className="px-5 pb-20">
        <div className="max-w-6xl mx-auto px-10">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-[12px]"
            style={{ gridAutoFlow: "dense" }}
          >
            {GALLERY_ITEMS.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${item.span} ${item.height || "h-[321px]"} ${
                  item.width || "w-[349px]"
                } overflow-hidden rounded-[20px] group cursor-pointer`}
              >
                <motion.img
                  src={item.imageUrl}
                  alt={item.altText}
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                  style={{
                    filter: "brightness(1)",
                  }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Second Section - Featured Gallery with Heading */}
      <section className="px-5 pb-20 mt-20">
        <div className="max-w-6xl mx-auto">
          {/* Heading */}
          <h2
            className="mb-12 text-center"
            style={{
              fontFamily: "'Haffer', sans-serif",
              fontWeight: 400,
              fontSize: "64px",
              lineHeight: "90%",
              letterSpacing: "-0.03em",
              color: "#000",
            }}
          >
            Turning 'Will I ever use this?'
            <br />
            into 'Look what I built!'
          </h2>

          {/* Grid Layout */}
          <div className="space-y-[12px]">
            {/* First Row - 3 Images */}
            <div className="flex gap-[12px] justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="w-[349px] h-[321px] overflow-hidden rounded-[20px] group cursor-pointer"
              >
                <motion.img
                  src={classroom1}
                  alt="Gallery Image 1"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="w-[349px] h-[321px] overflow-hidden rounded-[20px] group cursor-pointer"
              >
                <motion.img
                  src={mathToAi}
                  alt="Gallery Image 2"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="w-[349px] h-[321px] overflow-hidden rounded-[20px] group cursor-pointer"
              >
                <motion.img
                  src={gallery1}
                  alt="Gallery Image 3"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              </motion.div>
            </div>

            {/* Second Row - 2 Images (40:60 ratio) */}
            <div className="flex gap-[12px] justify-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="w-[428px] h-[321px] overflow-hidden rounded-[20px] group cursor-pointer"
              >
                <motion.img
                  src={gallery2}
                  alt="Gallery Image 4"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="w-[634px] h-[321px] overflow-hidden rounded-[20px] group cursor-pointer"
              >
                <motion.img
                  src={gallery3}
                  alt="Gallery Image 5"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.05, filter: "brightness(0.9)" }}
                  transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;
