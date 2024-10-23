const NewsletterSignup: React.FC = () => {
  return (
    <section className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subsribe now & get 20% off
      </p>
      <p className="mt-3 text-gray-400">
        Join our newsletter for exclusive updates, promotions, and the latest
        trends delivered right to your inbox.
      </p>
      <form className="mx-auto my-6 flex w-full items-center gap-3 border pl-3 sm:w-1/2">
        <input
          type="email"
          placeholder="Email Address"
          className="w-full outline-none sm:flex-1"
          required
        />
        <button
          type="submit"
          className="bg-black px-10 py-4 text-sm text-white"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
};
export default NewsletterSignup;
