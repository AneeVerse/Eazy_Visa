import { AlertCircle, Ban, DollarSign, FileX, ShieldX } from "lucide-react";
import { countryData } from "@/data/countryData"; // Ensure correct path

const ICONS = {
  passport: <FileX className="w-4 h-4 text-gray-600" />,
  money: <DollarSign className="w-4 h-4 text-gray-600" />,
  criminal: <ShieldX className="w-4 h-4 text-gray-600" />,
  warning: <AlertCircle className="w-4 h-4 text-gray-600" />,
};

export default function VisaRejectionReasons({ countryName , continent}) {
  const country = countryData[continent.replace(" ",  "").toLowerCase()].find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!country) {
    console.log(`Country data not found for ${countryName}`);
    return <p className="text-red-500">Country data not found.</p>;
  }

  return (
    <section className="bg-white py-6 rounded-xl ">
      <h2 className="text-3xl font-bold  text-gray-800 pb-2">
        Common Visa Rejection Reasons for {country.name}
      </h2>
      
      <div className="w-[50px] h-[2px] bg-purple-600 mb-6"/>
      <ul className="space-y-5">
        {country.rejectionReasons.map((reason, index) => (
          <li key={index} className="flex items-center gap-4">
            {ICONS[reason.icon] || <Ban className="w-4 h-4 text-gray-600" />}
            <div>
              <h3 className="text-lg font-semibold text-gray-800">
                {reason.title}
              </h3>
              <p className="text-gray-600">{reason.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
