import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    schoolName: "",
    role: "",
    phone: "",
    message: "",
  });
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent!",
      description:
        "Thank you for your interest. We'll get back to you within 24 hours.",
    });
    setFormData({
      name: "",
      email: "",
      schoolName: "",
      role: "",
      phone: "",
      message: "",
    });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16 pt-20 animate-fade-in">
          <h1
            className="font-bold mb-6"
            style={{
              fontFamily: "'Haffer', sans-serif",
              fontWeight: 400,
              fontSize: "96px",
              lineHeight: "100%",
              letterSpacing: "-0.03em",
            }}
          >
            Partner With Us
          </h1>
          <p
            className="text-muted-foreground max-w-3xl mx-auto"
            style={{
              fontFamily: "'Haffer', sans-serif",
              fontWeight: 400,
              fontSize: "24px",
              lineHeight: "140%",
              letterSpacing: "-0.02em",
            }}
          >
            Ready to bring the future of education to your school? Let's start a
            conversation about transforming your students' learning experience.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card className="hover-lift">
              <CardContent className="p-8">
                <h2
                  className="font-semibold mb-6"
                  style={{
                    fontFamily: "'Haffer', sans-serif",
                    fontWeight: 400,
                    fontSize: "36px",
                    lineHeight: "120%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Get Started Today
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="schoolName">School Name *</Label>
                      <Input
                        id="schoolName"
                        name="schoolName"
                        type="text"
                        required
                        value={formData.schoolName}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="role">Your Role *</Label>
                      <Input
                        id="role"
                        name="role"
                        type="text"
                        required
                        placeholder="Principal, Teacher, Administrator..."
                        value={formData.role}
                        onChange={handleChange}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell us about your school, student count, current curriculum, and how you'd like to integrate technology education..."
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-1"
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-fade-in">
            {/* Contact Details */}
            <Card className="hover-lift">
              <CardContent className="p-8">
                <h3
                  className="font-semibold mb-6"
                  style={{
                    fontFamily: "'Haffer', sans-serif",
                    fontWeight: 400,
                    fontSize: "28px",
                    lineHeight: "120%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Contact Information
                </h3>

                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">
                        ADRIG AI Technologies Pvt. Ltd.
                      </p>
                      <p className="text-muted-foreground">
                        No. 2, Sangothi Amman Koil 4th Cross Street,
                        <br />
                        Sembakkam, Chennai - 600073
                        <br />
                        Tamil Nadu, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <span>+91 8667370744</span>
                  </div>

                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <span>contact@mustard.co.in</span>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mt-1 mr-3 flex-shrink-0" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Friday: 9:00 AM - 6:00 PM
                        <br />
                        Saturday: 10:00 AM - 4:00 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="hover-lift">
              <CardContent className="p-8">
                <h3
                  className="font-semibold mb-6"
                  style={{
                    fontFamily: "'Haffer', sans-serif",
                    fontWeight: 400,
                    fontSize: "28px",
                    lineHeight: "120%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  Why Schools Choose Us
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Response Time</span>
                    <span className="font-bold text-primary">24 Hours</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Setup Time</span>
                    <span className="font-bold text-primary">2 Weeks</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Teacher Training
                    </span>
                    <span className="font-bold text-primary">Included</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">
                      Curriculum Support
                    </span>
                    <span className="font-bold text-primary">Ongoing</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Next Steps */}
            <Card className="hover-lift bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardContent className="p-8">
                <h3
                  className="font-semibold mb-4"
                  style={{
                    fontFamily: "'Haffer', sans-serif",
                    fontWeight: 400,
                    fontSize: "28px",
                    lineHeight: "120%",
                    letterSpacing: "-0.02em",
                  }}
                >
                  What Happens Next?
                </h3>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      1
                    </span>
                    <div>
                      <p className="font-medium">
                        We'll contact you within 24 hours
                      </p>
                      <p className="text-muted-foreground">
                        Initial discussion about your needs
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      2
                    </span>
                    <div>
                      <p className="font-medium">Schedule a demo session</p>
                      <p className="text-muted-foreground">
                        See our teaching method in action
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-bold mr-3 mt-0.5">
                      3
                    </span>
                    <div>
                      <p className="font-medium">Pilot program design</p>
                      <p className="text-muted-foreground">
                        Customized for your school's needs
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
