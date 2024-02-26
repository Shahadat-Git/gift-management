/* eslint-disable @typescript-eslint/no-explicit-any */
import { useParams } from "react-router-dom";
import Container from "../../components/Container";
import {
  useEditProductMutation,
  useGetSingleProductQuery,
} from "../../redux/api/baseApi";
import { TailSpin } from "react-loader-spinner";
import toast from "react-hot-toast";

const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetSingleProductQuery(id);
  const [editProduct] = useEditProductMutation();

  if (isLoading) {
    return (
      <div className="flex justify-center mt-10">
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
  const handleEdit = async (e: any) => {
    e.preventDefault();
    const data = {
      productName: e.target.productName.value,
      productPrice: Number(e.target.productPrice.value),
      productQuantity: Number(e.target.productQuantity.value),
      brand: e.target.brand.value,
      material: e.target.material.value,
      occasion: e.target.occasion.value,
      category: e.target.category.value,
      theme: e.target.theme.value,
      img: e.target.img.value,
    };

    const option = {
      data,
      id,
    };

    const result: any = await editProduct(option);
    if (result?.data?.success) {
      toast.success("Product edit successfully");
    }
  };
  return (
    <div>
      <Container>
        <div className="bg-neutral-content  p-10 my-5 lg:w-6/12 mx-auto rounded-lg">
          <h2 className="text-center text-3xl font-semibold">Edit Product</h2>

          <div className="">
            <form onSubmit={handleEdit} className="">
              <label className="form-control">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Product name :{" "}
                  </span>
                </div>
                <input
                  name="productName"
                  type="text"
                  defaultValue={data?.data?.productName}
                  required
                  placeholder="Product name"
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Product price :{" "}
                  </span>
                </div>
                <input
                  defaultValue={data?.data?.productPrice}
                  name="productPrice"
                  type="number"
                  required
                  placeholder="Product price"
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Product quantity :{" "}
                  </span>
                </div>
                <input
                  defaultValue={data?.data?.productQuantity}
                  name="productQuantity"
                  type="number"
                  required
                  placeholder="Product quantity"
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Brand :{" "}
                  </span>
                </div>
                <input
                  defaultValue={data?.data?.brand}
                  name="brand"
                  type="text"
                  required
                  placeholder="Brand"
                  className="input input-bordered w-full "
                />
              </label>
              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Material :{" "}
                  </span>
                </div>
                <input
                  defaultValue={data?.data?.material}
                  name="material"
                  type="text"
                  required
                  placeholder="Material"
                  className="input input-bordered w-full "
                />
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Occasion :{" "}
                  </span>
                </div>
                <select
                  defaultValue={data?.data?.occasion}
                  name="occasion"
                  className="select select-bordered w-full"
                >
                  <option value={"birthdays"}>birthdays</option>
                  <option value={"anniversaries"}>anniversaries</option>
                  <option value={"holidays"}>holidays</option>
                </select>
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Category :{" "}
                  </span>
                </div>
                <select
                  defaultValue={data?.data?.category}
                  name="category"
                  className="select select-bordered w-full"
                >
                  <option value={"home decor"}>home decor</option>
                  <option value={"gadgets"}>gadgets</option>
                  <option value={"accessories"}>accessories</option>
                </select>
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Theme :{" "}
                  </span>
                </div>
                <select
                  defaultValue={data?.data?.theme}
                  name="theme"
                  className="select select-bordered w-full"
                >
                  <option value={"vintage"}>vintage</option>
                  <option value={"modern"}>modern</option>
                  <option value={"romantic"}>romantic</option>
                </select>
              </label>

              <label className="form-control w-full ">
                <div className="label">
                  <span className="label-text font-semibold text-md">
                    Image :{" "}
                  </span>
                </div>
                <input
                  defaultValue={data?.data?.img}
                  name="img"
                  type="text"
                  required
                  placeholder="image link"
                  className="input input-bordered w-full "
                />
              </label>

              <button className="btn btn-neutral mt-5" type="submit">
                {" "}
                Edit Product
              </button>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default EditProduct;
