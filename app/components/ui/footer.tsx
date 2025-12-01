import { Link } from "@/app/components/link";
import { Text } from "@/app/components/text";
import { EnvelopeIcon, PhoneIcon } from "@heroicons/react/24/outline";

export default function Footer() {
  return (
    <footer className="border-t border-zinc-200 dark:border-zinc-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <div className="flex items-center gap-2">
            <Text>Powered by</Text>
            <Link
              href="https://oluwasetemi.dev"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold"
            >
              Oluwasetemi Ojo (Code Factory)
            </Link>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="mailto:setemiojo@gmail.com"
              className="inline-flex items-center gap-1"
            >
              <EnvelopeIcon className="w-4 h-4" />
              setemiojo@gmail.com
            </Link>

            <span className="text-zinc-300 dark:text-zinc-700">|</span>

            <Link
              href="mailto:me@oluwasetemi.dev"
              className="inline-flex items-center gap-1"
            >
              <EnvelopeIcon className="w-4 h-4" />
              me@oluwasetemi.dev
            </Link>

            <span className="text-zinc-300 dark:text-zinc-700">|</span>

            <Link
              href="tel:+18765924904"
              className="inline-flex items-center gap-1"
            >
              <PhoneIcon className="w-4 h-4" />
              +18765924904
            </Link>
          </div>

          <Text>Contact for more projects like this</Text>
        </div>
      </div>
    </footer>
  );
}
