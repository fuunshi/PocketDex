import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams } from "react-router-dom";

function FetchData(url) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const cacheRef = useRef({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (cacheRef.current[url]) {
                    // Use cached data if available
                    setData(cacheRef.current[url]);
                    setIsLoading(false);
                } else {
                    // Fetch new data
                    const response = await fetch(url);
                    const jsonData = await response.json();
                    setData(jsonData);
                    setIsLoading(false);
                    // Cache the data
                    cacheRef.current[url] = jsonData;
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url]);

    return { data, isLoading };
}

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1)
}

function PokemonsList() {
    const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/pokemon/');
    console.log(data);
    return (
        <>
            <div className="flex">
                <div className='bg-cyan-400' id="sidebar">
                    <h1 className='bg-sky-400'>Pokemons</h1>
                    {isLoading ? <div>Loading...</div> : (
                        <ul>
                            {data?.results.map((pokemon, index) => (
                                <li key={index}>
                                    <Link to={`${index + 1}/`}>{(capitalize(pokemon.name))}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="content" id="content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

function BerriesList() {
    const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/berry/');
    console.log(data);
    return (
        <>
            <div className="flex">
                <div id="sidebar">
                    <h1>Berries</h1>
                    {isLoading ? <div>Loading...</div> : (
                        <ul>
                            {data?.results.map((berry, index) => (
                                <li key={index}>
                                    <Link to={`${index + 1}/`}>{berry.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div className="content" id="content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

function LocationsList() {
    const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/location/');
    console.log(data);
    return (
        <>
            <div className="flex">
                <div id="sidebar">
                    <h1>Locations</h1>
                    {isLoading ? <div>Loading...</div> : (
                        <ul>
                            {data?.results.map((location, index) => (
                                <li key={index}>
                                    <Link to={`${index + 1}/`}>{location.name}</Link>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <div id="content" className="content">
                    <Outlet />
                </div>
            </div>
        </>
    );
}

function Pokemons() {
    const { id } = useParams();
    const { data, isLoading } = FetchData(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return (
        <>
            <h1 className='flex justify-center'>Pokemon</h1>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <div>
                    <h1>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
                    <h2>Sprites</h2>
                    <div className="flex">

                        <img src={data.sprites.front_default} alt="Front_View" />
                        <img src={data.sprites.back_default} alt="Back_View" />
                        <img src={data.sprites.front_shiny} alt="Shiny_View" />
                        <img src={data.sprites.back_shiny} alt="Back_Shiny" />
                    </div>
                    <div className="flex flex-col" id="type">
                        <h2>Types</h2>
                        <div className="flex">
                            {data.types.map((type, index) => (
                                <span className='px-4'>{capitalize(type.type.name)}</span>
                            ))}
                        </div>
                    </div>
                    <h2>Abilities</h2>
                    <div className="flex" id="abilities">
                        {data.abilities.map((ability, index) => (
                            <span className='px-4' key={index}>
                                <a href={ability.ability.url}>{ability.ability.name}</a>
                            </span>
                        ))}
                    </div>
                    <h2>Stats</h2>
                    <div id="stats">
                        <table>
                            <tr>
                                <th>Statname</th>
                                <th>Base Stat</th>
                            </tr>
                            {data.stats.map((stat, index) => (
                                <tr>
                                    <td>{stat.stat.name}</td>
                                    <td>{stat.base_stat}</td>
                                </tr>
                            ))}
                        </table>
                    </div>
                    <div id="moves">
                        <h1>Moves</h1>
                        <div className='flex flex-wrap justify-evenly'>
                            {data.moves.map((move, index, array) => (
                                <span className='px-4'>
                                    {capitalize(move.move.name)}
                                </span>
                            ))}
                        </div>

                    </div>
                </div>
            )}
        </>
    )
}

function Berries() {
    return (
        <>
            <h1>Berries</h1>
        </>
    )
}

function Locations() {
    return (
        <>
            <h1>Locations</h1>
        </>
    )
}

export { PokemonsList, BerriesList, LocationsList, Pokemons, Berries, Locations };
