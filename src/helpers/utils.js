import { nbaData } from './nbaData';

export function sortInitialSchedule() {
  const gamesToday = [];
  const upcoming = [];
  const currentDate = new Date();
  const now = Date.now();

  // Sort each team for games not yet completed
  for (const property in nbaData) {
    nbaData[property].games.forEach(game => {
      const gamesDate = new Date(game.date);

      if (isSameDate(currentDate, gamesDate)) {
        gamesToday.push(game);
      } else if (gamesDate.getTime() > now) {
        upcoming.push(game);
      }
    });
  }

  return { gamesToday, upcoming };
}

export function isSameDate(dateTestedAgainst, dateToTest) {
  const year = dateTestedAgainst.getFullYear();
  const month = dateTestedAgainst.getMonth();
  const monthDate = dateTestedAgainst.getDate();

  return (dateToTest.getFullYear() == year) &&
    (dateToTest.getMonth() == month) &&
    (dateToTest.getDate() == monthDate);
}