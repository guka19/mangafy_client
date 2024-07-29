const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-slate-900 flex justify-center items-center py-10">
      <div className="flex flex-col justify-center items-center space-y-2">
        <a
          className="font-bold text-xl 2xl:text-2xl cursor-pointer text-slate-900 bg-white p-2"
          href="/"
        >
          MANGAFY.GE
        </a>
        <span className="text-white">
          All rights reserved&copy; {currentYear}
        </span>
      </div>
      {/* <Separator className="my-4" /> */}
        {/* <div className="flex flex-col justify-center items-center">
          <span className="text-white text-xl font-semibold">Useful Links</span>
          <ul className="text-white text-lg">
            <li>
              <Link
                to="/"
                className="underline flex justify-center items-center"
              >
                <FaHome className="mr-1" /> Home
              </Link>
            </li>
            <li>
              <Link
                to="/catalog"
                className="underline flex justify-center items-center"
              >
                <FaStore className="mr-1" /> Manga Catalog
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="underline flex justify-center items-center"
              >
                <FaQuestionCircle className="mr-1" /> Hear About Us
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="underline flex justify-center items-center"
              >
                <FaPhone className="mr-1" /> Contact Us
              </Link>
            </li>
          </ul>
        </div>
        <div className="flex flex-col justify-center items-center">
          <span className="text-white text-xl font-semibold">Socials</span>
          <ul className="text-white text-lg">
            <li>
              <a
                href="https://www.facebook.com/guka.mamadashvili/"
                className="underline flex justify-center items-center"
              >
                <FaFacebook className="mr-1" /> Facebook
              </a>
            </li>
            <li>
              <a
                href="https://www.instagram.com/guka.mamadashvili/"
                className="underline flex justify-center items-center"
              >
                <FaInstagram className="mr-1" /> Instagram
              </a>
            </li>
            <li>
              <a
                href="https://github.com/guka19"
                className="underline flex justify-center items-center"
              >
                <FaGithub className="mr-1" /> Github
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/gurami-mamadashvili-772820295/"
                className="underline flex justify-center items-center"
              >
                <FaLinkedin className="mr-1" /> Linkedin
              </a>
            </li>
          </ul>
        </div> */}
    </footer>
  );
};

export default Footer;
