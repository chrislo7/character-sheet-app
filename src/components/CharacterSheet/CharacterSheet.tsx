import React, { useState } from 'react';
import './CharacterSheet.css';
import { ATTRIBUTE_LIST, CLASS_LIST, SKILL_LIST } from '../../utils/consts';
import type { Class } from "../../types";

function CharacterSheet({ character, setCharacter }: any) {
  const [showClassRequirements, setShowClassRequirements] = useState<boolean>(false);
  const [currentClass, setCurrentClass] = useState<Class | null>(null);

  const { attributes, skills, id } = character;

  const calculateModifier = (value: number) => Math.floor((value - 10) / 2);

  const updateAttribute = (attr: string, diff: number) => {
    const totalAttributes = Object.values(attributes).reduce<number>((sum: number, val: number) => sum + val, 0);

    if (totalAttributes + diff > 70) {
      alert('A character can only have up to 70 delegated attribute points')
      return;
    };

    const newAttributes = { ...attributes, [attr]: Math.max(0, attributes[attr] + diff) };

    setCharacter({
      ...character,
      attributes: newAttributes,
      skills: SKILL_LIST.reduce((updatedSkills, skill) => {
        const modifier = calculateModifier(newAttributes[skill.attributeModifier]);
        return {
          ...updatedSkills,
          [skill.name]: {
            ...skills[skill.name],
            modifier,
            total: skills[skill.name].points + modifier,
          },
        };
      }, {}),
    });
  };

  const updateSkillPoints = (skillName: string, diff: number) => {
    const totalPoints = 10 + 4 * calculateModifier(attributes.Intelligence);
    const spentPoints = Object.values(skills).reduce<number>((sum, skill) => sum + (skill as { points: number }).points, 0);

    if (spentPoints + diff > totalPoints) return;

    setCharacter({
      ...character,
      skills: {
        ...skills,
        [skillName]: {
          ...skills[skillName],
          points: Math.max(0, skills[skillName].points + diff),
          total: skills[skillName].points + diff + skills[skillName].modifier,
        },
      },
    });
  };

  const handleClassClick = (className: Class) => {
    if (currentClass === className && showClassRequirements) {
      setShowClassRequirements(false);
    } else {
      setCurrentClass(className);
      setShowClassRequirements(true);
    }
  };

  return (
    <div className="CharacterSheet">
      <h2>Character {id && `(ID: ${id})`}</h2>

      <div className="character-attributes-skills">
        <section style={{width: '30%'}}>
          <h3>Attributes</h3>
          {ATTRIBUTE_LIST.map((attr) => (
            <div className="character-attribute" key={attr}>
              <div>
                {attr}: {attributes[attr]} (Modifier: {calculateModifier(attributes[attr])})
              </div>
              <div>
                <button onClick={() => updateAttribute(attr, 1)}>+</button>
                <button onClick={() => updateAttribute(attr, -1)}>-</button>
              </div>
            </div>
          ))}
        </section>

        <section>
          <h3>Skills</h3>
          {SKILL_LIST.map((skill) => (
            <div className="character-skill" key={skill.name}>
              <div>
                {skill.name} - Points: {skills[skill.name].points}
                (Modifier: {skill.attributeModifier}): {skills[skill.name].modifier}
              </div>
              <div className="character-skill-buttons">
                <div>
                  <button onClick={() => updateSkillPoints(skill.name, 1)}>+</button>
                  <button onClick={() => updateSkillPoints(skill.name, -1)}>-</button>
                </div>
                <div>
                  Total: {skills[skill.name].total}
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>

      <section>
        <h3>Class Requirements</h3>
        {Object.entries(CLASS_LIST).map(([className, requirements]) => {
          const meetsRequirements = Object.entries(requirements).every(
            ([attr, value]) => attributes[attr] >= value
          );
          return (
            <button
              key={className}
              style={{ color: meetsRequirements ? 'green' : 'red' }}
              className={'button'}
              onClick={() => handleClassClick(className as Class)}
            >
              {className}
            </button>
          );
        })}
        {showClassRequirements && currentClass && (
          <div className="ClassRequirements">
            <h4>{currentClass} Requirements</h4>
            <ul>
              {Object.entries(CLASS_LIST[currentClass]).map(([attr, value]) => (
                <li key={attr}> {attr}: {value} </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}

export default CharacterSheet;