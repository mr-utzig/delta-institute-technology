import { useRouteError } from "react-router-dom";

function ErrorRoute() {
    const error = useRouteError();

    return (
        <div className="flex items-center justify-center py-5 bg-white min-h-[100vh]">
            <div className="text-center">
                <h1 className="text-5xl mb-8">Oops!</h1>
                <p className="mb-8">Um erro inesperado aconteceu.</p>
                <p className="text-gray-400">
                    <i>{error.statusText || error.message}</i>
                </p>
            </div>
        </div>
    );
}

export default ErrorRoute;