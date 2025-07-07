import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Heart, 
  Users, 
  Award, 
  Shield, 
  Target, 
  Globe,
  Brain,
  Stethoscope,
  Building2,
  Star,
  ArrowLeft
} from "lucide-react";

export default function About() {
  const stats = [
    { icon: Users, value: "10,000+", label: "Active Users" },
    { icon: Building2, value: "500+", label: "Partner Clinics" },
    { icon: Brain, value: "50,000+", label: "AI Consultations" },
    { icon: Award, value: "4.9/5", label: "User Rating" },
  ];

  const team = [
    {
      name: "Dr. Sarah Chen",
      role: "Chief Medical Officer",
      image: "/api/placeholder/150/150",
      bio: "15+ years in digital health innovation and patient care excellence.",
    },
    {
      name: "Michael Rodriguez",
      role: "CEO & Founder",
      image: "/api/placeholder/150/150", 
      bio: "Healthcare technology entrepreneur with a vision for accessible AI-driven care.",
    },
    {
      name: "Dr. Emily Watson",
      role: "Head of AI Research",
      image: "/api/placeholder/150/150",
      bio: "Leading researcher in medical AI and machine learning applications.",
    },
    {
      name: "David Kim",
      role: "CTO",
      image: "/api/placeholder/150/150",
      bio: "Expert in healthcare technology infrastructure and data security.",
    },
  ];

  const values = [
    {
      icon: Heart,
      title: "Patient-Centered Care",
      description: "Every decision we make prioritizes patient health outcomes and experience.",
    },
    {
      icon: Shield,
      title: "Privacy & Security",
      description: "HIPAA-compliant platform ensuring your health data remains secure and private.",
    },
    {
      icon: Globe,
      title: "Accessible Healthcare",
      description: "Making quality healthcare information and services available to everyone.",
    },
    {
      icon: Target,
      title: "Evidence-Based",
      description: "All recommendations are based on scientific research and medical best practices.",
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/">
          <Button variant="ghost" className="mb-4 text-afya-primary">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-br from-afya-light to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center mb-6">
              <Heart className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-afya-primary">
                About AfyaLynx
              </h1>
            </div>
            <p className="text-xl text-afya-secondary max-w-3xl mx-auto mb-8">
              We're revolutionizing healthcare access through AI-powered solutions that connect patients 
              with personalized treatment recommendations and nearby healthcare providers.
            </p>
            <Badge className="bg-primary text-white px-4 py-2 text-lg">
              Transforming Healthcare Since 2024
            </Badge>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-afya-primary mb-6">Our Mission</h2>
                <p className="text-lg text-afya-secondary mb-6">
                  AfyaLynx exists to democratize healthcare access by leveraging artificial intelligence 
                  to provide instant, personalized medical guidance. We believe everyone deserves timely, 
                  accurate health information and easy access to quality healthcare providers.
                </p>
                <p className="text-lg text-afya-secondary">
                  Our platform combines cutting-edge AI technology with a comprehensive network of 
                  healthcare providers to deliver a seamless experience that puts patient health first.
                </p>
              </div>
              <div className="relative">
                <Card className="afya-card p-8 text-center">
                  <Stethoscope className="h-16 w-16 text-primary mx-auto mb-4" />
                  <h3 className="text-2xl font-bold text-afya-primary mb-2">
                    Healthcare Reimagined
                  </h3>
                  <p className="text-afya-secondary">
                    Bridging the gap between patients and healthcare through intelligent technology
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-20 bg-afya-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-afya-primary mb-4">
                Making Impact Every Day
              </h2>
              <p className="text-xl text-afya-secondary">
                Numbers that reflect our commitment to improving healthcare access
              </p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <Card key={index} className="afya-card text-center">
                  <CardContent className="pt-6">
                    <stat.icon className="h-12 w-12 text-primary mx-auto mb-4" />
                    <div className="text-3xl font-bold text-afya-primary mb-2">
                      {stat.value}
                    </div>
                    <div className="text-afya-secondary">{stat.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-afya-primary mb-4">
                Our Core Values
              </h2>
              <p className="text-xl text-afya-secondary">
                The principles that guide everything we do
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="afya-card">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="bg-primary text-white p-3 rounded-lg">
                        <value.icon className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-afya-primary mb-2">
                          {value.title}
                        </h3>
                        <p className="text-afya-secondary">{value.description}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 bg-afya-light">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-afya-primary mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-afya-secondary">
                Healthcare and technology experts working together to transform care
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="afya-card text-center">
                  <CardContent className="pt-6">
                    <div className="w-24 h-24 bg-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                      <span className="text-white text-2xl font-bold">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-afya-primary mb-1">
                      {member.name}
                    </h3>
                    <p className="text-primary font-medium mb-3">{member.role}</p>
                    <p className="text-sm text-afya-secondary">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technology Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-afya-primary mb-6">
                  Powered by Advanced AI
                </h2>
                <p className="text-lg text-afya-secondary mb-6">
                  Our proprietary AI engine analyzes symptoms and medical data to provide 
                  evidence-based treatment recommendations and personalized meal plans that 
                  support your health journey.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-primary rounded-full mr-3"></div>
                    <span className="text-afya-secondary">HIPAA-compliant data processing</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-secondary rounded-full mr-3"></div>
                    <span className="text-afya-secondary">Evidence-based medical recommendations</span>
                  </div>
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                    <span className="text-afya-secondary">Continuous learning and improvement</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <Card className="afya-card p-8">
                  <div className="text-center">
                    <Brain className="h-16 w-16 text-primary mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-afya-primary mb-2">
                      AI-Powered Analysis
                    </h3>
                    <p className="text-afya-secondary mb-4">
                      Instant health insights backed by medical knowledge
                    </p>
                    <div className="flex justify-center">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}