import Link from "next/link";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center p-[5%] border-t">
      <p className="~text-base/xs font-normal">
        © {new Date().getFullYear()}{" "}
        <Link
          href={"https://godkid.dev"}
          target="_blank"
          rel="noopener noreferrer"
          className="font-bold text-base text-main-orange underline"
        >
          godkid
        </Link>
        . All rights reserved.
      </p>
      <nav className="sm:ml-auto flex gap-4 sm:gap-6">
        <Link
          className="text-xs md:text-sm hover:underline underline-offset-4"
          href="#"
        >
          Terms of Service
        </Link>
        <Link
          className="text-xs md:text-sm hover:underline underline-offset-4"
          href="#"
        >
          Privacy
        </Link>
      </nav>
    </footer>
  );
}
