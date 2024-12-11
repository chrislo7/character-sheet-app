export async function fetchCharacters() {
  const response = await fetch('https://recruiting.verylongdomaintotestwith.ca/api/chrislo7/character');

  if (response.ok) {
    const data = await response.json();
    return Array.isArray(data.body) ? data.body : [];
  }
  return [];
}

export async function saveCharacters(characters: any[]) {
  await fetch('https://recruiting.verylongdomaintotestwith.ca/api/chrislo7/character', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(characters),
  });
}