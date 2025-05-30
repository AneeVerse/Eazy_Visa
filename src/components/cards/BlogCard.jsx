import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../../lib/sanity";

const BlogCard = ({ title, url, category, description, imageUrl, date }) => {
  return (
    <Link
      href={`/blogs/${url}`}
      className="bg-white rounded-2xl group shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
    >
      <div className="relative overflow-hidden h-48">
        <Image
          src={urlFor(imageUrl).url()}
          alt={title}
          fill
          className="object-cover group-hover:scale-110 duration-300 transition-all"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-gray-600">
            {category.toUpperCase()}
          </p>
          <p className="text-xs text-gray-500">{date}</p>
        </div>
        <h3 className="text-lg font-semibold line-clamp-2 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 mt-2 text-sm line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
