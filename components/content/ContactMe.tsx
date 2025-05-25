import AnimationContainer from '../utils/AnimationContainer';

const ContactMe = () => {
  return (
    <AnimationContainer>
      <div className="w-full bg-gray-950 py-16">
        <h2
          className="font-bold text-2xl md:text-2xl tracking-tight mb-8 text-gray-100 text-center lg:text-start"
          id="contact"
        >
          Contact me
        </h2>

        <div className="w-full flex justify-between items-center flex-col mx-auto max-w-screen-xl">
          <div className="w-full flex justify-between items-center flex-col lg:flex-row gap-6 mb-10">
            <a
              href="mailto:wit.chanthawat@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <div className="rounded-lg border border-gray-700 hover:border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-4 shadow-lg hover:shadow-[0_12px_40px_rgb(0,0,0,0.6)] sm:p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] backdrop-blur-sm">
                <h6 className="font-bold text-xl tracking-tight text-gray-100 text-start">
                  Email
                </h6>
                <p className="text-base mt-2 text-gray-300">
                  wit.chanthawat@gmail.com
                </p>
              </div>
            </a>

            <a
              href="https://walink.co/2369d5"
              target="_blank"
              rel="noreferrer"
              className="w-full"
            >
              <div className="rounded-lg border border-gray-700 hover:border-gray-600 bg-gradient-to-br from-gray-800 to-gray-900 p-4 shadow-lg hover:shadow-[0_12px_40px_rgb(0,0,0,0.6)] sm:p-6 transition-all duration-300 ease-in-out hover:scale-[1.02] backdrop-blur-sm">
                <h6 className="font-bold text-xl tracking-tight text-gray-100 text-start">
                  Phone
                </h6>
                <p className="text-base mt-2 text-gray-300">+62 558 6316</p>
              </div>
            </a>
          </div>

          <div className="w-full flex justify-center items-center flex-col">
            <form
              action="https://formspree.io/f/xdorkorr"
              method="POST"
              className="w-full space-y-6 bg-gradient-to-br from-gray-900/80 to-gray-950/80 backdrop-blur-lg p-8 rounded-xl border border-gray-700 shadow-2xl"
            >
              <div>
                <label className="sr-only" htmlFor="name">
                  Name
                </label>
                <input
                  className="w-full rounded-lg p-4 text-base outline-none border text-gray-100 bg-gray-800/90 border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 ease backdrop-blur-sm placeholder:text-gray-400"
                  placeholder="Name"
                  type="text"
                  id="name"
                  name="name"
                  required
                />
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label className="sr-only" htmlFor="email">
                    Email
                  </label>
                  <input
                    className="w-full rounded-lg p-4 text-base outline-none border text-gray-100 bg-gray-800/90 border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 ease backdrop-blur-sm placeholder:text-gray-400"
                    placeholder="Email"
                    type="email"
                    id="email"
                    name="email"
                    required
                  />
                </div>

                <div>
                  <label className="sr-only" htmlFor="phone">
                    Phone
                  </label>
                  <input
                    className="w-full rounded-lg p-4 text-base outline-none border text-gray-100 bg-gray-800/90 border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 ease backdrop-blur-sm placeholder:text-gray-400"
                    placeholder="Phone"
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="sr-only" htmlFor="message">
                  Message
                </label>
                <textarea
                  className="w-full h-36 rounded-lg p-4 text-base outline-none border text-gray-100 bg-gray-800/90 border-gray-600 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all duration-200 ease backdrop-blur-sm resize-none placeholder:text-gray-400"
                  placeholder="Message"
                  id="message"
                  name="message"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="flex items-center justify-center rounded-lg px-8 py-4 text-white bg-gradient-to-r from-primary-600 to-primary-500 hover:from-primary-700 hover:to-primary-600 shadow-lg hover:shadow-primary-500/25 transition-all duration-300 ease mx-auto font-medium text-base hover:scale-105 border border-primary-500/20"
              >
                <span className="font-medium">Send Message</span>

                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="ml-3 h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>
    </AnimationContainer>
  );
};

export default ContactMe;
