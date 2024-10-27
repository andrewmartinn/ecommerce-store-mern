import { assets } from "../assets/ui-assets/data";
import SectionHeader from "../components/SectionHeader";

const About: React.FC = () => {
  return (
    <section>
      <div className="border-t pt-8 text-center text-2xl">
        <SectionHeader primaryTitle="About" accentTitle="Us" />
      </div>
      <div className="my-10 flex flex-col gap-16 md:flex-row">
        <img
          src={assets.about_img}
          alt="about image"
          className="w-full md:max-w-[450px]"
        />
        <div className="flex flex-col justify-center gap-6 text-gray-600 md:w-2/4">
          <p>
            At Revive, we believe in the power of fashion to transform lives.
            Our journey began with a mission to provide stylish, high-quality
            apparel that is accessible to everyone. We are committed to
            sustainability and ethical practices, ensuring that our products not
            only look good but also feel good.
          </p>
          <p>
            Our carefully curated collections offer a blend of contemporary
            trends and timeless classics, catering to diverse tastes and
            lifestyles. From everyday essentials to standout pieces, Revive is
            here to inspire your personal style while promoting confidence and
            self-expression.
          </p>
          <b className="text-gray-800">Our Mission</b>
          <p>
            Revive aims to empower individuals through fashion that resonates
            with their values. We strive to create a community where style meets
            responsibility, providing our customers with a platform to express
            themselves authentically. Join us in making a positive impact, one
            outfit at a time.
          </p>
        </div>
      </div>
      <div className="py-4 text-xl">
        <SectionHeader primaryTitle="Why" accentTitle="Choose Us" />
      </div>
      <div className="mb-20 flex flex-col text-sm md:flex-row">
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Quality Assurance:</b>
          <p className="text-gray-600">
            At Revive, quality is our top priority. We rigorously test our
            products to ensure they meet the highest standards of durability and
            style. You can trust that every piece you purchase will stand the
            test of time while looking fantastic.
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Convenience:</b>
          <p className="text-gray-600">
            Shopping with Revive is designed to be seamless. Our intuitive
            website allows you to explore our collections easily, and we offer
            fast shipping options to get your favorites delivered right to your
            door, hassle-free.
          </p>
        </div>
        <div className="flex flex-col gap-5 border px-10 py-8 sm:py-20 md:px-16">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600">
            Our commitment to customer satisfaction sets us apart. The Revive
            team is always ready to assist you with inquiries, provide styling
            advice, or handle any issues with your orders. Your experience
            matters to us, and we’re here to help every step of the way.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
