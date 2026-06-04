export const CATEGORIES = [
  { label: 'Все', value: 'all' },
  { label: 'Гайды', value: 'guides' },
  { label: 'Лекции', value: 'lectures' },
  { label: 'Чек-листы', value: 'checklists' },
  { label: 'Мини-курсы', value: 'mini-courses' },
]

export type CategoryValue = (typeof CATEGORIES)[number]['value']
