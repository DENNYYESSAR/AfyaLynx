import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Brain, 
  Utensils, 
  Clock, 
  Heart, 
  Building2, 
  Star,
  Send,
  Loader2,
  Calendar,
  TrendingUp,
  Stethoscope
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function Dashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [symptoms, setSymptoms] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");

  const { data: healthInquiries, isLoading: inquiriesLoading } = useQuery({
    queryKey: ["/api/health-inquiries"],
  });

  const healthInquiryMutation = useMutation({
    mutationFn: async (data: { symptoms: string; additionalInfo?: string }) => {
      const response = await apiRequest("POST", "/api/health-inquiry", data);
      return response.json();
    },
    onSuccess: (inquiry) => {
      // Get AI recommendations
      predictMutation.mutate({
        symptoms,
        additionalInfo,
        inquiryId: inquiry.id,
      });
      setSymptoms("");
      setAdditionalInfo("");
    },
    onError: (error) => {
      toast({
        title: "Error creating health inquiry",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const predictMutation = useMutation({
    mutationFn: async (data: { symptoms: string; additionalInfo?: string; inquiryId: number }) => {
      const response = await apiRequest("POST", "/api/predict", data);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/health-inquiries"] });
      toast({
        title: "Analysis complete",
        description: "Your health inquiry has been processed with AI recommendations.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error getting AI recommendations",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmitSymptoms = () => {
    if (!symptoms.trim()) {
      toast({
        title: "Symptoms required",
        description: "Please describe your symptoms before submitting.",
        variant: "destructive",
      });
      return;
    }

    healthInquiryMutation.mutate({
      symptoms,
      additionalInfo: additionalInfo.trim() || undefined,
    });
  };

  const isSubmitting = healthInquiryMutation.isPending || predictMutation.isPending;

  return (
    <div className="min-h-screen bg-afya-light">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-afya-primary mb-2">
            Welcome back, {user?.username}!
          </h1>
          <p className="text-afya-secondary">
            Manage your health journey with AI-powered insights and recommendations.
          </p>
        </div>

        <Tabs defaultValue="assessment" className="space-y-6">
          <TabsList className="grid w-full grid-cols-1 md:grid-cols-3">
            <TabsTrigger value="assessment">Health Assessment</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-6">
            {/* New Health Assessment */}
            <Card className="afya-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Stethoscope className="h-5 w-5 text-primary" />
                  AI Health Assessment
                </CardTitle>
                <CardDescription>
                  Describe your symptoms to get instant AI-powered treatment suggestions and meal recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="symptoms">Symptoms *</Label>
                  <Textarea
                    id="symptoms"
                    placeholder="Describe your symptoms in detail (e.g., fever, headache, stomach pain...)"
                    value={symptoms}
                    onChange={(e) => setSymptoms(e.target.value)}
                    className="min-h-[100px]"
                  />
                </div>
                <div>
                  <Label htmlFor="additional-info">Additional Information (Optional)</Label>
                  <Textarea
                    id="additional-info"
                    placeholder="Any additional context, duration, severity, or relevant medical history..."
                    value={additionalInfo}
                    onChange={(e) => setAdditionalInfo(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleSubmitSymptoms}
                  disabled={isSubmitting || !symptoms.trim()}
                  className="afya-btn-primary"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Get AI Analysis
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="afya-card">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Heart className="h-8 w-8 text-red-500" />
                    <div>
                      <p className="text-2xl font-bold text-afya-primary">
                        {healthInquiries?.length || 0}
                      </p>
                      <p className="text-sm text-afya-secondary">Total Assessments</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="afya-card">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Brain className="h-8 w-8 text-primary" />
                    <div>
                      <p className="text-2xl font-bold text-afya-primary">
                        {healthInquiries?.filter((inquiry: any) => inquiry.aiRecommendation).length || 0}
                      </p>
                      <p className="text-sm text-afya-secondary">AI Recommendations</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="afya-card">
                <CardContent className="pt-6">
                  <div className="flex items-center space-x-2">
                    <Utensils className="h-8 w-8 text-secondary" />
                    <div>
                      <p className="text-2xl font-bold text-afya-primary">
                        {healthInquiries?.filter((inquiry: any) => inquiry.mealRecommendations).length || 0}
                      </p>
                      <p className="text-sm text-afya-secondary">Meal Plans</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history" className="space-y-6">
            <Card className="afya-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Health History
                </CardTitle>
                <CardDescription>
                  Review your past health assessments and AI recommendations.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {inquiriesLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <Loader2 className="h-8 w-8 animate-spin text-primary" />
                  </div>
                ) : healthInquiries && healthInquiries.length > 0 ? (
                  <div className="space-y-6">
                    {healthInquiries.map((inquiry: any) => (
                      <div key={inquiry.id} className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold text-afya-primary">Health Assessment</h4>
                            <p className="text-sm text-afya-secondary">
                              {new Date(inquiry.createdAt).toLocaleDateString()} at{" "}
                              {new Date(inquiry.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                          <Badge variant="outline">
                            {inquiry.aiRecommendation ? "Analyzed" : "Pending"}
                          </Badge>
                        </div>
                        
                        <div className="space-y-3">
                          <div>
                            <h5 className="font-medium text-afya-primary mb-1">Symptoms:</h5>
                            <p className="text-afya-secondary">{inquiry.symptoms}</p>
                          </div>
                          
                          {inquiry.additionalInfo && (
                            <div>
                              <h5 className="font-medium text-afya-primary mb-1">Additional Info:</h5>
                              <p className="text-afya-secondary">{inquiry.additionalInfo}</p>
                            </div>
                          )}
                          
                          {inquiry.aiRecommendation && (
                            <>
                              <Separator />
                              <div>
                                <h5 className="font-medium text-afya-primary mb-1 flex items-center gap-2">
                                  <Brain className="h-4 w-4" />
                                  AI Treatment Recommendation:
                                </h5>
                                <p className="text-afya-secondary">{inquiry.aiRecommendation}</p>
                              </div>
                            </>
                          )}
                          
                          {inquiry.mealRecommendations && (
                            <div>
                              <h5 className="font-medium text-afya-primary mb-2 flex items-center gap-2">
                                <Utensils className="h-4 w-4" />
                                Recommended Meals:
                              </h5>
                              <div className="grid gap-3">
                                {inquiry.mealRecommendations.map((meal: any, index: number) => (
                                  <div key={index} className="bg-afya-light p-3 rounded-lg">
                                    <h6 className="font-medium text-afya-primary">{meal.meal}</h6>
                                    <p className="text-sm text-afya-secondary mb-1">{meal.reason}</p>
                                    <p className="text-xs text-afya-secondary">
                                      Ingredients: {meal.ingredients.join(", ")}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-afya-secondary">No health assessments yet. Start your first assessment above!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="afya-card">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>
                  View your account information and role.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label>Username</Label>
                  <Input value={user?.username} readOnly />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input value={user?.email} readOnly />
                </div>
                <div>
                  <Label>Role</Label>
                  <Badge variant="secondary" className="mt-1">
                    {user?.role === "patient" ? "Patient" : "Healthcare Provider"}
                  </Badge>
                </div>
                <div>
                  <Label>Member Since</Label>
                  <p className="text-afya-secondary">
                    {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : "N/A"}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
      
      <Footer />
    </div>
  );
}
