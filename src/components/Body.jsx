import { RouterProvider } from "react-router-dom";
import { appRouter } from "../appRouter";

export default function Body() {
 



  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
}
