import { Card, CardContent } from "@/components/ui/card";

const About = () => {
  const schools = [
    { name: "SBIOA Matric Hr Sec School", location: "Anna Nagar" },
    { name: "Velammal Matric Hr Sec School", location: "Mogappair" },
    { name: "St Joseph Matric Hr Sec School", location: "Perambur" },
    { name: "St Joseph Matric Hr Sec School", location: "Shenoy Nagar" },
    { name: "Sri Sankara Matric Hr Sec School", location: "Adyar" },
    { name: "Shri Natesan Vidyasala Matric Hr Sec School", location: "T Nagar" },
    { name: "St Joseph Matric Hr Sec School", location: "Royapuram" },
    { name: "St Joseph Matric Hr Sec School", location: "Purasawalkam" },
    { name: "St Joseph Matric Hr Sec School", location: "Vepery" },
    { name: "St Joseph Matric Hr Sec School", location: "Kilpauk" },
    { name: "St Joseph Matric Hr Sec School", location: "Anna Nagar" },
    { name: "St Joseph Matric Hr Sec School", location: "Egmore" },
  ];

  return (
    <div className="min-h-screen">
      {/* About Us Section */}
      <section className="py-32 px-5">
        <div className="max-w-5xl mx-auto text-center animate-fade-in">
          <h1 className="text-7xl md:text-8xl font-normal mb-16 text-black tracking-tight">
            About Us
          </h1>
          <p className="text-2xl md:text-3xl text-black leading-relaxed max-w-4xl mx-auto font-medium">
            MUSTARD was born from a realization - <em className="italic font-normal">
              The <br />
               world is changing faster than our textbooks.</em> 
            <br />
            While technology accelerates exponentially, 
            <br />
            the way we teach the fundamentals has 
            <br />
            remained static.
          </p>
        </div>
      </section>

      {/* Our Vision Section */}
      <section className="py-32 px-5">
        <div className="max-w-full mx-auto">
          <div className="bg-[#FFC00D] rounded-3xl px-8 text-center h-screen flex flex-col justify-center items-center ">
            <h2 className="text-6xl md:text-7xl font-normal mb-12 text-black">
              Our Vision
            </h2>
            <p className="text-2xl md:text-3xl text-black leading-relaxed max-w-4xl mx-auto font-normal">
              A future where every student leaves school not just with a report card,
              but with the confidence to engineer solutions for the world's problems.
            </p>
          </div>
        </div>
      </section>

      {/* Our Core Values Section */}
      <section className="py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-normal mb-20 text-center text-black">
            Our Core Values
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Relevance Card */}
            <Card className="rounded-xl overflow-hidden border-none bg-[#4ECDC4] p-8 shadow-lg">
              <div className="mb-32">
                <h3 className="text-4xl font-normal text-black">Relevance</h3>
              </div>
              <div className="relative">
                <div 
                  className="bg-[#FAF4EC] rounded-xl px-8 py-12"
                  style={{
                    clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)',
                    paddingTop: '3rem'
                  }}
                >
                  <p className="text-xl md:text-2xl text-black leading-relaxed text-center py-8">
                    Every lesson must answer &quot;Why does this matter?&quot;
                  </p>
                </div>
              </div>
            </Card>

            {/* Integration Card */}
            <Card className="rounded-xl overflow-hidden border-none bg-[#8B7FEB] p-8 shadow-lg">
              <div className="mb-32">
                <h3 className="text-4xl font-normal text-black">Integration</h3>
              </div>
              <div className="relative">
                <div 
                  className="bg-[#FAF4EC] rounded-xl px-8 py-12"
                  style={{
                    clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)',
                    paddingTop: '3rem'
                  }}
                >
                  <p className="text-xl md:text-2xl text-black leading-relaxed text-center pt-8">
                    Technology is not a separate subject; it is the application of all subjects.
                  </p>
                </div>
              </div>
            </Card>

            {/* Empowerment Card */}
            <Card className="rounded-xl overflow-hidden border-none bg-[#FFC107] p-8 shadow-lg">
              <div className="mb-32">
                <h3 className="text-4xl font-normal text-black">Empowerment</h3>
              </div>
              <div className="relative">
                <div 
                  className="bg-[#FAF4EC] rounded-xl px-8 py-12"
                  style={{
                    clipPath: 'polygon(0 30%, 100% 0%, 100% 100%, 0% 100%)',
                    paddingTop: '3rem'
                  }}
                >
                  <p className="text-xl md:text-2xl text-black leading-relaxed text-center pt-8">
                    Students should feel capable, not intimidated, by complex tech.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Schools We Serve Section */}
      <section className="py-32 px-5">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-6xl md:text-7xl font-normal mb-20 text-center text-black">
            Schools We Serve
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[0.2rem]">
            {schools.map((school, index) => (
              <div
                key={index}
                className="p-8 bg-transparent rounded-3xl border border-[#EAE4D8] shadow-sm"
              >
                <h3 className="text-xl font-normal mb-2 text-black leading-tight">
                  {school.name}
                </h3>
                <p className="text-lg italic text-gray-700">{school.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;