export default function LoadingUi() {
  return (
    <div className="max-w-5xl mx-auto my-0">
      <div className="animate-pulse">
        <div className="h-3 bg-gray-500/70 w-16 mx-auto my-0 rounded-lg mb-2"></div>
        <div className="h-16 bg-gray-500/70 max-w-5xl mx-auto my-0 rounded-lg mb-8"></div>
        <div className="max-w-xl mx-auto my-0">
          <div className="h-6 bg-gray-500/70 mx-auto rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-500/70 mx-auto rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-500/70 mx-auto rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-500/70 mx-auto rounded-lg mb-4"></div>
          <div className="h-6 bg-gray-500/70 mx-auto rounded-lg mb-4"></div>
        </div>
      </div>
    </div>
  );
}
