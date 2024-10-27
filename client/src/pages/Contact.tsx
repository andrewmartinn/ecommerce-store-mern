import { assets } from "../assets/ui-assets/data";
import SectionHeader from "../components/SectionHeader";

const Contact: React.FC = () => {
  return (
    <section>
      <div className="border-t pt-10 text-center text-2xl">
        <SectionHeader primaryTitle="Contact" accentTitle="Us" />
      </div>
      <div className="my-10 mb-28 flex flex-col justify-center gap-10 md:flex-row">
        <img
          src={assets.contact_img}
          alt="contact us section image"
          className="w-full md:max-w-[480px]"
        />
        <div className="flex flex-col items-start justify-center gap-6">
          <p className="text-xl font-semibold text-gray-600">Our Store</p>
          <p className="text-gray-500">123 Fashion St, Style City, CA 90210</p>
          <p className="text-gray-500">
            Phone: (123) 456-7890 <br /> Email: support@revivefashion.com{" "}
          </p>
          <p className="text-xl font-semibold text-gray-600">
            Careers at Revive
          </p>
          <p className="text-gray-500">
            Learn more about our teams and available openings
          </p>
          <button className="border border-black px-8 py-4 text-sm transition-all duration-500 hover:bg-black hover:text-white">
            Explore Jobs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
