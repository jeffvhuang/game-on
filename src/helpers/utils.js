// Sleep function to delay tasks to mock delayed api response
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sorting functions
export function sortEvents(sportsEvents, eSportsEvents) {
  const ongoing = [];
  const upcoming = [];
  const completed = [];
  const now = Date.now();

  // Check start - end dates and place into one of the above arrays
  for (const property in sportsEvents) {
    sportsEvents[property].forEach(event => {
      if (new Date(event.startDate).getTime() > now) {
        upcoming.push(event);
      } else if (new Date(event.endDate).getTime() < now) {
        completed.push(event);
      } else {
        ongoing.push(event);
      }
    });
  }

  for (const property in eSportsEvents) {
    eSportsEvents[property].forEach(event => {
      if (new Date(event.startDate).getTime() > now) {
        upcoming.push(event);
      } else if (new Date(event.endDate).getTime() < now) {
        completed.push(event);
      } else {
        ongoing.push(event);
      }
    });
  }

  return { ongoing, upcoming, completed };
}

export function getNBASchedule(data) {
  const gamesToday = [];
  const upcoming = [];
  const currentDate = new Date();
  const now = Date.now();

  // Sort each team for games not yet completed
  for (const property in data) {
    data[property].games.forEach(game => {
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

export function getEPLSchedule(data) {
  const gamesToday = [];
  const upcoming = [];
  const currentDate = new Date();
  const now = Date.now();

  // Sort each team for games not yet completed
  for (const property in data) {
    data[property].games.forEach(game => {
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

export function getDOTASchedule(data) {
  const ongoing = [];
  const upcoming = [];
  const completed = [];
  const now = Date.now();

  // Sort each team for games not yet completed
  data.forEach(tournament => {
    if (new Date(tournament.startDate).getTime() > now) {
      upcoming.push(tournament);
    } else if (new Date(tournament.endDate).getTime() < now) {
      completed.push(tournament);
    } else {
      ongoing.push(tournament);
    }
  });

  return { ongoing, upcoming, completed };
}

export function isSameDate(dateTestedAgainst, dateToTest) {
  const year = dateTestedAgainst.getFullYear();
  const month = dateTestedAgainst.getMonth();
  const monthDate = dateTestedAgainst.getDate();

  return (dateToTest.getFullYear() == year) &&
    (dateToTest.getMonth() == month) &&
    (dateToTest.getDate() == monthDate);
}
