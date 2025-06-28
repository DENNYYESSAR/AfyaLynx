import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, ArrowRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function BlogPreview() {
  const { data: blogPosts, isLoading } = useQuery({
    queryKey: ["/api/blog?published=true"],
  });

  if (isLoading) {
    return (
      <section className="py-20 bg-afya-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <Skeleton className="h-12 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="w-full h-48" />
                <CardContent className="p-6">
                  <Skeleton className="h-6 w-full mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <div className="flex items-center">
                    <Skeleton className="h-8 w-8 rounded-full mr-3" />
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
    <section className="py-20 bg-afya-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-afya-primary mb-4">
            Health Education & Insights
          </h2>
          <p className="text-xl text-afya-secondary max-w-3xl mx-auto">
            Stay informed with expert articles, health tips, and wellness guidance from our medical professionals.
          </p>
        </div>

        {blogPosts && blogPosts.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(0, 3).map((post: any) => (
                <article key={post.id} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                  {post.featuredImage && (
                    <img 
                      src={post.featuredImage} 
                      alt={post.title}
                      className="w-full h-48 object-cover" 
                    />
                  )}
                  <CardContent className="p-6">
                    <div className="flex items-center mb-3">
                      <Badge variant="secondary" className="mr-2">
                        {post.category}
                      </Badge>
                      <span className="text-sm text-afya-secondary flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        {post.readTime} min read
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold text-afya-primary mb-3 hover:text-primary transition-colors">
                      <Link href={`/blog/${post.slug}`}>
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-afya-secondary mb-4">
                      {post.excerpt}
                    </p>
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
                        <p className="text-xs text-afya-secondary">
                          {new Date(post.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </article>
              ))}
            </div>

            <div className="text-center mt-12">
              <Link href="/blog">
                <Button className="afya-btn-primary">
                  View All Articles <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-afya-secondary">No blog posts available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
}
