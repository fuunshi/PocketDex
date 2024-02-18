import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="navbar" id="navbar">
                <Link to="pokemon/">Pokemons</Link>
                <Link to="berries/">Berries</Link>
                <Link to="locations/">Locaitons</Link>
            </div>
        </>
    );
}