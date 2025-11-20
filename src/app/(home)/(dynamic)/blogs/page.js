import BlogCard from "../../../../components/cards/BlogCard";
import FormComponent from "../../../../components/common/FormComponent";
import { getAllBlogs } from "../../../../lib/sanity";

export const revalidate = 60; // Revalidate every 60 seconds

async function BlogPage() {
  const blogData = await getAllBlogs();

  if (!blogData || blogData.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl">No blog posts found</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blog Posts Column - Takes 3/4 width on large screens */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                url={post.slug.current}
                category={post.categories?.[0]?.title}
                description={post.excerpt}
                imageUrl={post.mainImage}
                date={new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              />
            ))}
          </div>
        </div>

        {/* Consultation Form Column */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 h-fit">
            <FormComponent />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogPage;
