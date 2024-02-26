import Lottie from "lottie-react";
import animation from "./../../assets/homeanimation.json";
import Container from "../../components/Container";

const Home = () => {
  return (
    <div>
      <Container>
        <h1 className="text-center bg-neutral-content text-3xl font-semibold py-3 my-10  rounded-lg">
          Welcome to Gift Shop Dashboard
        </h1>
        <div className="w-auto lg:px-64">
          <Lottie autoplay={true} loop={true} animationData={animation} />
        </div>
      </Container>
    </div>
  );
};

export default Home;
