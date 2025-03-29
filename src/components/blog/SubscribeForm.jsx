import Image from "next/image";

const SubscribeForm = () => {
  return (
    <div className="bg-[#18322f] text-white rounded-2xl shadow-md">
      <Image
        src="https://images.unsplash.com/photo-1601342550031-d6df73676153?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Newsletter"
        width={100}
        height={100}
        layout="responsive"
        className="mx-auto rounded-t-2xl"
      />
      <div className="p-5 ">
        <h3 className="text-xl font-semibold">Subscribe now!</h3>
        <p className="text-[12px] text-gray-300 mt-1">
          Enter your email address below and subscribe to our newsletter
        </p>
        <div className="mt-4">
          <input
            type="text"
            placeholder="Your name"
            className="w-full px-3 py-2 rounded-lg bg-[#204841] text-white border-none focus:outline-none"
          />
          <input
            type="email"
            placeholder="Your email *"
            className="w-full px-3 py-2 mt-2 rounded-lg bg-[#204841] text-white border-none focus:outline-none"
          />
          <button className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded-lg">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscribeForm;
