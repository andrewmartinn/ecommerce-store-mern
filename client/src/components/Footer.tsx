import { assets } from "../assets/ui-assets/data";

const Footer: React.FC = () => {
  return (
    <footer>
      <div className="my-10 mt-40 flex flex-col gap-14 text-sm sm:grid sm:grid-cols-[3fr_1fr_1fr]">
        <div>
          <img
            src={assets.logo}
            alt="revive logo"
            className="mb-5 w-[110px] object-contain"
          />
          <p className="w-full text-gray-600 md:max-w-sm">
            Revive is committed to providing high-quality fashion and
            exceptional customer service. Join us on our journey to redefine
            style.
          </p>
        </div>
        <div>
          <p className="mb-5 text-xl font-medium uppercase">Company</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>Home</li>
            <li>About Us</li>
            <li>Delivery</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
        <div>
          <p className="mb-5 text-xl font-medium uppercase">Get In Touch</p>
          <ul className="flex flex-col gap-1 text-gray-600">
            <li>(123) 456-7890</li>
            <li className="underline">support@revivefashion.com</li>
            <li>123 Fashion St, Style City, CA 90210</li>
          </ul>
        </div>
      </div>
      <div>
        <hr />
        <p className="py-5 text-center text-sm">
          &copy; Revive 2024. All Rights Reserved
        </p>
      </div>
    </footer>
  );
};
export default Footer;
