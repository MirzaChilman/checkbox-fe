const Empty = () => {
  return (
    <div
      data-testid="empty-component"
      className="flex mx-auto w-1/3 flex-col text-center mt-10 border-2 rounded border-zinc-400 py-2"
    >
      <p className="text-xl text-gray-700">No data</p>
      <p className="text-sm text-gray-600">Please search username first</p>
    </div>
  );
};

export default Empty;
