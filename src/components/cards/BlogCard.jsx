import Image from "next/image";
import Link from "next/link";

const BlogCard = ({ title, url, category, description, imageUrl }) => {
  return (
    <Link
      href={`/blogs/${url}`}
      className="bg-white rounded-2xl group shadow-md overflow-hidden"
    >
        <div className="relative overflow-hidden">
      <Image
        src={`http://13.232.203.138:1337${imageUrl.url}`}
        alt={title}
        width={400}
        height={250}
        className="w-full group-hover:scale-110 duration-300 transition-all group-active:scale-110 h-48 object-cover"
      />

        </div>
      <div className="p-4">
        <p className="text-sm font-semibold text-gray-600">
          {category.toUpperCase()}
        </p>
        <h3 className="text-lg font-semibold mt-1">{title}</h3>
        <p className="text-gray-500 mt-2 text-sm">{description}</p>
      </div>
    </Link>
  );
};

export default BlogCard;
