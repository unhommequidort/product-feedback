import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export default function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="text-center" id="error-page">
        <h1 className="opacity-95 text-slate-600 text-2xl font-bold">Oops!</h1>
        <p className="mb-12 mt-4 text-slate-600 text-xl">
          Sorry, an unexpected error has occurred.
        </p>
        <p>
          {isRouteErrorResponse(error)
            ? // note that error is type `ErrorResponse`
              error.error?.message || error.statusText
            : 'Unknown error message'}
        </p>
      </div>
    </div>
  );
}
