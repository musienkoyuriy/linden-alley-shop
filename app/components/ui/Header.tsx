import Link from "next/link";
import Image from "next/image";
import { AuthSheet } from "@/app/(auth)/components/AuthSheet";
import { getCurrentUser } from "@/app/(auth)/_actions/current-user.action";

export async function Header() {
  const currentUser = await getCurrentUser();

  const isAdmin = currentUser?.role === 'admin';

  return (
    <>
      <div className="bg-black text-white text-sm py-2 text-center">
        <p>Безкоштовна доставка при замовленні від 1000 грн</p>
      </div>
      <header className="border-b">
        <div className="container mx-auto">
          <div className="flex items-center justify-between py-4">
            <nav className="hidden md:flex items-center gap-8 w-1/3">
              <Link href="/" className="text-sm text-black hover:text-gray-600 transition-colors">
                Головна
              </Link>
              <Link href={{ pathname: "/shop" }} className="text-sm text-black hover:text-gray-600 transition-colors">
                Магазин
              </Link>
            </nav>

            <div className="flex justify-center w-1/3">
              <Link href="/" className="flex-shrink-0">
                <Image
                  src="/logo.svg"
                  alt="Linden Alley Shop Logo"
                  width={120}
                  height={40}
                  className="h-10 w-auto"
                  priority
                />
              </Link>
            </div>

            <div className="hidden md:flex items-center gap-8 justify-end w-1/3">
              <nav className="flex items-center gap-8">
                <Link href={{ pathname: "/delivery" }} className="text-sm text-black hover:text-gray-600 transition-colors">
                  Доставка і оплата
                </Link>
                <Link href={{ pathname: "/about" }} className="text-sm text-black hover:text-gray-600 transition-colors">
                  Про нас
                </Link>
                <Link href={{ pathname: "/contacts" }} className="text-sm text-black hover:text-gray-600 transition-colors">
                  Контакти
                </Link>
              </nav>

              {isAdmin ? (
                <Link href="/admin" className="text-sm text-black hover:text-gray-600 transition-colors underline">
                  Адмінка
                </Link>
              ) : null}

              <AuthSheet currentUser={currentUser} />

            </div>

            <button className="md:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}