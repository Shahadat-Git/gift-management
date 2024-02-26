/* eslint-disable @typescript-eslint/no-explicit-any */
import { NavLink, useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Header from "../../shared/Header";
import { useAppDispatch } from "../../redux/hooks";
import { authLogin } from "../../redux/features/auth/authSlice";
import toast from "react-hot-toast";
import Footer from "../../shared/Footer";
import { useGetLoginMutation } from "../../redux/features/auth/authApi";

const Login = () => {
  const dispatch = useAppDispatch();
  const [loginData, { isLoading }] = useGetLoginMutation();
  const navigate = useNavigate();

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const userData = {
      username: e.target.username.value,
      password: e.target.password.value,
    };

    const response: any = await loginData(userData);
    if (!response?.error) {
      toast.success("Login Successfull");
      dispatch(authLogin(response?.data?.data));
      navigate("/");
    } else {
      toast.error(response?.error?.data?.message);
    }
  };

  return (
    <div>
      <Header></Header>

      <Container>
        <div className="min-h-[calc(100vh-152px)]">
          <div className="bg-neutral-content  p-10 my-5 lg:w-6/12 mx-auto rounded-lg">
            <h2 className="text-center text-3xl font-semibold">Please Login</h2>

            <div className="">
              <form onSubmit={handleLogin}>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold text-md">
                      User Name :{" "}
                    </span>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="username"
                    className="input input-bordered w-full 
                  "
                    name="username"
                  />
                </label>
                <label className="form-control w-full ">
                  <div className="label">
                    <span className="label-text font-semibold text-md">
                      Password :{" "}
                    </span>
                  </div>
                  <input
                    type="password"
                    required
                    placeholder="password"
                    className="input input-bordered w-full "
                    name="password"
                  />
                </label>
                <NavLink to="/register" className="block my-3 hover:underline">
                  Don't have an account ?
                </NavLink>
                <button
                  disabled={isLoading}
                  className="btn btn-neutral"
                  type="submit"
                >
                  {" "}
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </Container>
      <Footer />
    </div>
  );
};

export default Login;
