import { Link } from "react-router-dom";
import "./NotFound.css";

export function NotFound() {
  return (
    <div className="container not-found">
      <nav className="shelf">
        <Link to="/" className="book home-page">
          Home page
        </Link>
        <a href="https://alla.tech/" className="book about-me">
          Iovan
        </a>
        <a href="https://fasttrackit.org/contact/" className="book contact">
          Contact
        </a>
        <a href="https://fasttrackit.org/" className="book fti">
          FastTrackIT
        </a>
        <span className="book not-found"></span>
        <span className="door left"></span>
        <span className="door right"></span>
      </nav>
      <div className="d-flex flex-column align-items-center mt-5">
        <h1>Error 404</h1>
        <p>The page you're loking for can't be found</p>
      </div>
    </div>
  );
}
