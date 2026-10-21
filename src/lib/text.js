// Two letters from a person's name, used wherever a portrait would go but none
// exists (client avatars in testimonials).
export const initials = (name = '') =>
  name
    .replace(/^(Dr|Mr|Ms|Mrs|Prof)\.?\s+/i, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase()
