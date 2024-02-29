/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetCouponQuery,
  useGetSingleProductQuery,
  useSellProductMutation,
} from "../../redux/api/baseApi";
import Container from "../../components/Container";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useAppSelector } from "../../redux/hooks";
import { useState } from "react";

const ProductView = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const [sellProduct] = useSellProductMutation();
  const navigate = useNavigate();
  const { user } = useAppSelector((state) => state.auth);
  const [coupon, setCoupon] = useState("");
  const { data: couponData, error } = useGetCouponQuery(coupon, {
    skip: !coupon,
  });

  const handleSell = async (e: any) => {
    e.preventDefault();

    if (e.target.coupon.value) {
      // console.log(couponData, error);
      if (error) {
        return toast.error("coupon not working!!");
      }
    }

    if (couponData) {
      const { data } = couponData;
      // console.log(data);
      if (data?.coupon !== e.target.coupon.value) {
        return toast.error("coupon not working!!");
      }
    }

    const data = {
      buyerName: e.target.buyerName.value,
      quantity: Number(e.target.quantity.value),
      date: e.target.date.value,
      seller: user?.username,
      coupon: e.target.coupon.value,
      discount: couponData?.data?.amount,
    };

    // console.log(data);

    const option = {
      data,
      id,
    };

    const result: any = await sellProduct(option);
    // console.log(result);
    if (result?.data?.success) {
      toast.success("Successfully sold!");
      navigate(`/sell-history/invoice/${result?.data?.data?.result?._id}`);
    }

    e.target.reset();
  };
  return (
    <div>
      <Container>
        <h1 className="text-center font-semibold text-4xl py-4 badge-neutral my-3 rounded-xl">
          Product Details
        </h1>

        {isLoading ? (
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
        ) : (
          <div className="flex justify-center mt-10">
            <div className="card bg-base-200 shadow-xl  lg:flex-row ">
              <figure>
                <img className="size-96 m-5 rounded-xl" src={data?.data?.img} />
              </figure>
              <div className="card-body">
                <h2 className="card-title text-2xl text-gray-600">
                  {data?.data?.productName}
                </h2>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Price :
                  </span>{" "}
                  {data?.data?.productPrice}$
                </p>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Stock :
                  </span>{" "}
                  {data?.data?.productQuantity}
                </p>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Category :
                  </span>{" "}
                  {data?.data?.category}
                </p>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Occasion :{" "}
                  </span>{" "}
                  {data?.data?.occasion}
                </p>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Theme :
                  </span>{" "}
                  {data?.data?.theme}
                </p>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Material :
                  </span>{" "}
                  {data?.data?.material}
                </p>
                <p className="text-lg text-neutral">
                  <span className="text-lg text-neutral font-semibold">
                    Brand :
                  </span>{" "}
                  {data?.data?.brand}
                </p>
                <div className="card-actions justify-end">
                  <button
                    disabled={user?.role !== "seller"}
                    onClick={() => {
                      const modal = document.getElementById(
                        "my_modal_3"
                      ) as HTMLDialogElement | null;
                      if (modal) {
                        modal.showModal();
                      }
                    }}
                    className="btn btn-neutral"
                  >
                    Sell
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Container>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg">Buyer info</h3>
          <form onSubmit={handleSell}>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold text-md">
                  Name of the buyer :{" "}
                </span>
              </div>
              <input
                name="buyerName"
                type="text"
                required
                placeholder="Name of the buyer"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold text-md">
                  Quantity :{" "}
                </span>
              </div>
              <input
                max={data?.data?.productQuantity}
                name="quantity"
                type="number"
                required
                placeholder="Quantity"
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
                name="date"
                type="date"
                required
                placeholder="date"
                className="input input-bordered w-full "
              />
            </label>
            <label className="form-control w-full ">
              <div className="label">
                <span className="label-text font-semibold text-md">
                  Coupon :{" "}
                </span>
              </div>

              <input
                name="coupon"
                type="text"
                placeholder="Coupon (optional)"
                className="input input-bordered w-full"
                onChange={(e) => setCoupon(e.target.value)}
              />
            </label>

            <button className="btn btn-neutral mt-3" type="submit">
              {" "}
              Submit
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default ProductView;
