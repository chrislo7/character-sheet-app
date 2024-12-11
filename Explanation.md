### Intro 

Hello! 
This doc is mainly used to provide some explanation as to how I made this assignment as well as some assumptions I've made along the way. 

To preface, I have never played any tabletop RPGs, so I took quite a bit of time just to understand the non-code aspects (e.g. how the skills even work / skill checking etc). 
To be honest, I'd say I was more stuck on how the RPG elements should work than the actual coding process.

### Assumptions made
- Line 47 of `CharacterSheet.tsx`
  - For this line, I've made the assumption that updating skill points is based off intelligence as it was written out on the README.md
  - I think it probably isn't, but I think it should be an easy update if we needed to switch over. 
- I'm not familiar with how the calculations should normally work as a real RPG, so i took it as-is from the README.md again. 
- The video showed a `reset characters` button, but it wasn't mentioned in the README.md and there doesnt appear to be an endpoint provided for this so I didn't add one.
- For identification of characters, i just took the `character.id` directly. 


### Explanation

I've spent a bit more than 2 hours doing actual coding work (not including time i spent trying to understand the RPG elements). I did try to limit to 2 hours on the app itself, and the additional time was used to:
- finalizing some of the features required (e.g. forgot to add individual skillcheck until the end)
- clean up some code (e.g. removing some `console.log()` statements ...etc.)
- organize the files a bit e.g. putting characterSheet and partySkillCheck into it's own folders under /src/components/ 
- add some basic CSS and reorganized some sections in order to make the app look somewhat usable. I didn't go overboard with design as I believe that's not a necessity for this assement. 

### To-Dos
If I was provided more time, I would implement the following: 
- Proper error handling for the API endpoints.
- Display points available/remaining in both attributes and skills sections
- History for party/individual skill checks. We do not store this result with the API, so the history can just be a simple array stored in state and goes away if we refresh the app. 
- Proper integration / e2e tests
- More clean ups, e.g. file structures can be cleaned up even more, splitting things like character-specific skill check into it's own component and potentially splitting out the shared logic between party and individual skill check into a utils/helper.ts file etc.
- Some more CSS to make the app look better.
