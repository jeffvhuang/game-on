import { paths, days, months } from './constants';
import { youtubeLogo } from '../../public/assets/Youtube-logo-2017-640x480.png';

// Sleep function to delay tasks to mock delayed api response
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Sorting functions
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
  const beforeToday = [];
  const dateToday = new Date();

  data.forEach(game => {
    const gamesDate = new Date(game.startTimeUTC);

    if (isSameDate(dateToday, gamesDate)) {
      gamesToday.push(game);
    } else if (gamesDate.getTime() > dateToday) {
      upcoming.push(game);
    } else {
      beforeToday.push(game);
    }
  });

  return { gamesToday, upcoming, beforeToday };
}

/**
 * sort schedule to find today and upcoming
 * @param {array} data 
 */
export function sortFootballSchedule(data) {
  const today = [];
  const upcomingGames = [];
  const before = [];
  const dateToday = new Date();

  // Separate into games past, today and upcoming
  data.forEach(game => {
    const gamesDate = new Date(game.eventDate);
    
    // Does not separate between those that are on today but completed
    if (isSameDate(dateToday, gamesDate)) {
      today.push(game);
    } else if (gamesDate.getTime() > dateToday) {
      upcomingGames.push(game);
    } else {
      before.push(game);
    }
  });

  // Sort each one by date
  const gamesToday = sortFootballByDate(today);
  const upcoming = sortFootballByDate(upcomingGames);
  const beforeToday = sortFootballByDate(before);

  return { gamesToday, upcoming, beforeToday };
}

// Sort by date for epl api's data
function sortFootballByDate(data) {
  return data.sort(function(a, b) {
    const dateA = a.eventTimestamp;
    const dateB = b.eventTimestamp;
    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
  });
}

export function sortTennisSchedule(data) {
  const ongoingTournaments = [];
  const upcomingTournaments = [];
  const completedTournaments = [];
  const now = Date.now();

  // Separate tournamentsinto past, ongoing and upcoming
  data.forEach(t => {
    if (new Date(t.currentSeason.startDate) > now) upcomingTournaments.push(t);
    else if (new Date(t.currentSeason.endDate) < now) completedTournaments.push(t);
    else ongoingTournaments.push(t);
  });

  // Sort each one by date
  const ongoing = sortTennisByDate(ongoingTournaments);
  const upcoming = sortTennisByDate(upcomingTournaments);
  const completed = sortTennisByDate(completedTournaments);

  return { ongoing, upcoming, completed };
}

function sortTennisByDate(data) {
  return data.sort(function(a, b) {
    const dateA = a.currentSeason.startDate;
    const dateB = b.currentSeason.startDate;
    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
  });
}

export function sortESportsSchedule(data) {
  const ongoingTournaments = [];
  const upcomingTournaments = [];
  const completedTournaments = [];
  const now = Date.now();

  // Separate tournaments into past, ongoing and upcoming
  data.forEach(t => {
    if (new Date(t.beginAt) > now) upcomingTournaments.push(t);
    else if (new Date(t.endAt) < now) completedTournaments.push(t);
    else ongoingTournaments.push(t);
  });

  // Sort each one by date
  const ongoing = sortESportByDate(ongoingTournaments);
  const upcoming = sortESportByDate(upcomingTournaments);
  const completed = sortESportByDate(completedTournaments);

  return { ongoing, upcoming, completed };
}

function sortESportByDate(data) {
  return data.sort(function(a, b) {
    const dateA = a.beginAt;
    const dateB = b.endAt;
    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
  });
}

/**
 * convert to objects to be used in common dropdown function used across all apis
 * @param {array} teams 
 */
export function convertEplTeamsToArray(teams) {
  const ddTeams = [];
  teams.forEach(t => ddTeams.push({
    fullName: t.name,
    shortName: t.code,
    teamId: t.team_id,
    logo: t.logo
  }));
  return ddTeams;
}

// Methods to create objects from APIs to show in common thumbnails functions
export function createYoutubeThumnailObjects(videos) {
  const thumbnails = [];

  videos.forEach(video => {
    const imgSrc = (video.snippet.thumbnails)
      ? video.snippet.thumbnails.medium.url
      : "https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX26341450.jpg"; 
    thumbnails.push({
      videoId: video.snippet.resourceId.videoId,
      imgSrc: imgSrc,
      title: video.snippet.title
    });
  });
  return thumbnails;
}

/**
 * Check 2 dates are the same
 * @param {Date} dateTestedAgainst 
 * @param {Date} dateToTest 
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

export function createActionStringObjects(actions) {
  const actionObj = {};
  actions.forEach(action => actionObj[action] = action);
  return actionObj;
}

// Date = Date object
export function getDayMonthDate(date) {
  // return if it is not a valid date string or object
  if (!isValidDate) return null;

  // Convert to date if it isn't a date object
  if (date instanceof Date) return days[date.getDay()] + ' ' + months[date.getMonth()] + ' ' + date.getDate();
  else {
    const dateObj = new Date(date);
    return days[dateObj.getDay()] + ' ' + months[dateObj.getMonth()] + ' ' + dateObj.getDate();
  }
}

export function isValidDate(date) {
  return date && Object.prototype.toString.call(date) === "[object Date]" && !isNaN(date);
}
