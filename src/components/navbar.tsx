import logo from "@/assets/images/logo.webp";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="px-[5%] h-14 flex items-center">
      <Link className="flex items-center justify-center gap-1" href="/">
        <span>
          <Image src={logo} alt="logo" className="size-6 md:size-8" />
        </span>
        <h4 className="font-medium sm:font-semibold text-base sm:text-2xl">
          ChromaMatch
        </h4>
      </Link>
      <nav className="ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-sm md:text-base font-medium hover:underline underline-offset-4"
          href="/#features"
        >
          Features
        </Link>
        <Link
          className="text-sm md:text-base font-medium hover:underline underline-offset-4"
          href="/#features"
        >
          Pricing
        </Link>
      </nav>
    </header>
  );
}
