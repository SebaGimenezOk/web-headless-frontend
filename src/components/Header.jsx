export default function Header() {
  return (
    <header className="w-full border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between text-blue-700">
        <span className="text-xl font-semibold">Mi Webs</span>
        <nav className="space-x-6 text-sm">
          <a href="#" className="hover:underline">Inicio</a>
          <a href="#" className="hover:underline">Blog</a>
          <a href="#" className="hover:underline">Contacto</a>
        </nav>
      </div>
    </header>
  );
}
