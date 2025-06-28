import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Robot, 
  MapPin, 
  Utensils, 
  TrendingUp, 
  Building2, 
  BookOpen,
  ArrowRight 
} from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Robot,
      title: "AI-Powered Analysis",
      description: "Get instant treatment suggestions based on your symptoms using our advanced AI engine.",
      color: "text-primary",
      bgColor: "bg-primary",
    },
    {
      icon: MapPin,
      title: "Find Nearby Clinics",
      description: "Locate healthcare facilities near you with real-time availability and ratings.",
      color: "text-secondary",
      bgColor: "bg-secondary",
    },
    {
      icon: Utensils,
      title: "Personalized Nutrition",
      description: "Receive tailored meal recommendations based on your health condition and dietary needs.",
      color: "text-yellow-500",
      bgColor: "bg-yellow-500",
    },
    {
      icon: TrendingUp,
      title: "Health Tracking",
      description: "Monitor your health journey with comprehensive dashboards and progress tracking.",
      color: "text-purple-600",
      bgColor: "bg-purple-600",
    },
    {
      icon: Building2,
      title: "For Healthcare Providers",
      description: "Register your clinic and manage availability to connect with patients in your area.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-600",
    },
    {
      icon: BookOpen,
      title: "Health Education",
      description: "Access expert articles and health tips to stay informed about wellness and prevention.",
      color: "text-green-600",
      bgColor: "bg-green-600",
    },
  ];

  return (
    <section id="features" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-afya-primary mb-4">
            Everything You Need for Better Health
          </h2>
          <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
            Our comprehensive platform combines AI technology with local healthcare resources to provide personalized health solutions.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="afya-card hover:afya-shadow">
              <CardContent className="pt-6">
                <div className={`w-12 h-12 ${feature.bgColor} text-white rounded-lg flex items-center justify-center mb-6`}>
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-semibold text-afya-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-afya-secondary mb-4">
                  {feature.description}
                </p>
                <Button variant="ghost" className="text-primary hover:text-primary/80 p-0">
                  Learn more <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
