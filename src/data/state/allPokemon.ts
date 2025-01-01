import { atom } from "recoil";
import { AllPokemonConfig } from "../useGetAllPokemon";

export const allPokemonState = atom<AllPokemonConfig[]>({
    key: 'allPokemonState',
    default: [],
})