import rs from "jsrsasign";
const CHIEF_SECRETARY = "Chief Secretary";

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
const compareFourthYear = (a, b) => {
  if (a.designation === CHIEF_SECRETARY) return -1;
  if (b.designation === CHIEF_SECRETARY) return 1;
  if (a.name < b.name) return -1;
  if (a.name > b.name) return 1;
  return 0;
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
    .sort(compareFourthYear);
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
  return rs.jws.JWS.readSafeJSONString(rs.b64utoutf8(token.split(".")[1]));
};

export const isTokenValid = (token) => {
  if (token) {
    const exp_time = parseJwt(token).exp;
    return Date.now() - 5000 < exp_time * 1000; // check validity upto 5 seconds
  } else return false;
};
