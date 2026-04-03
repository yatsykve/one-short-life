export interface JobDefinition {
  id: string
  name: string
  description: string
  baseIncome: number // gold per tick when working
}

export const jobs: JobDefinition[] = [
  {
    id: 'beggar',
    name: 'Beggar',
    description: 'Beg for coins on the street. Humble but honest.',
    baseIncome: 0.1,
  },
  {
    id: 'farmer',
    name: 'Farmer',
    description: 'Work the fields. Hard labor under the sun.',
    baseIncome: 0.3,
  },
  {
    id: 'apprentice',
    name: 'Apprentice',
    description: 'Learn a trade under a master craftsman.',
    baseIncome: 0.2,
  },
]
