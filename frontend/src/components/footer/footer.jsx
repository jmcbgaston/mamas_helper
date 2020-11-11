const { Link } = require("react-router-dom")

const Footer = () => {
  return (
    <footer className='footer'>
    <div className='footer__content'>
      <Link className='footer__about-link' to="/about">About Us</Link>
    </div>
    </footer>
  )
}

export default Footer;
