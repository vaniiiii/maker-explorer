import SearchBar from "@/components/SearchBar";

export default function Vaults() {
  return (
    <div className="p-10 flex flex-col justify-center items-center">
      <p className="font-bold text-4xl text-center">
        Explore Vault informations
      </p>
      <SearchBar />
    </div>
  );
}
