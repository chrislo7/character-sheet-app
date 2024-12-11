import React, { useState, useEffect } from 'react';
import './App.css';
import CharacterSheet from './components/CharacterSheet/CharacterSheet';
import PartySkillCheck from './components/PartySkillCheck/PartySkillCheck';
import { ATTRIBUTE_LIST, SKILL_LIST } from './utils/consts';
import { fetchCharacters, saveCharacters } from './utils/Api';

function App() {
  const [characters, setCharacters] = useState<any[]>([]);
  const [currentCharacterId, setCurrentCharacterId] = useState<string | null>(null);

  useEffect(() => {
    async function loadCharacters() {
      const savedCharacters = await fetchCharacters();
      console.log('Fetched Characters:', savedCharacters);
      setCharacters(Array.isArray(savedCharacters) ? savedCharacters : []);
    }
    loadCharacters();
  }, []);

  const saveAllCharacters = async () => {
    await saveCharacters(characters);
    alert('Characters saved successfully!');
  };

  const addCharacter = () => {
    const newCharacter = {
      id: `char-${Date.now()}`,
      attributes: ATTRIBUTE_LIST.reduce((acc, attr) => ({ ...acc, [attr]: 10 }), {}),
      skills: SKILL_LIST.reduce((acc, skill) => ({ 
        ...acc, 
        [skill.name]: { points: 0, modifier: 0, total: 0 },
      }), {}),
    };
    setCharacters([...characters, newCharacter]);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Character Manager</h1>
        <div className="App-header-buttons">
          <button className="App-header-button" onClick={addCharacter}>Add Character</button>
          <button className="App-header-button" onClick={saveAllCharacters}>Save All</button>
        </div>
      </header>
      <main>
        {characters.map((character) => (
          <CharacterSheet
            key={character.id}
            character={character}
            setCharacter={(updatedCharacter) =>
              setCharacters((prev) =>
                prev.map((c) => (c.id === updatedCharacter.id ? updatedCharacter : c))
              )
            }
          />
        ))}
        <PartySkillCheck characters={characters} />
      </main>
    </div>
  );
}

export default App;