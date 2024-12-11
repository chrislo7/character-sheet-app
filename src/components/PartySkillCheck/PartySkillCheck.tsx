import React, { useState } from 'react';
import { SKILL_LIST } from '../../utils/consts';

function PartySkillCheck({ characters }: any) {
  const [selectedSkill, setSelectedSkill] = useState<string>('');
  const [dc, setDc] = useState<number>(0);
  const [result, setResult] = useState<string | null>(null);

  const rollSkillCheck = () => {
    if (!selectedSkill) {
      setResult(
        `Error: Select a skill before rolling!`
      );
      return;
    }

    
    const bestCharacter = characters.reduce((best, char) => {
      const skillValue = char.skills[selectedSkill]?.total || 0;
      return skillValue > (best.skills[selectedSkill]?.total || 0) ? char : best;
    }, characters[0]);

    const randomRoll = Math.floor(Math.random() * 20) + 1;
    const total = randomRoll + bestCharacter.skills[selectedSkill]?.total;

    setResult(
      `Roll: ${randomRoll}, Total: ${total}, ${
        total >= dc ? 'Success' : 'Failure'
      } (Character: ${bestCharacter.id})`
    );
  };

  return (
    <div style={{ marginBottom: '48px' }} className="PartySkillCheck">
      <h2>Party Skill Check</h2>
      <select onChange={(e) => setSelectedSkill(e.target.value)}>
        <option value="">Select Skill</option>
        {SKILL_LIST.map((skill) => (
          <option key={skill.name} value={skill.name}>
            {skill.name}
          </option>
        ))}
      </select>
      <input
        type="number"
        placeholder="DC"
        value={dc}
        onChange={(e) => setDc(Number(e.target.value))}
      />
      <button onClick={rollSkillCheck}>Roll</button>
      {result && <p>{result}</p>}
    </div>
  );
}

export default PartySkillCheck;