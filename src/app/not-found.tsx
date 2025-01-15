import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-40 md:pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-20 text-center">
          <div className="inline-block mb-6 px-4 py-1.5 bg-blue-50 rounded-full">
            <span className="text-sm font-medium text-blue-600">404 Error</span>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Page Not Found <br />
            <span className="text-blue-600 relative">
              Let&apos;s Get You Back
              <svg
                className="absolute -bottom-2 left-0 w-full h-2 text-blue-200"
                viewBox="0 0 100 10"
                preserveAspectRatio="none"
              >
                <path
                  d="M0 5 Q 25 0, 50 5 Q 75 10, 100 5"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                />
              </svg>
            </span>
          </h1>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Oops! The page you&apos;re looking for seems to have wandered off.
            Don&apos;t worry, you can still create amazing proposals from our
            homepage.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              href="/"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              Return Home
            </Link>
            <Link
              href="/create"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all border border-blue-100"
            >
              Create New Proposal
            </Link>
          </div>
        </div>

        {/* Optional: Add a fun illustration or icon here */}
        <div className="flex justify-center mt-8">
          <svg
            className="w-64 h-64 text-blue-100"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
      </div>
    </div>
  );
}
