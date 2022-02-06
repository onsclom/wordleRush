import {Color} from "./types"

let letters: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

export let letterColors: {[key: string]: Color} = {};

for (const letter of letters)
  letterColors[letter] = Color.Blank

letterColors["A"] = Color.Green