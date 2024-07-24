import "../styles/Banner.css";
import "../styles/index.css";
import cat from "../assets/img/homepage_cat.png";
import { Link } from "react-router-dom";
import homepage_pet from "../assets/img/homepage.png";

function Banner() {
  return (
    <div className="banner">
      {/* <div className="yellow-circle"></div>
        <div className="yellow-circle-2"></div>
        <div className="red-circle"></div>
        <div className="red-circle-2"></div>
        <div className="blue-circle"></div>
        <div className="blue-circle-2"></div>

        <div className="periwrinkle-circle"></div>
        <div className="periwrinkle-circle-2"></div>

        <div className="page-pet">
          <img src={cat} />
        </div> */}

      <div className="banner-main-content">
        <div className="banner-content">
          <h1>We care about your pet</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Nibh sed
            pulvinar proin gravida hendrerit. Ac tortor dignissim convallis
            aenean et tortor at risus.
          </p>
        </div>
        <div className="banner-button">
          <Link to="/instruction" className="book_button">
            <button>How to book your visit</button>
          </Link>
        </div>
      </div>
      {/* <div className="paw">
          <img src="https://www.pngkey.com/png/full/98-984975_cat-paws-png-hd-dog-paw-print-clip.png" />
        </div>

        <div className="paw-2">
          <img src="https://www.pngkey.com/png/full/98-984975_cat-paws-png-hd-dog-paw-print-clip.png" />
        </div>

        <div className="paw-3">
          <img src="https://www.pngkey.com/png/full/98-984975_cat-paws-png-hd-dog-paw-print-clip.png" />
        </div> */}
    </div>
  );
}

export default Banner;
