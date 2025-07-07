import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Link } from "wouter";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Clock, 
  Send,
  ArrowLeft,
  Heart,
  MessageSquare,
  Users,
  Building2,
  Loader2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Contact() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    inquiryType: "",
  });

  const contactMutation = useMutation({
    mutationFn: async (data: typeof formData) => {
      // Simulate API call - in a real app, this would send to a contact endpoint
      await new Promise(resolve => setTimeout(resolve, 1000));
      return data;
    },
    onSuccess: () => {
      toast({
        title: "Message sent successfully!",
        description: "We'll get back to you within 24 hours.",
      });
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
        inquiryType: "",
      });
    },
    onError: () => {
      toast({
        title: "Failed to send message",
        description: "Please try again later or contact us directly.",
        variant: "destructive",
      });
    },
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      toast({
        title: "Missing required fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    contactMutation.mutate(formData);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: "Phone",
      details: "+1 (555) 123-4567",
      subtitle: "Mon-Fri 9AM-6PM EST",
    },
    {
      icon: Mail,
      title: "Email",
      details: "hello@afyalynx.com",
      subtitle: "We respond within 24 hours",
    },
    {
      icon: MapPin,
      title: "Address",
      details: "123 Healthcare Ave, Medical District",
      subtitle: "San Francisco, CA 94105",
    },
    {
      icon: Clock,
      title: "Business Hours",
      details: "Monday - Friday",
      subtitle: "9:00 AM - 6:00 PM EST",
    },
  ];

  const inquiryTypes = [
    "General Question",
    "Technical Support",
    "Partnership Inquiry",
    "Media & Press",
    "Clinic Registration",
    "Patient Support",
    "Bug Report",
    "Feature Request",
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
              <MessageSquare className="h-12 w-12 text-primary mr-4" />
              <h1 className="text-4xl lg:text-5xl font-bold text-afya-primary">
                Get in Touch
              </h1>
            </div>
            <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
              Have questions about AfyaLynx? We're here to help. Reach out to our team 
              for support, partnerships, or general inquiries.
            </p>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div>
                <Card className="afya-card">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Send className="h-5 w-5 text-primary" />
                      Send us a Message
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="name">Full Name *</Label>
                          <Input
                            id="name"
                            value={formData.name}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="email">Email Address *</Label>
                          <Input
                            id="email"
                            type="email"
                            value={formData.email}
                            onChange={(e) => handleInputChange("email", e.target.value)}
                            placeholder="your.email@example.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="inquiryType">Inquiry Type</Label>
                        <Select 
                          value={formData.inquiryType} 
                          onValueChange={(value) => handleInputChange("inquiryType", value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select inquiry type" />
                          </SelectTrigger>
                          <SelectContent>
                            {inquiryTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => handleInputChange("subject", e.target.value)}
                          placeholder="Brief subject line"
                        />
                      </div>

                      <div>
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          value={formData.message}
                          onChange={(e) => handleInputChange("message", e.target.value)}
                          placeholder="Tell us how we can help you..."
                          className="min-h-[120px]"
                          required
                        />
                      </div>

                      <Button 
                        type="submit" 
                        className="w-full afya-btn-primary"
                        disabled={contactMutation.isPending}
                      >
                        {contactMutation.isPending ? (
                          <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send className="mr-2 h-4 w-4" />
                            Send Message
                          </>
                        )}
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>

              {/* Contact Information */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-afya-primary mb-4">
                    Contact Information
                  </h2>
                  <p className="text-afya-secondary mb-8">
                    We're here to help and answer any questions you might have. 
                    We look forward to hearing from you.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="afya-card">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="bg-primary text-white p-3 rounded-lg">
                            <info.icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-afya-primary mb-1">
                              {info.title}
                            </h3>
                            <p className="text-afya-primary font-medium">{info.details}</p>
                            <p className="text-sm text-afya-secondary">{info.subtitle}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Quick Links */}
                <Card className="afya-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-afya-primary mb-4">Quick Links</h3>
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 text-primary mr-3" />
                        <span className="text-afya-secondary">Patient Support Center</span>
                      </div>
                      <div className="flex items-center">
                        <Building2 className="h-4 w-4 text-secondary mr-3" />
                        <span className="text-afya-secondary">Healthcare Provider Portal</span>
                      </div>
                      <div className="flex items-center">
                        <Heart className="h-4 w-4 text-red-500 mr-3" />
                        <span className="text-afya-secondary">Emergency Resources</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-afya-light">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-afya-primary mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-xl text-afya-secondary">
                Quick answers to common questions about AfyaLynx
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  question: "How accurate are the AI health recommendations?",
                  answer: "Our AI provides evidence-based suggestions based on medical research and best practices. However, all recommendations should be discussed with qualified healthcare professionals for proper diagnosis and treatment."
                },
                {
                  question: "Is my health data secure on AfyaLynx?",
                  answer: "Yes, we are HIPAA compliant and use industry-standard encryption to protect all user data. Your privacy and security are our top priorities."
                },
                {
                  question: "How do I register my clinic on the platform?",
                  answer: "Healthcare providers can register by creating an account and selecting 'Healthcare Provider' during signup. After verification, you can create your clinic profile and manage availability."
                },
                {
                  question: "Is AfyaLynx free to use?",
                  answer: "Yes, basic features including AI health assessments and clinic finding are free. We also offer premium features for enhanced functionality."
                },
              ].map((faq, index) => (
                <Card key={index} className="afya-card">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-afya-primary mb-2">{faq.question}</h3>
                    <p className="text-afya-secondary">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}