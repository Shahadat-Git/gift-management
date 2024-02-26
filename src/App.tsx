import { RouterProvider } from "react-router-dom";
import router from "./routes/router";

const App = () => {
  return (
    <div className="bg-base-300 min-h-screen">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
