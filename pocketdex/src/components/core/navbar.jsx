import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <div className="navbar flex justify-around bg-emerald-400" id="navbar">
                <div>
                    <Link to="/">PocketDex</Link>
                </div>
                <div>
                    <Link className="px-2 active:bg-emerald-900" to="pokemon/">Pokemons</Link>
                    <Link className="px-2" to="berries/">Berries</Link>
                    <Link className="px-2" to="locations/">Locaitons</Link>
                </div>
            </div>
        </>
    );
}