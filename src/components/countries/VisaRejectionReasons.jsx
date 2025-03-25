import { AlertCircle, Ban, DollarSign, FileX, ShieldX } from "lucide-react";
import { countryData } from "@/data/countryData"; // Ensure correct path

const ICONS = {
  passport: <FileX className="w-6 h-6 text-gray-600" />,
  money: <DollarSign className="w-6 h-6 text-gray-600" />,
  criminal: <ShieldX className="w-6 h-6 text-gray-600" />,
  warning: <AlertCircle className="w-6 h-6 text-gray-600" />,
};

export default function VisaRejectionReasons({ countryName }) {
  const country = countryData.asia.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!country) {
    return <p className="text-red-500">Country data not found.</p>;
  }

  return (
    <section className="bg-white p-6 rounded-xl shadow-sm">
      <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-2">
        Common Visa Rejection Reasons for {country.name}
      </h2>
      <ul className="space-y-5">
        {country.rejectionReasons.map((reason, index) => (
          <li key={index} className="flex items-start gap-4">
            {ICONS[reason.icon] || <Ban className="w-6 h-6 text-gray-600" />}
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
