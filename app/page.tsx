import { Header } from "./components/ui/Header";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Main content will go here */}
      </main>

      <footer className="bg-white shadow-md mt-auto">
        <div className="container mx-auto px-4 py-6 flex justify-center">
          <p className="text-gray-600">© 2024 Linden Alley Shop. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
