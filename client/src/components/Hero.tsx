import { assets } from "../assets/ui-assets/data";

const Hero: React.FC = () => {
  return (
    <section className="flex flex-col border border-gray-400 sm:flex-row">
      {/* hero content */}
      <div className="flex w-full items-center justify-center py-10 sm:w-1/2 md:py-0">
        <div className="text-primary-100">
          <div className="flex items-center gap-2">
            <div className="bg-primary-100 h-[2px] w-8 md:w-11" />
            <p className="text-sm font-medium uppercase md:text-base">
              Our Bestsellers
            </p>
          </div>
          <h1 className="font-prata text-3xl leading-relaxed sm:py-3 lg:text-5xl">
            Latest Arrivals
          </h1>
          <div className="flex items-center gap-2">
            <p className="text-sm font-semibold uppercase md:text-base">
              Shop Now
            </p>
            <div className="bg-primary-100 h-[2px] w-8 md:w-11" />
          </div>
        </div>
      </div>
      {/* hero image */}
      <img
        src={assets.hero_img}
        alt="hero image"
        className="h-fit w-full object-cover sm:h-[500px] sm:w-1/2"
      />
    </section>
  );
};

export default Hero;
