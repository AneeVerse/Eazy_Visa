// app/blog/[slug]/page.js
import { blogData } from "@/data/blogData";
import SubscribeForm from "@/components/blog/SubscribeForm";
import RelatedBlogs from "@/components/blog/RelatedBlogs";
import Newsletter from "@/components/blog/NewsLetter";
import Layout from "@/components/common/Layout";
import FeedbackReviewComponent from "@/components/home/FeedbackReviewComponent";
import MediaTestimonials from "@/components/home/MediaTestimonials";
import { Heading } from "@/components/common/Typography";

export async function generateStaticParams() {
  return blogData.map((blog) => ({
    slug: blog.url,
  }));
}

const BlogDetailsPage = ({ params }) => {
  const { slug } = params;
  const blog = blogData.find((blog) => blog.url === slug);
  console.log(blog);

  if (!blog) {
    return <div className="text-center py-20">Blog post not found</div>;
  }

  return (
    <Layout className="py-12">
      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content - Left Side */}
        <div className="lg:col-span-8 xl:col-span-9">
          {/* Blog Meta */}
          <div className="mb-8">
            {/* <Heading level={1} className="font-bold text-gray-900 mb-4">
              {blog.title}
              </Heading> */}

          {/* Featured Image */}
          <img
            src={blog.imageUrl}
            alt={blog.title}
            className="w-full h-auto max-h-96 object-cover rounded-xl mb-4"
          />

           <div className="flex items-center text-[14px] mb-3 text-gray-400">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <span>Posted on {blog.date}</span>
      </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex flex-wrap gap-3 items-center text-sm text-gray-500">
              <span className="mr-4">By {blog.author.name}</span>
              {/* <span className="mr-4">{blog.date}</span> */}
              <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                {blog.category}
              </span>
            </div>
          </div>
          {/* Blog Content */}
          <article
            className="prose blog-content max-w-none"
            dangerouslySetInnerHTML={{ __html: blog.content }}
          />
          <div className="mb-8">
            <Newsletter />
            </div>
            <FeedbackReviewComponent />
            <MediaTestimonials />

        </div>

        {/* Sidebar - Right Side */}
        <div className="lg:col-span-4 xl:col-span-3">
          <div className="sticky top-24 space-y-8">
            {/* Subscribe Form */}
            <div className="">
              <SubscribeForm />
            </div>
           {/* Author Info Card */}
<div className="bg-white px-4 py-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow duration-200">
  <div className="flex items-center space-x-4">
    <div className="relative">
      <img
        src={blog.author.profilePic}
        alt={blog.author.name}
        className="w-14 min-w-14 h-14 rounded-full object-cover border-2 border-white shadow-sm"
      />
      <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-white"></div>
    </div>
    <div>
      <h4 className="text-lg font-semibold text-gray-800">{blog.author.name}</h4>
      <p className="text-[12px] text-gray-500 mb-1">{blog.author.bio}</p>
      <div className="flex items-center text-xs text-gray-400">
        <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
        <span>Posted on {blog.date}</span>
      </div>
    </div>
  </div>
  {blog.author.socialLinks && (
    <div className="mt-4 flex space-x-3">
      {blog.author.socialLinks.twitter && (
        <a href={blog.author.socialLinks.twitter} className="text-gray-400 hover:text-blue-400 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
          </svg>
        </a>
      )}
      {blog.author.socialLinks.linkedin && (
        <a href={blog.author.socialLinks.linkedin} className="text-gray-400 hover:text-blue-600 transition-colors">
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
          </svg>
        </a>
      )}
    </div>
  )}
</div>


            {/* Related Blogs */}
            <div className="">
              <RelatedBlogs currentBlogSlug={slug} />
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default BlogDetailsPage;