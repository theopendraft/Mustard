import { Facebook, Twitter, Linkedin, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-slate-950 text-white mt-16">


      {/* Main footer content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 py-1 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand Section (no extra MUSTARD heading – only description) */}
          <div className="space-y-4">
            <p className="text-gray-300 text-sm leading-relaxed">
              An initiative by ADRIG AI Technologies Pvt. Ltd. Teaching the technologies of the future directly from your existing syllabus.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              <a href="#" className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                <Facebook className="h-4 w-4 text-gray-300 hover:text-primary" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                <Twitter className="h-4 w-4 text-gray-300 hover:text-primary" />
              </a>
              <a href="#" className="w-8 h-8 bg-white/10 flex items-center justify-center hover:bg-primary/20 transition-all duration-300">
                <Linkedin className="h-4 w-4 text-gray-300 hover:text-primary" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">About Us</Link></li>
              <li><Link to="/method" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">Our Method</Link></li>
              <li><Link to="/schools" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">Partner Schools</Link></li>
              <li><Link to="/gallery" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">Gallery</Link></li>
              <li><Link to="/team" className="text-gray-300 hover:text-primary transition-colors duration-300 text-sm">Our Team</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="font-semibold text-white">
              Contact Us
            </h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">contact@mustard.co.in</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-gray-300 text-sm">+91 8667370744</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0 mt-1" />
                <span className="text-gray-300 text-sm leading-relaxed">
                  No. 2, Sangothi Amman Koil 4th Cross Street,<br />
                  Sembakkam, Chennai - 600073
                </span>
              </div>
            </div>
          </div>
        </div>



        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © 2024 <span className="text-primary font-semibold">ADRIG AI Technologies Pvt. Ltd.</span> All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-primary transition-colors duration-300 text-sm">Terms of Service</a>
            </div>
          </div>
        </div>

      {/* Centered MUSTARD band */}
      <div className="bg-slate-950 pt-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-9xl md:text-5xl font-normal text-center" 
          style={{
              fontWeight: 400,
              fontSize: "128px",
              lineHeight: "100%",
              letterSpacing: "-3%",
              color: "#FFC00D",
              transform: "translateY(14px)",
            }}>
            MUSTARD
          </h2>
        </div>
      </div>

      </div>
    </footer>
  );
};

export default Footer;