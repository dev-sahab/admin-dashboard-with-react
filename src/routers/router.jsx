import { createBrowserRouter } from "react-router-dom";
import privateRouter from "./privateRouter.jsx";
import publicRouter from "./publicRouter.jsx";

// create router
const router = createBrowserRouter([...privateRouter, ...publicRouter]);

// export router
export default router;
