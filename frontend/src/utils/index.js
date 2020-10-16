export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const textLength = text.split(" ").length;
  const readingTime = Math.ceil(textLength / wordsPerMinute);
  const result = `~${readingTime} min read`;
  return result;
}

export function sortTeam(team) {
  const firstYear = team
    .filter((person) => {
      return person.year === "1st";
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  const secondYear = team
    .filter((person) => {
      return person.year === "2nd";
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  const thirdYear = team
    .filter((person) => {
      return person.year === "3rd";
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  const fourthYear = team
    .filter((person) => {
      return person.year === "4th";
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  const fifthYear = team
    .filter((person) => {
      return person.year === "5th";
    })
    .sort((a, b) => {
      if (a.name < b.name) return -1;
      else if (a.name > b.name) return 1;
      else return 0;
    });
  const sortedTeam = [
    ...fifthYear,
    ...fourthYear,
    ...thirdYear,
    ...secondYear,
    ...firstYear,
  ];
  return sortedTeam;
}
