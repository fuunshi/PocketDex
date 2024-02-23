import React, { useState, useEffect, useRef } from 'react';
import { Outlet, Link, useParams } from "react-router-dom";
import LoadingAnimation from '../core/loading';

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

function List({ data, isLoading, heading }) {
    return (
        <div className="flex">
            <div className="bg-gray-200 h-screen w-1/5 p-4 pt-0 overflow-y-auto">
                <h1 className="text-2xl font-bold mb-4 pt-4 sticky top-0 bg-gray-200">{heading}</h1>
                {isLoading ? (
                    <LoadingAnimation />
                ) : (
                    <ul>
                        {data?.results.map((name, index) => (
                            <li key={index} className="mb-2">
                                <Link
                                    to={`${index + 1}/`}
                                    className="text-blue-500 hover:underline"
                                >
                                    {index + 1}. {capitalize(name.name)}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
            <div className="bg-gray-100 w-4/5 p-4 overflow-y-auto flex-grow h-screen">
                <Outlet />
            </div>
        </div>
    );
}


function PokemonsList() {
    const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/pokemon/');
    console.log(data);
    return (
        <>
            <List data={data} isLoading={isLoading} heading={'Pokemons'} />
        </>
    );
}

function BerriesList() {
    const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/berry/');
    console.log(data);
    return (
        <>
            <List data={data} isLoading={isLoading} heading={'Berries'} />
        </>
    );
}

function LocationsList() {
    const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/location/');
    console.log(data);
    return (
        <>
            <List data={data} isLoading={isLoading} heading={'Locations'} />
        </>
    );
}

function Pokemons() {
    const { id } = useParams();
    const { data, isLoading } = FetchData(`https://pokeapi.co/api/v2/pokemon/${id}`)
    return (
        <>
            <h1 className='text-3xl font-bold mb-8 text-center'>Pokemon</h1>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div>
                    <h1 className='text-2xl font-bold mb-4'>{data.name.charAt(0).toUpperCase() + data.name.slice(1)}</h1>
                    <h2 className='text-lg font-semibold mb-2'>Sprites</h2>
                    <div className="flex justify-around">
                        <div id="normal" className='flex'>
                            <img src={data.sprites.front_default} alt="Front_View" className="w-32 h-32 object-contain" />
                            <img src={data.sprites.back_default} alt="Back_View" className="w-32 h-32 object-contain" />
                            <img src={data.sprites.front_shiny} alt="Shiny_View" className="w-32 h-32 object-contain" />
                            <img src={data.sprites.back_shiny} alt="Back_Shiny" className="w-32 h-32 object-contain" />
                        </div>
                        <div id="gif">
                            <img src={data.sprites.other.showdown.front_default} alt="Front_Default_Git" className="w-24 h-24 object-contain" />
                            <img src={data.sprites.other.showdown.front_shiny} alt="Front_Shiny_Gif" className="w-24 h-24 object-contain" />
                        </div>
                    </div>
                    <div className="flex flex-col mb-4" id="type">
                        <h2 className='text-lg font-semibold mb-2'>Types</h2>
                        <div className="flex">
                            {data.types.map((type, index) => (
                                <span key={index} className='px-4 py-1 bg-gray-300 rounded-lg mr-2 mb-2'>{capitalize(type.type.name)}</span>
                            ))}
                        </div>
                    </div>
                    <h2 className='text-lg font-semibold mb-2'>Abilities</h2>
                    <div className="flex flex-wrap mb-4" id="abilities">
                        {data.abilities.map((ability, index) => (
                            <span className='px-4 py-1 bg-gray-300 rounded-lg mr-2 mb-2' key={index}>
                                <a href={ability.ability.url} className='text-blue-500 hover:underline'>{capitalize(ability.ability.name)}</a>
                            </span>
                        ))}
                    </div>
                    <h2 className='text-lg font-semibold mb-2'>Stats</h2>
                    <div id="stats">
                        <table className='border border-gray-300'>
                            <thead>
                                <tr>
                                    <th className='border border-gray-300'>Stat Name</th>
                                    <th className='border border-gray-300'>Base Stat</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.stats.map((stat, index) => (
                                    <tr key={index}>
                                        <td className='border border-gray-300'>{capitalize(stat.stat.name)}</td>
                                        <td className='border border-gray-300'>{stat.base_stat}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div id="moves">
                        <h2 className='text-lg font-semibold mb-2'>Moves</h2>
                        <div className='flex flex-wrap justify-start'>
                            {data.moves.map((move, index, array) => (
                                <span className='px-4 py-1 bg-gray-300 rounded-lg mr-2 mb-2' key={index}>
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
    const { id } = useParams();
    const { data, isLoading } = FetchData(`https://pokeapi.co/api/v2/berry/${id}`)
    return (
        <>
            <h1 className='text-3xl font-bold mb-8 text-center'>Berry</h1>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div>
                    <div className="name text-center ">
                        {capitalize(data.item.name)}<br></br>
                        {data.size}
                    </div>
                    <div className="firmness">
                        Firmness: {data.firmness.name}
                    </div>
                    <div className='flex flex-col' id="flavors">
                        <h2 className="text-2xl font-bold mb-4">Flavors:</h2>
                        {data.flavors.map((flavor, index) => (
                            <span key={index} className="capitalize mb-2">{flavor.flavor.name}</span>
                        ))}
                    </div>
                </div>
            )}

        </>
    )
}

function Locations() {

    const { id } = useParams();
    const { data, isLoading } = FetchData(`https://pokeapi.co/api/v2/location/${id}`)
    return (
        <>
            <h1 className='text-3xl font-bold mb-8 text-center'>Location</h1>
            {isLoading ? (
                <LoadingAnimation />
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <h2 className="font-bold">Region:</h2>
                        <p>{data.region.name}</p>
                    </div>
                    <div>
                        <h2 className="font-bold">Game Indices:</h2>
                        <ul>
                            {data.game_indices.map((game, index) => (
                                <li key={index}>Game Index: {game.game_index}, Generation: {game.generation.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold">Names:</h2>
                        <ul>
                            {data.names.map((name, index) => (
                                <li key={index}>{name.name}</li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h2 className="font-bold">Areas:</h2>
                        <ul>
                            {data.areas.map((area, index) => (
                                <li key={index}>Name: {area.name}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

        </>
    )
}

export { PokemonsList, BerriesList, LocationsList, Pokemons, Berries, Locations };
