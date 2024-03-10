import { Helmet } from 'react-helmet';
// import ScrollAnimation from '../../hooks/ScrollAnimation';
import Home from './Home';

const UserHome = () => {
  return (
    <>
      <Helmet>
        <title>PharmaCare - Innovative Pharmaceuticals</title>
        <meta
          name="description"
          content="PharmaCare is your trusted partner for innovative pharmaceuticals. Explore our wide range of high-quality medicines available for wholesale and distribution to medical drug stores. Learn about our mission, values, and commitment to delivering excellence in the pharmaceutical industry."
        />
      </Helmet>
      <Home />
    </>
  );
};

export default UserHome;
