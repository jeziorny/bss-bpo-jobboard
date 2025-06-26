import Link from 'next/link';

const Footer = () => (
  <footer className="w-full bg-gray-50 border-t border-gray-100 mt-12">
    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-gray-500">
      <div>
        &copy; {new Date().getFullYear()} BSS/BPO Jobboard. Wszelkie prawa zastrzeżone.
      </div>
      <div className="flex gap-4">
        <Link href="#" className="hover:text-blue-700 transition">Polityka prywatności</Link>
        <Link href="#" className="hover:text-blue-700 transition">Kontakt</Link>
      </div>
    </div>
  </footer>
);

export default Footer; 