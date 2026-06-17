import HeaderAnimation from '../utils/HeaderAnimation';

// Single render path: HeaderAnimation is a client component with an
// SSR-safe scroll hook (initial position 0), so it renders the at-top
// style on the server and enhances on scroll after hydration — no
// static→animated swap, no layout shift.
const Header = () => <HeaderAnimation />;

export default Header;
