/* eslint-disable @typescript-eslint/no-explicit-any */
import { TailSpin } from "react-loader-spinner";
import Container from "../../components/Container";
import { useSellHistoryQuery } from "../../redux/api/baseApi";
import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";

export type TSalesHistory = {
  _id: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  buyerName: string;
  dateOfSelling: string;
};
export type TSalesHistories = TSalesHistory[];

const SellHistory = () => {
  const { data, isLoading } = useSellHistoryQuery(undefined);
  // !isLoading && console.log(data);
  const allSales: TSalesHistories = data?.data;
  const [filteredSales, setFilteredSales] = useState<TSalesHistories>([]);

  useEffect(() => {
    if (allSales) {
      setFilteredSales(allSales);
    }
  }, [allSales]);
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

  const handleFilterChange = (value: string | undefined) => {
    const filter = value;
    const now = new Date();

    if (filter === "daily") {
      const todaySales = allSales.filter((sale) => {
        const saleDate = new Date(sale.dateOfSelling);
        return (
          saleDate.getDate() === now.getDate() &&
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      });
      setFilteredSales(todaySales);
    } else if (filter === "weekly") {
      const weekSales = allSales.filter((sale) => {
        const saleDate = new Date(sale.dateOfSelling);
        // get the start of the week
        const startOfWeek = now.getDate() - now.getDay();
        const endOfWeek = startOfWeek + 6; // last day is the first day + 6
        return (
          saleDate.getDate() >= startOfWeek &&
          saleDate.getDate() <= endOfWeek &&
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      });
      setFilteredSales(weekSales);
    } else if (filter === "monthly") {
      const thisMonthSales = allSales.filter((sale) => {
        const saleDate = new Date(sale.dateOfSelling);
        return (
          saleDate.getMonth() === now.getMonth() &&
          saleDate.getFullYear() === now.getFullYear()
        );
      });
      setFilteredSales(thisMonthSales);
    } else {
      setFilteredSales(allSales);
    }
  };
  return (
    <div>
      <Container>
        <h1 className="text-center font-semibold text-4xl py-4 badge-neutral my-3 rounded-xl">
          Selling History
        </h1>
        <div className="flex justify-end">
          <select
            onChange={(event) => handleFilterChange(event.target.value)}
            className="select  select-bordered"
          >
            <option value="all">All</option>
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            {/* head */}
            <thead>
              <tr>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Buyer Name</th>
                <th>Final Price</th>
                <th>Date</th>
                <th>Invoice</th>
              </tr>
            </thead>
            <tbody>
              {filteredSales?.map((item: any) => (
                <tr key={item._id}>
                  <td>{item.productName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.buyerName}</td>
                  <td>{item.finalPrice}</td>
                  <td>{item.dateOfSelling}</td>
                  <td><NavLink to={`/sell-history/invoice/${item._id}`} className="btn btn-sm btn-neutral
                  ">View Invoice</NavLink></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </div>
  );
};

export default SellHistory;
