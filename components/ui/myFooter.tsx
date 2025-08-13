import Image from "next/image";

export default function MyFooter() {
    return (
      <div className="w-full mb-15 mr-6">
        <footer className="w-full py-8 px-6 sm:px-4 flex flex-col md:flex-row gap-6 sm:gap-4 md:gap-6 items-center justify-center text-sm sm:text-base">
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-center px-2"
            href="https://adventofcode.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/window.svg"
              alt="Window icon"
              width={16}
              height={16}
              className="flex-shrink-0"
            />
            <span className="whitespace-nowrap">
              Inspiration behind the format
            </span>
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-center px-2"
            href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              aria-hidden
              src="/globe.svg"
              alt="Globe icon"
              width={16}
              height={16}
              className="flex-shrink-0"
            />
            <span className="whitespace-nowrap">Built with Next.js →</span>
          </a>
          <a
            className="flex items-center gap-2 hover:underline hover:underline-offset-4 text-center px-2 mr-6"
            href="https://andrewbacigalupi.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            {/* Light mode icon */}
            <Image
              aria-hidden
              src="/author.png"
              alt="Running stick figure"
              width={16}
              height={16}
              className="flex-shrink-0 text-gray-400 dark:hidden"
            />
            {/* Dark mode icon */}
            <Image
              aria-hidden
              src="/author-white.png"
              alt="Running figure white"
              width={16}
              height={16}
              className="hidden dark:flex flex-shrink-0 text-gray-400"
            />
            <span className="whitespace-nowrap">About the Creator</span>
          </a>
        </footer>
      </div>
    );
}
