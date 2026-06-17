import AnimationContainer from '../utils/AnimationContainer';

const ContactMe = () => {
  return (
    <AnimationContainer>
      <div className="w-full">
        <div className="w-full flex flex-col">
          <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/10 border border-white/10 mb-10">
            <a
              href="mailto:wit.chanthawat@gmail.com"
              target="_blank"
              rel="noreferrer"
              className="group bg-gray-950 p-5 sm:p-6 hover:bg-gray-900 transition-colors duration-300"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-400/80">
                Email
              </p>
              <p className="mt-2 break-words text-base sm:text-lg text-gray-100 group-hover:text-primary-400 transition-colors">
                wit.chanthawat@gmail.com
              </p>
            </a>

            <a
              href="https://walink.co/2369d5"
              target="_blank"
              rel="noreferrer"
              className="group bg-gray-950 p-5 sm:p-6 hover:bg-gray-900 transition-colors duration-300"
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-primary-400/80">
                Phone
              </p>
              <p className="mt-2 break-words text-base sm:text-lg text-gray-100 group-hover:text-primary-400 transition-colors">
                +62 558 6316
              </p>
            </a>
          </div>

          <form
            action="https://formspree.io/f/xdorkorr"
            method="POST"
            className="w-full space-y-5"
          >
            <div>
              <label className="sr-only" htmlFor="name">
                Name
              </label>
              <input
                className="w-full bg-transparent border border-white/15 px-4 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary-500 transition-colors duration-200"
                placeholder="Name"
                type="text"
                id="name"
                name="name"
                required
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email
                </label>
                <input
                  className="w-full bg-transparent border border-white/15 px-4 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary-500 transition-colors duration-200"
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
                  className="w-full bg-transparent border border-white/15 px-4 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary-500 transition-colors duration-200"
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
                className="w-full h-36 bg-transparent border border-white/15 px-4 py-4 text-base text-gray-100 placeholder:text-gray-500 outline-none focus:border-primary-500 transition-colors duration-200 resize-none"
                placeholder="Message"
                id="message"
                name="message"
                required
              ></textarea>
            </div>

            <button
              type="submit"
              className="group inline-flex items-center gap-2 px-8 py-4 bg-gray-50 text-gray-950 font-semibold hover:bg-primary-400 transition-colors duration-300"
            >
              <span>Send Message</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 group-hover:translate-x-0.5 transition-transform duration-300"
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
    </AnimationContainer>
  );
};

export default ContactMe;
