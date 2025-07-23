export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white p-6 mt-8">
      <div className="max-w-6xl mx-auto text-center">
        <p className="text-lg font-semibold mb-2">BookMandu</p>
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            Privacy Policy
          </a>
          <span className="text-gray-500">|</span>
          <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  )
}
