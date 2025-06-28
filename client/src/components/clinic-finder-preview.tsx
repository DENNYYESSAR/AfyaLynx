import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { MapPin, Search, Star, Clock, ArrowRight, Plus, Minus, Target } from "lucide-react";

export default function ClinicFinderPreview() {
  const [searchLocation, setSearchLocation] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");

  const sampleClinics = [
    {
      id: 1,
      name: "Central Medical Center",
      address: "123 Main St, Downtown",
      distance: "0.5 miles",
      rating: 4.5,
      reviewCount: 127,
      waitTime: 15,
      status: "Open",
      statusColor: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      name: "Westside Family Clinic",
      address: "456 Oak Ave, Westside",
      distance: "1.2 miles",
      rating: 4.2,
      reviewCount: 89,
      waitTime: 45,
      status: "Busy",
      statusColor: "bg-yellow-100 text-yellow-800",
    },
  ];

  return (
    <section className="py-20 bg-afya-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-afya-primary mb-4">
            Find Healthcare Near You
          </h2>
          <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
            Discover nearby clinics and hospitals with real-time availability, reviews, and direct booking options.
          </p>
        </div>

        <Card className="overflow-hidden afya-shadow">
          <div className="grid lg:grid-cols-2">
            {/* Search Interface */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-afya-primary mb-6">Search Healthcare Facilities</h3>
              
              {/* Search Form */}
              <div className="space-y-4 mb-8">
                <div>
                  <Label htmlFor="location" className="text-sm font-medium text-afya-primary mb-2">
                    Location
                  </Label>
                  <div className="relative">
                    <Input
                      id="location"
                      placeholder="Enter your city or postal code"
                      value={searchLocation}
                      onChange={(e) => setSearchLocation(e.target.value)}
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-afya-secondary h-4 w-4" />
                  </div>
                </div>
                
                <div>
                  <Label className="text-sm font-medium text-afya-primary mb-2">
                    Specialty
                  </Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Specialties</SelectItem>
                      <SelectItem value="general">General Practice</SelectItem>
                      <SelectItem value="cardiology">Cardiology</SelectItem>
                      <SelectItem value="dermatology">Dermatology</SelectItem>
                      <SelectItem value="pediatrics">Pediatrics</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex space-x-4">
                  <Button className="afya-btn-primary flex-1">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline" className="px-6">
                    Clear
                  </Button>
                </div>
              </div>

              {/* Sample Results */}
              <div className="space-y-4">
                <h4 className="font-semibold text-afya-primary">
                  Nearby Clinics <span className="text-afya-secondary font-normal">(2 found)</span>
                </h4>
                
                {sampleClinics.map((clinic) => (
                  <Card key={clinic.id} className="border hover:shadow-md transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h5 className="font-medium text-afya-primary">{clinic.name}</h5>
                        <Badge className={clinic.statusColor}>{clinic.status}</Badge>
                      </div>
                      <p className="text-sm text-afya-secondary mb-2">
                        {clinic.address} • {clinic.distance}
                      </p>
                      <div className="flex items-center mb-3">
                        <div className="flex text-yellow-400 text-sm">
                          {[...Array(Math.floor(clinic.rating))].map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-current" />
                          ))}
                          {clinic.rating % 1 !== 0 && (
                            <Star className="h-4 w-4 fill-current opacity-50" />
                          )}
                        </div>
                        <span className="ml-2 text-sm text-afya-secondary">
                          {clinic.rating} ({clinic.reviewCount} reviews)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-afya-secondary flex items-center">
                          <Clock className="h-4 w-4 mr-1" />
                          Wait time: ~{clinic.waitTime} mins
                        </span>
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary/80">
                          View Details <ArrowRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Map Preview */}
            <div className="bg-afya-light p-8 lg:p-0 relative">
              <div className="h-full min-h-96 rounded-lg lg:rounded-none lg:rounded-r-2xl overflow-hidden relative bg-gradient-to-br from-blue-100 to-green-100">
                {/* Map overlay */}
                <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
                
                {/* Sample map pins */}
                <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                  <div className="bg-primary text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="bg-white text-afya-primary text-xs px-2 py-1 rounded shadow-lg mt-1 min-w-max">
                    Central Medical
                  </div>
                </div>
                
                <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                  <div className="bg-secondary text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div className="bg-white text-afya-primary text-xs px-2 py-1 rounded shadow-lg mt-1 min-w-max">
                    Westside Clinic
                  </div>
                </div>

                {/* Map controls */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2">
                  <Button size="sm" variant="secondary" className="p-2">
                    <Plus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="p-2">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="p-2">
                    <Target className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
