import { assets } from "../assets/ui-assets/data";

interface Policy {
  id: number;
  title: string;
  description: string;
  image: string;
}

const policiesData: Policy[] = [
  {
    id: 1,
    title: "Hassle-Free Exchange",
    description: "Easily swap items with our hassle-free exchange policy.",
    image: assets.exchange_icon,
  },
  {
    id: 2,
    title: "7-Day Risk-Free Returns",
    description: "Return items within 7 days if you're not satisfied.",
    image: assets.quality_icon,
  },
  {
    id: 3,
    title: "24/7 Customer Support",
    description: "Get assistance anytime with our 24/7 support team.",
    image: assets.support_img,
  },
];

const Policies: React.FC = () => {
  return (
    <section className="flex flex-col justify-around gap-12 py-20 text-center text-gray-700 sm:flex-row sm:gap-2 sm:text-sm md:text-base">
      {policiesData.map((item) => (
        <div key={item.id}>
          <img src={item.image} alt={item.title} className="m-auto mb-5 w-12" />
          <p className="font-semibold">{item.title}</p>
          <p className="text-gray-400">{item.description}</p>
        </div>
      ))}
    </section>
  );
};

export default Policies;
