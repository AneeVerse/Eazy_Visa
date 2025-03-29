export const fetchBlogDetails = async (blogId) => {
    const res = await fetch(`/api/blogs/${blogId}`);
    return res.json();
  };
  
  export const fetchRelatedBlogs = async (currentBlogId) => {
    const res = await fetch(`/api/blogs/related?exclude=${currentBlogId}`);
    return res.json();
  };
  