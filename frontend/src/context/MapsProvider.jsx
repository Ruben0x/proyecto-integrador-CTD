// MapsProvider.jsx
import { useJsApiLoader } from "@react-google-maps/api";
import React from "react";

const libraries = ["places", "drawing", "geometry"];

export function MapProvider({ children }) {
  const { isLoaded: scriptLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_API,
    libraries, // Pass the libraries as an array of strings
  });

  if (loadError) return <p>Encountered error while loading google maps</p>;
  if (!scriptLoaded) return <p>Map Script is loading...</p>;

  return children;
}
