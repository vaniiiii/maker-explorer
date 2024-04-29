import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Header() {
  return (
    <header className="bg-gray-400 h-20 p-4 flex items-center justify-between">
      <div className="flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-6 h-6"
          aria-label="Logo"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
          />
        </svg>
        <p className="font-semibold text-xl md:text-2xl ml-2">Maker Explorer</p>
      </div>
      <nav className="md:gap-8 gap-4 flex items-center">
        <p className="text-xl">Vaults</p>
        <ConnectButton />
      </nav>
    </header>
  );
}
