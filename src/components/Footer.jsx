export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-6 text-sm text-gray-500">
        © {new Date().getFullYear()} Mi Web
      </div>
    </footer>
  );
}
