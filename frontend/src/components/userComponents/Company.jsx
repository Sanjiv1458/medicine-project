import { Helmet } from 'react-helmet';
import BrandingSection from '../../components/userComponents/BrandingSection';
import CompanySection from '../../components/userComponents/CompanySection';
import AboutProduct from '../../components/userComponents/AboutProduct';
import PosterSection from '../../components/userComponents/PosterSection';
import FAQSection from '../../components/userComponents/FAQSection';
import MissionSection from '../../components/userComponents/MissionSection';

const Company = () => {
  return (
    <>
      <Helmet>
        <title>PharmaCare - Innovative Pharmaceuticals</title>
        <meta
          name="description"
          content="PharmaCare is your trusted partner for innovative pharmaceuticals. Explore our wide range of high-quality medicines available for wholesale and distribution to medical drug stores. Learn about our mission, values, and commitment to delivering excellence in the pharmaceutical industry."
        />
      </Helmet>

      <AboutProduct />
      <PosterSection />
      <BrandingSection />
      <MissionSection />
      <FAQSection />
      <CompanySection />
    </>
  );
};

export default Company;
