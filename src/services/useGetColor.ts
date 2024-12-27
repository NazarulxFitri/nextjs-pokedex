import { useState, useEffect } from "react";

const useGetColor = (type1: string, type2: string) => {
  const [color1, setColor1] = useState("");
  const [color2, setColor2] = useState("");

  const typeColors: Record<string, string> = {
    fire: "#ff3131",
    water: "#5271ff",
    electric: "#ffde59",
    ice: "#8ad5ff",
    steel: "#c9c7c7",
    flying: "#c9c7c7",
    ghost: "#4c4a4a",
    bug: "#63936f",
    dark: "#53176c",
    fighting: "#bf8f00",
    normal: "#f0f0f0",
    rock: "#be9764",
    grass: "#00bf63",
    fairy: "#ffbdeb",
    psychic: "#e782ce",
    poison: "#cb6ce6",
    ground: "#a96409",
    dragon: "#c2bc87",
    default: "#060606",
  };

  useEffect(() => {
    setColor1(typeColors[type1] || typeColors.default);
  }, [type1]);

  useEffect(() => {
    setColor2(typeColors[type2] || typeColors.default);
  }, [type2]);

  return { color1, color2 };
};

export default useGetColor;
