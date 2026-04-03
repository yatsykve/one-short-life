export interface SkillDefinition {
  id: string
  name: string
  description: string
}

export const skills: SkillDefinition[] = [
  {
    id: 'strength',
    name: 'Strength Training',
    description: 'Build physical power through exercise.',
  },
  {
    id: 'reading',
    name: 'Reading',
    description: 'Study texts to sharpen the mind.',
  },
  {
    id: 'crafting',
    name: 'Crafting',
    description: 'Practice making things with your hands.',
  },
]
