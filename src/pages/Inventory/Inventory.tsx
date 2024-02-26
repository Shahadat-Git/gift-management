/* eslint-disable @typescript-eslint/no-explicit-any */
import { TailSpin } from "react-loader-spinner";
import Container from "../../components/Container";
import {
  useDeleteManyProductMutation,
  useGetProductQuery,
} from "../../redux/api/baseApi";
import InvTable from "./InvTable";
import { useState } from "react";
import toast from "react-hot-toast";

export type TProduct = {
  brand: string;
  category: string;
  createdAt: string;
  img: string;
  material: string;
  occasion: string;
  productName: string;
  productPrice: string;
  productQuantity: number;
  theme: string;
  updatedAt: string;
  __v: number;
  _id: string;
};
export type TProducts = TProduct[];

const Inventory = () => {
  // filtering  states
  const [brand, setBrand] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [material, setMaterial] = useState<string>("");
  const [occasion, setOccasion] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [theme, setTheme] = useState<string>("");
  const { data, isLoading, isError } = useGetProductQuery({
    brand: brand,
    category: category,
    material: material,
    occasion: occasion,
    minPrice: minPrice,
    maxPrice: maxPrice,
    theme: theme,
  });
  const [multipleDelete] = useDeleteManyProductMutation();

  const [selectedData, setSelectedData] = useState([]);

  // console.log(selectedData);

  // console.log(minPrice, maxPrice, brand, category, material, occasion, theme);
  //   !isLoading && console.log(data);

  const products: TProducts = data?.data;
  // console.log(isError);

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

  const handleMultipleDelete = async () => {
    const resut: any = await multipleDelete(selectedData);
    if (resut.data.data.deletedCount) {
      toast.success("Products successfully deleted!");
      setSelectedData([]);
    }
  };

  return (
    <div>
      <Container>
        {/* filter things */}

        <h3 className="bg-neutral-content font-semibold p-3 text-center mt-10">
          Filter Product
        </h3>

        <div className="md:grid grid-cols-4 gap-2 p-2 mb-5">
          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold text-md">
                Occasion :{" "}
              </span>
            </div>
            <select
              defaultValue={"select"}
              onChange={(e) => setOccasion(e.target.value)}
              className="select select-bordered w-full"
            >
              <option disabled>select</option>
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
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={"select"}
              name="category"
              className="select select-bordered w-full"
            >
              <option disabled>select</option>
              <option value={"home decor"}>home decor</option>
              <option value={"gadgets"}>gadgets</option>
              <option value={"accessories"}>accessories</option>
            </select>
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold text-md">Theme : </span>
            </div>
            <select
              onChange={(e) => setTheme(e.target.value)}
              defaultValue={"select"}
              name="theme"
              className="select select-bordered w-full"
            >
              <option disabled>select</option>
              <option value={"vintage"}>vintage</option>
              <option value={"modern"}>modern</option>
              <option value={"romantic"}>romantic</option>
            </select>
          </label>

          <label className="form-control w-full flex-auto ">
            <div className="label">
              <span className="label-text font-semibold text-md">Brand : </span>
            </div>
            <input
              onChange={(e) => setBrand(e.target.value)}
              name="brand"
              type="text"
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
              onChange={(e) => setMaterial(e.target.value)}
              name="material"
              type="text"
              placeholder="Material"
              className="input input-bordered w-full "
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold text-md">
                Min Price :{" "}
              </span>
            </div>
            <input
              onChange={(e) => setMinPrice(Number(e.target.value))}
              type="range"
              min={0}
              max="100"
              className="range range-md"
            />
          </label>

          <label className="form-control w-full ">
            <div className="label">
              <span className="label-text font-semibold text-md">
                Max Price :{" "}
              </span>
            </div>
            <input
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              type="range"
              min={0}
              max="1000"
              className="range range-md"
            />
          </label>
        </div>

        <h1 className="text-center font-semibold text-4xl py-4 badge-neutral my-3 rounded-xl">
          Inventory
        </h1>

        <div>
          <div className="overflow-x-auto">
            <table className="table">
              <thead>
                <tr>
                  <th>
                    <label>
                      <input disabled type="checkbox" className="checkbox" />
                    </label>
                  </th>
                  <th>Product</th>
                  <th>Category</th>
                  <th>Price</th>
                  <th className="relative">
                    {" "}
                    Action{" "}
                    {selectedData.length > 0 && (
                      <button
                        onClick={handleMultipleDelete}
                        className="btn btn-neutral btn-sm md:absolute left-20 bottom-3"
                      >
                        Delete Selected
                      </button>
                    )}
                  </th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  !isError &&
                  data.data.map((item: any) => (
                    <InvTable
                      key={item._id}
                      product={item}
                      selectedData={selectedData}
                      setSelectedData={setSelectedData}
                    ></InvTable>
                  ))}
              </tbody>
            </table>
            {!products && isError ? (
              <p className="text-center bg-base-200 py-5 font-semibold">
                No Product found
              </p>
            ) : (
              products &&
              isError && (
                <p className="text-center bg-base-200 py-5 font-semibold">
                  No Product found
                </p>
              )
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Inventory;
