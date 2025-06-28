import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { 
  MapPin, 
  Search, 
  Star, 
  Clock, 
  Phone, 
  Mail, 
  Building2,
  Filter,
  Plus,
  Minus,
  Target,
  Navigation as NavigationIcon
} from "lucide-react";

export default function ClinicFinder() {
  const [searchCity, setSearchCity] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [isOpenFilter, setIsOpenFilter] = useState<boolean | undefined>(undefined);

  const { data: clinics, isLoading, error } = useQuery({
    queryKey: ["/api/clinics", { city: searchCity, specialty: selectedSpecialty, isOpen: isOpenFilter }],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (searchCity) params.append("city", searchCity);
      if (selectedSpecialty) params.append("specialty", selectedSpecialty);
      if (isOpenFilter !== undefined) params.append("isOpen", isOpenFilter.toString());
      
      const response = await fetch(`/api/clinics?${params.toString()}`, {
        credentials: "include",
      });
      
      if (!response.ok) {
        throw new Error("Failed to fetch clinics");
      }
      
      return response.json();
    },
  });

  const specialties = [
    "General Practice",
    "Cardiology", 
    "Dermatology",
    "Pediatrics",
    "Orthopedics",
    "Neurology",
    "Gastroenterology",
    "Ophthalmology",
  ];

  const handleSearch = () => {
    // The query will automatically refetch when state changes
  };

  const clearFilters = () => {
    setSearchCity("");
    setSelectedSpecialty("");
    setIsOpenFilter(undefined);
  };

  return (
    <div className="min-h-screen bg-afya-light">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-afya-primary mb-4">
            Find Healthcare Near You
          </h1>
          <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
            Discover nearby clinics and hospitals with real-time availability, reviews, and contact information.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Search Sidebar */}
          <div className="lg:col-span-1">
            <Card className="afya-card sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-primary" />
                  Search Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="search-city">City or Location</Label>
                  <div className="relative">
                    <Input
                      id="search-city"
                      placeholder="Enter city name"
                      value={searchCity}
                      onChange={(e) => setSearchCity(e.target.value)}
                      className="pl-10"
                    />
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-afya-secondary h-4 w-4" />
                  </div>
                </div>

                <div>
                  <Label>Medical Specialty</Label>
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Specialties" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">All Specialties</SelectItem>
                      {specialties.map((specialty) => (
                        <SelectItem key={specialty} value={specialty}>
                          {specialty}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Availability</Label>
                  <Select 
                    value={isOpenFilter === undefined ? "" : isOpenFilter.toString()} 
                    onValueChange={(value) => setIsOpenFilter(value === "" ? undefined : value === "true")}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Any availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">Any availability</SelectItem>
                      <SelectItem value="true">Open now</SelectItem>
                      <SelectItem value="false">Closed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleSearch} className="afya-btn-primary flex-1">
                    <Search className="mr-2 h-4 w-4" />
                    Search
                  </Button>
                  <Button variant="outline" onClick={clearFilters}>
                    Clear
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div className="lg:col-span-2">
            <Card className="afya-card mb-6">
              <CardContent className="p-6">
                {/* Map Placeholder */}
                <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-lg relative overflow-hidden mb-6">
                  <div className="absolute inset-0 bg-blue-900 bg-opacity-20"></div>
                  
                  {/* Sample map pins based on search results */}
                  {clinics && clinics.length > 0 && (
                    <>
                      <div className="absolute top-1/3 left-1/3 transform -translate-x-1/2 -translate-y-1/2">
                        <div className="bg-primary text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <Building2 className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="absolute top-1/2 right-1/3 transform translate-x-1/2 -translate-y-1/2">
                        <div className="bg-secondary text-white p-2 rounded-full shadow-lg cursor-pointer hover:scale-110 transition-transform">
                          <Building2 className="h-4 w-4" />
                        </div>
                      </div>
                    </>
                  )}

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

                  <div className="absolute bottom-4 left-4 bg-white text-afya-primary px-3 py-1 rounded-lg text-sm font-medium shadow-lg">
                    <NavigationIcon className="inline h-4 w-4 mr-1" />
                    Interactive Map View
                  </div>
                </div>

                {/* Results Header */}
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-afya-primary">
                    {isLoading ? (
                      <Skeleton className="h-6 w-32" />
                    ) : error ? (
                      "Error loading clinics"
                    ) : (
                      `${clinics?.length || 0} clinics found`
                    )}
                  </h3>
                </div>
              </CardContent>
            </Card>

            {/* Clinic Results */}
            <div className="space-y-4">
              {isLoading ? (
                // Loading skeletons
                [...Array(3)].map((_, i) => (
                  <Card key={i} className="afya-card">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <Skeleton className="h-6 w-48" />
                        <Skeleton className="h-6 w-16" />
                      </div>
                      <Skeleton className="h-4 w-64 mb-2" />
                      <Skeleton className="h-4 w-32 mb-4" />
                      <Skeleton className="h-4 w-full" />
                    </CardContent>
                  </Card>
                ))
              ) : error ? (
                <Card className="afya-card">
                  <CardContent className="p-6 text-center">
                    <p className="text-red-500 mb-2">Failed to load clinics</p>
                    <p className="text-afya-secondary">Please try again later or check your connection.</p>
                  </CardContent>
                </Card>
              ) : clinics && clinics.length > 0 ? (
                clinics.map((clinic: any) => (
                  <Card key={clinic.id} className="afya-card hover:afya-shadow">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-xl font-semibold text-afya-primary mb-1">
                            {clinic.name}
                          </h4>
                          <p className="text-afya-secondary">{clinic.specialty}</p>
                        </div>
                        <Badge className={clinic.isOpen ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                          {clinic.isOpen ? "Open" : "Closed"}
                        </Badge>
                      </div>

                      <div className="space-y-2 mb-4">
                        <div className="flex items-center text-afya-secondary">
                          <MapPin className="h-4 w-4 mr-2" />
                          <span>{clinic.address}, {clinic.city}, {clinic.state} {clinic.zipCode}</span>
                        </div>
                        
                        <div className="flex items-center text-afya-secondary">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{clinic.phone}</span>
                        </div>
                        
                        <div className="flex items-center text-afya-secondary">
                          <Mail className="h-4 w-4 mr-2" />
                          <span>{clinic.email}</span>
                        </div>

                        {clinic.waitTime !== undefined && (
                          <div className="flex items-center text-afya-secondary">
                            <Clock className="h-4 w-4 mr-2" />
                            <span>Wait time: ~{clinic.waitTime} minutes</span>
                          </div>
                        )}
                      </div>

                      {clinic.rating && clinic.reviewCount > 0 && (
                        <div className="flex items-center mb-4">
                          <div className="flex text-yellow-400 mr-2">
                            {[...Array(Math.floor(clinic.rating))].map((_, i) => (
                              <Star key={i} className="h-4 w-4 fill-current" />
                            ))}
                            {clinic.rating % 1 !== 0 && (
                              <Star className="h-4 w-4 fill-current opacity-50" />
                            )}
                          </div>
                          <span className="text-afya-secondary text-sm">
                            {clinic.rating} ({clinic.reviewCount} reviews)
                          </span>
                        </div>
                      )}

                      {clinic.description && (
                        <p className="text-afya-secondary mb-4">{clinic.description}</p>
                      )}

                      <div className="flex gap-2">
                        <Button className="afya-btn-primary">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Now
                        </Button>
                        <Button variant="outline">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Card className="afya-card">
                  <CardContent className="p-6 text-center">
                    <Building2 className="h-12 w-12 text-afya-secondary mx-auto mb-4" />
                    <p className="text-afya-primary font-medium mb-2">No clinics found</p>
                    <p className="text-afya-secondary">
                      Try adjusting your search filters or search in a different area.
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
