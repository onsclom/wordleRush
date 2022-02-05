export enum Color {
  Blank,
  Black,
  Yellow,
  Green
}

class Grid {
  letters: string[][]
  colors: Color[][]

  constructor() {
    this.letters = []
    this.colors = []
    for (let y = 0; y<6; y++) {
      let lettersRow: string[] = []
      let colorsRow: Color[] = []
      for (let x = 0; x<5; x++) {
        colorsRow.push( Color.Blank )
        lettersRow.push( "B" )
      }
      this.colors.push(colorsRow)
      this.letters.push(lettersRow)
    }
  }
}

class GameStats {
  gameStartTime: number
  gameEndTime: number

  score: number

  attemptedWords: string[]
  guessHistory: Grid[]
}

export default class WrushleGame {
  timestamp: number
  grid: Grid
  stats: GameStats

  keyColors: { [letter:string]: Color }

  constructor() {
    this.timestamp = new Date().getMilliseconds()
    this.grid = new Grid()
  }
}