/* eslint-disable @typescript-eslint/no-explicit-any */
import { TailSpin } from "react-loader-spinner";
import Container from "../../components/Container";
import {
  useAddCouponMutation,
  useGetAllCouponQuery,
} from "../../redux/api/baseApi";
import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/hooks";

const Coupon = () => {
  const { data, isLoading } = useGetAllCouponQuery(undefined);
  const [couponAdd, { isLoading: addCouponLoading }] = useAddCouponMutation();
  const { user } = useAppSelector((state) => state.auth);

  // console.log(user);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <TailSpin
          visible={true}
          height="80"
          width="80"
          color="#2B3440"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  }

  const handleCouponAdd = async (e: any) => {
    e.preventDefault();
    const couponData = {
      coupon: e.target.coupon.value,
      amount: Number(e.target.discount.value),
      manager: user?.username,
    };

    // console.log(couponData);

    const response: any = await couponAdd(couponData);
    if (!response?.error) {
      toast.success("Coupon Add Successfull");
    } else {
      toast.error(response?.error?.data?.message);
    }

    e.target.reset();
  };

  return (
    <div>
      <Container>
        <h1 className="text-center font-semibold text-4xl py-4 badge-neutral my-3 rounded-xl">
          All Coupon
        </h1>

        <div>
          <form
            className="lg:flex space-y-2 lg:space-y-0 lg:p-0 items-center gap-2 p-2"
            onSubmit={handleCouponAdd}
          >
            <input
              type="text"
              required
              placeholder="coupon"
              className="input input-bordered w-full 
                  "
              name="coupon"
            />
            <input
              type="number"
              required
              placeholder="discount amount"
              className="input input-bordered w-full "
              name="discount"
            />
            <button
              disabled={addCouponLoading}
              className="btn btn-neutral"
              type="submit"
            >
              Add coupon
            </button>
          </form>
        </div>

        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Coupon</th>
                <th>Amount</th>
                <th>Manager</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: any) => (
                <tr key={item._id}>
                  <td>{item.coupon}</td>
                  <td>{item.amount} $</td>
                  <td>{item.manager}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default Coupon;
