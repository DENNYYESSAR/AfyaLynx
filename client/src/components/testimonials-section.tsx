import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function TestimonialsSection() {
  const { data: testimonials, isLoading } = useQuery({
    queryKey: ["/api/testimonials?featured=true"],
  });

  const stats = [
    { value: "10,000+", label: "Active Users" },
    { value: "500+", label: "Partner Clinics" },
    { value: "50,000+", label: "AI Consultations" },
    { value: "4.9/5", label: "User Rating" },
  ];

  if (isLoading) {
    return (
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="afya-card">
                <CardContent className="pt-6">
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-20 w-full mb-6" />
                  <div className="flex items-center">
                    <Skeleton className="h-12 w-12 rounded-full mr-4" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-2" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-afya-primary mb-4">
            Trusted by Thousands of Users
          </h2>
          <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
            See what our community says about their experience with AfyaLynx.
          </p>
        </div>

        {testimonials && testimonials.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial: any) => (
              <Card key={testimonial.id} className="afya-card hover:afya-shadow">
                <CardContent className="pt-6">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-afya-secondary mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center">
                    {testimonial.image ? (
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-12 h-12 rounded-full mr-4" 
                      />
                    ) : (
                      <div className="w-12 h-12 bg-primary rounded-full mr-4 flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {testimonial.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div>
                      <h4 className="font-semibold text-afya-primary">{testimonial.name}</h4>
                      <p className="text-sm text-afya-secondary">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-afya-secondary">No testimonials available at the moment.</p>
          </div>
        )}

        {/* Stats Section */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {stats.map((stat, index) => (
            <div key={index}>
              <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
              <div className="text-afya-secondary">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
