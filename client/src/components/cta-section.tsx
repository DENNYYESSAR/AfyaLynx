import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { UserPlus, Phone } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl lg:text-4xl font-bold mb-6">
          Ready to Take Control of Your Health?
        </h2>
        <p className="text-xl mb-8 opacity-90">
          Join thousands of users who trust AfyaLynx for their healthcare needs. Get started with AI-powered health insights today.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/auth">
            <Button className="bg-white text-primary hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              <UserPlus className="mr-2 h-5 w-5" />
              Get Started Free
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" className="border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-lg text-lg font-semibold transition-colors">
              <Phone className="mr-2 h-5 w-5" />
              Contact Sales
            </Button>
          </Link>
        </div>
        <p className="text-sm mt-6 opacity-75">
          No credit card required • Free forever plan available • HIPAA compliant
        </p>
      </div>
    </section>
  );
}
