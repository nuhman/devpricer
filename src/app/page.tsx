import Link from "next/link";

export default function Home() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "DevPricer - Website Quotation or Proposal Generator",
    applicationCategory: "UtilityApplication",
    url: "https://devpricer.netlify.app",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    sameAs: [
      "https://github.com/nuhman",
      "https://www.linkedin.com/in/muhammed-nuhman",
    ],
    description:
      "Professional software project quotation generator for freelancers and agencies",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-800-555-5555",
      contactType: "Customer Service",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="py-20 text-center">
            <div className="inline-block mb-6 px-4 py-1.5 bg-blue-50 rounded-full">
              <span className="text-sm font-medium text-blue-600">
                Free & Open Source
              </span>
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Professional Proposals, <br />
              <span className="text-blue-600 relative">
                In Minutes
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
              Create beautiful, professional project proposals for your web
              development clients. Free, fast, and designed specifically for
              developers and agencies.
            </p>
            <div className="flex justify-center space-x-4">
              <Link
                href="/create"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
              >
                Create New Proposal
              </Link>
            </div>
          </div>

          {/* Features Section */}
          <div className="py-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Save Time */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Save Time</h3>
              <p className="text-gray-600 leading-relaxed">
                Generate professional proposals in minutes, not hours.
                Streamline your workflow and focus on what matters most.
              </p>
            </div>

            {/* Look Professional */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Look Professional</h3>
              <p className="text-gray-600 leading-relaxed">
                Beautifully designed templates that win clients. Stand out from
                the competition with polished proposals.
              </p>
            </div>

            {/* Instant PDF */}
            <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-3">Instant PDF</h3>
              <p className="text-gray-600 leading-relaxed">
                Download your proposal immediately in PDF format. Ready to share
                with your clients right away.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
