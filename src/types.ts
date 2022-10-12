export type Country = {
  name: {
    common: string
  }
  languages: {
    [key: string]: string
  }
  flags: {
    png: string
  }
  population: number

  region: string
}

export type CartItem = {
  name: string
  population: number
}

export type AddToCartAction = {
  payload: {
    name: string
    population: number
  }
}

export type RemoveFromCartAction = {
  payload: {
    name: string
  }
}

export type ThemeValues = 'dark' | 'light'
