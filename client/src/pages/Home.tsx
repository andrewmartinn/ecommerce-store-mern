import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollections";
import BestSeller from "../components/BestSeller";
import Policies from "../components/Policies";
import NewsletterSignup from "../components/NewsletterSignup";

const Home: React.FC = () => {
  return (
    <>
      <Hero />
      <LatestCollection />
      <BestSeller />
      <Policies />
      <NewsletterSignup />
    </>
  );
};

export default Home;
