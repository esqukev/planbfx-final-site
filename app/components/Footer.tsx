export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-2xl font-bold mb-4">PlanB FX</h3>
            <p className="text-zinc-400">
              Art Comes First. We shape distinctive success stories with breakthrough ideas and creative mastery.
            </p>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2 text-zinc-400">
              <li><a href="#works" className="hover:text-white transition-colors">Works</a></li>
              <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-2 text-zinc-400">
              <li>info@planbfx.com</li>
              <li>Phone: +1 (555) 123-4567</li>
            </ul>
            <div className="flex gap-4 mt-6">
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">IG</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">FB</a>
              <a href="#" className="text-zinc-400 hover:text-white transition-colors">BEHANCE</a>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-800 pt-8 text-center text-zinc-400 text-sm">
          © 2025 PlanB FX. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
