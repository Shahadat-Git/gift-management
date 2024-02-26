import { NavLink } from "react-router-dom";
import { useDeleteSingleProductMutation } from "../../redux/api/baseApi";
import toast from "react-hot-toast";

/* eslint-disable @typescript-eslint/no-explicit-any */
const InvTable = ({ product, selectedData, setSelectedData }: any) => {
  const [singleDelete] = useDeleteSingleProductMutation();

  const handleSelectedData = (e: any) => {
    const selectedId = e.target.value;
    // console.log(selectedId);
    // setSelectedData([...selectedData, selectedId]);
    const data = selectedData.find((item: string) => item == selectedId);
    if (!data) {
      setSelectedData([...selectedData, selectedId]);
    } else {
      const restData = selectedData.filter((item: string) => item != data);
      setSelectedData(restData);
    }
  };

  const handleSingleDelete = async (id: string) => {
    const result: any = await singleDelete(id);
    if (result.data.success) {
      toast.success("Successfully Deleted!");
    }
  };
  return (
    <tr>
      <th>
        <label>
          <input
            onClick={handleSelectedData}
            defaultValue={product?._id}
            type="checkbox"
            className="checkbox"
          />
        </label>
      </th>
      <td>
        <div className="flex items-center gap-3">
          <div className="avatar">
            <div className="mask mask-squircle w-12 h-12">
              <img src={product?.img} alt="Avatar Tailwind CSS Component" />
            </div>
          </div>
          <div>
            <div className="font-bold">{product?.productName}</div>
          </div>
        </div>
      </td>
      <td>
        {product?.category}
        <br />
      </td>
      <td>{product?.productPrice} $</td>
      <th className="flex flex-col gap-1">
        <NavLink
          to={`/inventory/product/${product?._id}`}
          className="btn btn-success btn-xs text-neutral font-mono"
        >
          View
        </NavLink>

        <NavLink
          to={`/add-product/${product?._id}`}
          className="btn btn-warning btn-xs text-neutral font-mono"
        >
          Create Variant
        </NavLink>
        <NavLink
          to={`/inventory/product/edit/${product?._id}`}
          className="btn btn-accent btn-xs text-neutral font-mono"
        >
          Edit
        </NavLink>
        <button
          onClick={() => handleSingleDelete(product?._id)}
          className="btn btn-error btn-xs text-neutral font-mono"
        >
          {" "}
          Delete
        </button>
      </th>
    </tr>
  );
};

export default InvTable;
