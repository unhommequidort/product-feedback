const FullScreenLoader = () => {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default FullScreenLoader;
