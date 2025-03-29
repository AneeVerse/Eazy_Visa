
import BlogCard from "@/components/cards/BlogCard";
import SubscribeForm from "@/components/blog/SubscribeForm";
import { blogData } from "@/data/blogData";


const BlogPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Blog Posts Column - Takes 3/4 width on large screens */}
        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogData.map((post, index) => (
              <BlogCard key={index} {...post} />
            ))}
          </div>
        </div>

        {/* Subscribe Form Column - Takes 1/4 width on large screens */}
        <div className="lg:col-span-1">
          <div className="sticky top-24 h-fit"> {/* Adjust top value to match your navbar height */}
            <SubscribeForm />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
