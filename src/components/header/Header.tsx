import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Header.css'

const Header = () => {
    useEffect(() => {
        let ubication = window.scrollY;
        window.onscroll = function () {
          if (ubication >= window.scrollY && window.scrollY > 100) {
            document.getElementById("header")?.classList.add("fix");
          } else if (ubication <= 40) {
            document.getElementById("header")?.classList.remove("fix");
          } else if (ubication <= window.scrollY) {
            document.getElementById("header")?.classList.remove("fix");
          }
          ubication = window.scrollY;
        };
      }, []);

    return (
        <header id={'header'} className='header-container'>
            <h2>Agrónomo</h2>
            <nav>
                <ul className='link-list'>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </nav>
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
            <span className="material-symbols-outlined">
                account_circle
            </span>
        </header>
    );
}

export default Header;