import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaFacebook,
  FaInstagram,
  FaPinterest,
  FaYoutube,
  FaTumblr,
  FaSnapchat,
} from "react-icons/fa";

import { TopFooter } from "./styles";

export const Footer: React.FC = () => (
  <TopFooter>
    <div className="container">
      <div className="row">
        <div className="col d-flex">
          <img
            src="https://www.marvel.com/static/images/favicon/mstile-150x150.png"
            alt="Logo M da Marvel"
          ></img>
          <ul className="pt-4">
            <li className="pb-1">About Marvel</li>
            <li className="pb-1">Help/FAQs</li>
            <li className="pb-1">Disney+</li>
          </ul>
        </div>
        <div className="col"></div>
        <div className="col"></div>
        <div className="col">
          <h2 className="pt-3 text-center">Follow Marvel</h2>
          <ul className="row row-cols-3">
            <li className="col text-center">
              <Link to="">
                <FaTwitter />
              </Link>
            </li>
            <li className="col text-center">
              <Link to="">
                <FaFacebook />
              </Link>
            </li>
            <li className="col text-center">
              <Link to="">
                <FaInstagram />
              </Link>
            </li>
            <li className="col text-center">
              <Link to="">
                <FaPinterest />
              </Link>
            </li>
            <li className="col text-center">
              <Link to="">
                <FaYoutube />
              </Link>
            </li>
            <li className="col text-center">
              <Link to="">
                <FaTumblr />
              </Link>
            </li>
            <li className="col text-center">
              <Link to="">
                <FaSnapchat />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </TopFooter>
);
