import Link from 'next/link';

const Navbar = () => (
  <nav className="w-full bg-white border-b border-gray-100 shadow-sm sticky top-0 z-20">
    <div className="max-w-5xl mx-auto flex items-center justify-between px-4 py-3">
      <Link href="/" className="flex items-center gap-2 text-xl font-bold text-blue-700">
        <span className="text-2xl">💼</span>
        <span>BSS/BPO Jobboard</span>
      </Link>
      <div className="flex items-center gap-4 text-sm">
        <Link href="/" className="hover:text-blue-700 transition">Oferty</Link>
        {/* <Link href="/admin" className="hover:text-blue-700 transition">Panel admina</Link> */}
      </div>
    </div>
  </nav>
);

export default Navbar; 