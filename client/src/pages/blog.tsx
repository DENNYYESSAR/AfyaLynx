import { useQuery } from "@tanstack/react-query";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, Search, BookOpen, Calendar, User, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "wouter";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  const { data: blogPosts, isLoading, error } = useQuery({
    queryKey: ["/api/blog?published=true"],
  });

  const categories = [
    "Health Tips",
    "Nutrition", 
    "Mental Health",
    "Exercise",
    "Disease Prevention",
    "Medical Research",
    "Wellness",
  ];

  // Filter posts based on search and category
  const filteredPosts = blogPosts?.filter((post: any) => {
    const matchesSearch = searchTerm === "" || 
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "" || selectedCategory === "all" || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  }) || [];

  return (
    <div className="min-h-screen bg-white">
      <Navigation />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Back Button */}
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" className="mb-4 text-afya-primary">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Button>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold text-afya-primary mb-4">
              Health Education & Insights
            </h1>
            <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
              Stay informed with expert articles, health tips, and wellness guidance from medical professionals.
            </p>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Search articles..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-afya-secondary h-4 w-4" />
          </div>
          
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder="All Categories" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Blog Posts Grid */}
        {isLoading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-4 w-20 mb-3" />
                  <Skeleton className="h-6 w-full mb-3" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
                    <div>
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-afya-secondary mx-auto mb-4" />
            <p className="text-red-500 mb-2">Failed to load blog posts</p>
            <p className="text-afya-secondary">Please try again later.</p>
          </div>
        ) : filteredPosts.length > 0 ? (
          <>
            <div className="mb-6">
              <p className="text-afya-secondary">
                {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''} found
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post: any) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {post.featuredImage && (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-48 object-cover" 
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-afya-secondary flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min read
                      </span>
                    </div>
                    
                    <h3 className="text-xl font-semibold text-afya-primary mb-3 hover:text-primary transition-colors line-clamp-2">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    
                    <p className="text-afya-secondary mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        {post.authorImage ? (
                          <img 
                            src={post.authorImage} 
                            alt={post.authorName}
                            className="w-8 h-8 rounded-full mr-3" 
                          />
                        ) : (
                          <div className="w-8 h-8 bg-primary rounded-full mr-3 flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">
                              {post.authorName.charAt(0)}
                            </span>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-afya-primary">{post.authorName}</p>
                          <p className="text-xs text-afya-secondary">{post.authorTitle}</p>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-xs text-afya-secondary flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <BookOpen className="h-12 w-12 text-afya-secondary mx-auto mb-4" />
            <p className="text-afya-primary font-medium mb-2">No articles found</p>
            <p className="text-afya-secondary">
              {searchTerm || selectedCategory 
                ? "Try adjusting your search criteria." 
                : "Check back soon for new health insights and articles."}
            </p>
          </div>
        )}

        {/* Featured Categories */}
        {!searchTerm && !selectedCategory && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-afya-primary mb-8 text-center">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {categories.map((category) => (
                <Card 
                  key={category} 
                  className="afya-card hover:afya-shadow cursor-pointer"
                  onClick={() => setSelectedCategory(category)}
                >
                  <CardContent className="p-4 text-center">
                    <BookOpen className="h-8 w-8 text-primary mx-auto mb-2" />
                    <h3 className="font-medium text-afya-primary">{category}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
}