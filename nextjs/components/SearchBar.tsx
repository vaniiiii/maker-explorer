export default function SearchBar() {
  return (
    <div className="p-10 text-2xl">
      <input
        type="text"
        placeholder="Search"
        className="h-20 md:text-4xl text-3xl text-white placeholder-white placeholder-opacity-50 bg-black bg-opacity-20 outline-none border-0 rounded-full transition-all duration-200 ease-in-out appearance-none block text-center"
      ></input>
    </div>
  );
}
