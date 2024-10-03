import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import DefaultLayout from "./layouts/default-layout";
import History from "./pages/history";

export default function Router() {
    return (
        <Routes>
            <Route path="/" element={<DefaultLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/history" element={<History />} />
            </Route>
        </Routes>
    );
}
