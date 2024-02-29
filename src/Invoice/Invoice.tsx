import { TailSpin } from "react-loader-spinner";
import Container from "../components/Container";
import { useParams } from "react-router-dom";
import { useSingleSellHistoryQuery } from "../redux/api/baseApi";
import jsPDF from "jspdf";

const Invoice = () => {
  const { id } = useParams();
  const { data, isLoading } = useSingleSellHistoryQuery(id);

  //   console.log(data);

  const handleDownload = () => {
    // Create a new PDF document
    const pdfDoc = new jsPDF();
    const lines = [
      `Date: ${data?.data?.dateOfSelling}`,
      `Buyer Name: ${data?.data?.buyerName}`,
      `Seller Name: ${data?.data?.seller}`,
      `Product Name: ${data?.data?.productName}`,
      `Quantity: ${data?.data?.quantity}`,
      `Total Price: ${data?.data?.totalPrice}`,
      `Discount: ${data?.data?.discount}`,
      `Final Price: ${data?.data?.finalPrice}`,
    ];
    // Set the starting position for the text
    let yPos = 30;

    pdfDoc.text("INVOICE", 100, 10, { align: "center" });

    // Add each line to the PDF
    lines.forEach((line) => {
      pdfDoc.text(line, 10, yPos);
      yPos += 10; // Increment Y position for the next line
    });

    // Save the PDF to a file
    pdfDoc.save("invoice.pdf");
  };

  return (
    <div>
      <Container>
        <h1 className="text-center font-semibold text-4xl py-4 badge-neutral my-3 rounded-xl">
          Invoice
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
          <div className="bg-base-200 p-10">
            <div className="flex justify-end">
              <button onClick={handleDownload} className="btn btn-neutral">
                Download Invoice
              </button>
            </div>

            <h3 id="hi" className="text-lg font-semibold mt-2">
              Date: {data?.data?.dateOfSelling}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Buyer Name : {data?.data?.buyerName}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Seller Name : {data?.data?.seller}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Product Name : {data?.data?.productName}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Quantity : {data?.data?.quantity}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Total Price : {data?.data?.totalPrice}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Discount : {data?.data?.discount}
            </h3>
            <h3 className="text-lg font-semibold mt-2">
              Final Price : {data?.data?.finalPrice}
            </h3>
          </div>
        )}
      </Container>
    </div>
  );
};

export default Invoice;
