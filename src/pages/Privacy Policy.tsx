
const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen w-full flex items-center justify-center bg-white px-4 py-12">
      <div className="w-full max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="flex flex-col-reverse md:flex-row items-stretch">
            {/* Left: message */}
            <div className="w-full md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 mb-4">
                Page not found
              </h1>
              <p className="text-base sm:text-lg text-gray-600 mb-6">
                We couldn't find the page you're looking for. It may have been moved or
                removed, or the link you followed is incorrect.
              </p>

              <div className="flex flex-wrap gap-3">
                <a
                  href="/"
                  className="inline-block px-5 py-2 rounded-md bg-green-600 text-white font-medium hover:bg-green-700 transition"
                >
                  Go to homepage
                </a>

                
              </div>
            </div>

            {/* Right: big 404 visual */}
            <div className="w-full md:w-1/3 bg-gradient-to-br from-green-50 to-white flex items-center justify-center p-8">
              <div className="text-center">
                <div className="text-6xl sm:text-7xl md:text-8xl font-extrabold text-green-600 leading-none">
                  404
                </div>
                <div className="mt-2 text-sm text-gray-500">Not Found</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default PrivacyPolicy




