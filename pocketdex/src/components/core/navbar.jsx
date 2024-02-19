import { Link } from 'react-router-dom';
import { FiHome, FiHeart, FiMapPin } from 'react-icons/fi';
import { TbPokeball } from "react-icons/tb";

function Navbar() {
    return (
        <div className="navbar flex justify-between bg-emerald-400 p-4 m-0" id="navbar">
            <div>
                <Link to="/" className="text-white text-2xl flex items-center">
                    <FiHome className="mr-2" /> PocketDex
                </Link>
            </div>
            <div className="flex items-center">
                <Link to="/pokemon/" className="text-white text-lg px-4 py-2 hover:bg-emerald-500">
                    <TbPokeball className="mr-2" /> Pokemons
                </Link>
                <Link to="/berries/" className="text-white text-lg px-4 py-2 hover:bg-emerald-500">
                    <FiHeart className="mr-2" /> Berries
                </Link>
                <Link to="/locations/" className="text-white text-lg px-4 py-2 hover:bg-emerald-500">
                    <FiMapPin className="mr-2" /> Locations
                </Link>
            </div>
        </div>
    );
}

export default Navbar;
