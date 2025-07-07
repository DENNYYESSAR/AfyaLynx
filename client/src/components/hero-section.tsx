import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Stethoscope, Thermometer, Brain, Utensils, Check, UserCheck } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-afya-light to-white pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="text-4xl lg:text-6xl font-bold text-afya-primary leading-tight mb-6">
              AI-Powered <span className="text-primary">Healthcare</span> at Your Fingertips
            </h1>
            <p className="text-xl text-afya-secondary mb-8 leading-relaxed">
              Get instant AI-powered treatment suggestions, find nearby clinics, and receive personalized meal recommendations. Your health journey starts here.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/auth">
                <Button className="afya-btn-primary text-lg px-8 py-4">
                  <Stethoscope className="mr-2 h-5 w-5" />
                  Start Health Assessment
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="afya-btn-secondary text-lg px-8 py-4"
                onClick={() => {
                  const featuresSection = document.getElementById('features');
                  if (featuresSection) {
                    featuresSection.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Explore Features
              </Button>
            </div>
            
            {/* Social Proof */}
            <div className="mt-12 flex items-center space-x-8">
              <div className="flex items-center">
                <div className="flex -space-x-2">
                  <div className="w-8 h-8 bg-primary rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-white">JS</span>
                  </div>
                  <div className="w-8 h-8 bg-secondary rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-white">MC</span>
                  </div>
                  <div className="w-8 h-8 bg-yellow-500 rounded-full border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-bold text-white">ER</span>
                  </div>
                </div>
                <span className="ml-3 text-sm text-afya-secondary">
                  Trusted by <span className="font-semibold">10,000+</span> users
                </span>
              </div>
              <div className="flex items-center">
                <div className="flex text-yellow-400">
                  {"★".repeat(5)}
                </div>
                <span className="ml-2 text-sm text-afya-secondary">4.9/5 rating</span>
              </div>
            </div>
          </div>
          
          {/* Dashboard Preview */}
          <div className="relative">
            <div className="relative z-10">
              <Card className="p-6 afya-shadow">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-afya-primary">Health Dashboard</h3>
                  <div className="flex space-x-1">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center p-3 bg-afya-light rounded-lg">
                    <Thermometer className="text-red-500 mr-3 h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium text-afya-primary">Current Symptoms</p>
                      <p className="text-xs text-afya-secondary">Enter symptoms for analysis</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-afya-light rounded-lg">
                    <Brain className="text-primary mr-3 h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium text-afya-primary">AI Recommendation</p>
                      <p className="text-xs text-afya-secondary">Get personalized suggestions</p>
                    </div>
                  </div>
                  <div className="flex items-center p-3 bg-afya-light rounded-lg">
                    <Utensils className="text-secondary mr-3 h-5 w-5" />
                    <div>
                      <p className="text-sm font-medium text-afya-primary">Meal Plan</p>
                      <p className="text-xs text-afya-secondary">Nutrition recommendations</p>
                    </div>
                  </div>
                </div>
              </Card>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 bg-secondary text-white p-3 rounded-full shadow-lg">
                <Check className="h-5 w-5" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-primary text-white p-3 rounded-full shadow-lg">
                <UserCheck className="h-5 w-5" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}