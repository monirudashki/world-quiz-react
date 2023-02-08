import { Outlet } from "react-router-dom";

import { Suspense } from 'react';
import { Spinner } from "../../shared/Spinner.js/Spinner";

function AdminHome() {
    return (
        <>
            <Suspense fallback={<Spinner />}>
                <Outlet />
            </Suspense>
        </>
    )
}

export default AdminHome;

//TODO create better admin home page