export function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const textLength = text.split(" ").length;
  const readingTime = Math.ceil(textLength / wordsPerMinute);
  const result = `~${readingTime} min read`;
  return result;
}
const compareTeamByName = (a, b) => {
  if (a.name < b.name) return -1;
  else if (a.name > b.name) return 1;
  else return 0;
};
export function sortTeam(team) {
  const firstYear = team
    .filter((person) => {
      return person.year === "1st";
    })
    .sort(compareTeamByName);
  const secondYear = team
    .filter((person) => {
      return person.year === "2nd";
    })
    .sort(compareTeamByName);
  const thirdYear = team
    .filter((person) => {
      return person.year === "3rd";
    })
    .sort(compareTeamByName);
  const fourthYear = team
    .filter((person) => {
      return person.year === "4th";
    })
    .sort(compareTeamByName);
  const fifthYear = team
    .filter((person) => {
      return person.year === "5th";
    })
    .sort(compareTeamByName);
  const sortedTeam = [
    ...fifthYear,
    ...fourthYear,
    ...thirdYear,
    ...secondYear,
    ...firstYear,
  ];
  return sortedTeam;
}

export const parseJwt = (token) => {
  // Function to prase jwt payload to json
  var base64Url = token.split(".")[1];
  var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

export const isTokenValid = (token) => {
  const exp_time = parseJwt(token).exp;
  return Date.now() < exp_time * 1000;
};
