import React, { useState, useEffect, useRef } from 'react';
import { Outlet } from "react-router-dom";

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

function PokemonsList() {
  const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/pokemon/');
  console.log(data);
  return (
    <>
    <div id="sidebar">
      <h1>Pokemons</h1>
      {isLoading ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
    <div className="content" id="content">
        <Outlet />
    </div>
    </>
  );
}

function BerriesList() {
  const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/berry/');
  console.log(data);
  return (
    <>
    <div id="sidebar">
      <h1>Berries</h1>
      {isLoading ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
    <div className="content" id="content">
        <Outlet />
    </div>
    </>
  );
}

function LocationsList() {
  const { data, isLoading } = FetchData('https://pokeapi.co/api/v2/location/');
  console.log(data);
  return (
    <>
    <div id="sidebar">
      <h1>Locations</h1>
      {isLoading ? <div>Loading...</div> : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
    <div id="content" className="content">
        <Outlet />
    </div>
    </>
  );
}

function Pokemons() {
    return(
        <>
            <h1>Pokemon</h1>
        </>
    )
}

function Berries() {
    return(
        <>
            <h1>Berries</h1>
        </>
    )
}

function Locations() {
    return(
        <>
            <h1>Locations</h1>
        </>
    )
}

export { PokemonsList, BerriesList, LocationsList, Pokemons, Berries, Locations };
