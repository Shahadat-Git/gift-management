/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import Header from "../../shared/Header";
import Container from "../../components/Container";
import toast from "react-hot-toast";
import Footer from "../../shared/Footer";
import { useGetRegisterMutation } from "../../redux/features/auth/authApi";

const Register = () => {
  const [loginData] = useGetRegisterMutation();
  const navigate = useNavigate();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      name: e.target.fullname.value,
      email: e.target.email.value,
      password: e.target.password.value,
    };

    console.log(userData);

    const response: any = await loginData(userData);
    if (!response?.error) {
      toast.success("Register Successfull");
      navigate("/login");
    } else {
      toast.error(response?.error?.data?.message);
    }
  };
  return (
    <div>
      <Header></Header>

      <div className="min-h-[calc(100vh-152px)]">
        <Container>
          <div className="bg-neutral-content  p-10 my-5 lg:w-6/12 mx-auto rounded-lg">
            <h2 className="text-center text-3xl font-semibold">
              Please Register
            </h2>

            <div className="">
              <form onSubmit={handleRegister}>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold text-md">
                      User Name :{" "}
                    </span>
                  </div>
                  <input
                    name="username"
                    type="text"
                    required
                    placeholder="username"
                    className="input input-bordered w-full "
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold text-md">
                      Full Name :{" "}
                    </span>
                  </div>
                  <input
                    name="fullname"
                    type="text"
                    required
                    placeholder="fullname"
                    className="input input-bordered w-full "
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold text-md">
                      Email :{" "}
                    </span>
                  </div>
                  <input
                    name="email"
                    type="email"
                    required
                    placeholder="email"
                    className="input input-bordered w-full "
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold text-md">
                      Password :{" "}
                    </span>
                  </div>
                  <input
                    name="password"
                    type="password"
                    required
                    placeholder="password"
                    className="input input-bordered w-full "
                  />
                </label>
                <NavLink to="/Login" className="block my-3 hover:underline">
                  Already have an account ?
                </NavLink>
                <button className="btn btn-neutral" type="submit">
                  {" "}
                  Register
                </button>
              </form>
            </div>
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
};

export default Register;
