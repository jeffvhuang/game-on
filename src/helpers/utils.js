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

// Initial seed data functions to sort dates
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

// Functions to sort dates from API data
// Sort each team for games not yet completed (today or in future)
// data: array of game objects
export function sortNBASchedule(data) {
  const gamesToday = [];
  const upcoming = [];
  const dateToday = new Date();
  const now = Date.now();

  data.forEach(game => {
    const gamesDate = new Date(game.startTimeUTC);
    if (isSameDate(dateToday, gamesDate)) {
      gamesToday.push(game);
    } else if (gamesDate.getTime() > now) {
      upcoming.push(game);
    }
  });

  return { gamesToday, upcoming };
}

/* Function check 2 dates are the same
* dateTestedAgainst: Date object
* dateToTest: Date object
*/
export function isSameDate(dateTestedAgainst, dateToTest) {
  const year = dateTestedAgainst.getFullYear();
  const month = dateTestedAgainst.getMonth();
  const monthDate = dateTestedAgainst.getDate();

  return (dateToTest.getFullYear() == year) &&
    (dateToTest.getMonth() == month) &&
    (dateToTest.getDate() == monthDate);
}

// Given a Date object, give the time formatted in 00:00
export function getFormattedTime(date) {
  const h = (date.getHours()<10?'0':'') + date.getHours(),
    m = (date.getMinutes()<10?'0':'') + date.getMinutes();
  return h + ':' + m;
}
