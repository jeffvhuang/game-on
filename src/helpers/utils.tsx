import { paths, days, months } from './constants';
// import * as youtubeLogo from '../../public/assets/Youtube-logo-2017-640x480.png';
import { NbaSchedule } from '../types/nba-api/nba-schedule.model';
import { FootballSchedule } from '../types/football-api/football-schedule.model';
import { TennisTournament } from '../types/tennis-api/tennis-tournament.model';
import { ESportsTournament } from '../types/esports-api/esports-tournament.model';
import { ESportsTeamBase } from '../types/esports-api/esports-team-base.model';
import { ESportsSeries } from '../types/esports-api/espots-series.model';
import { ESportsMatch } from '../types/esports-api/esports-match.model';

// declare function require(path: string);
const youtubeLogo = require('../../public/assets/Youtube-logo-2017-640x480.png');
export const futureDateString = "Sun Dec 31 2199";
export const futureDate = new Date(futureDateString);

// Sleep function to delay tasks to mock delayed api response
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/** 
 * Sorting functions
 */

// Functions to sort dates from API data
// Sort each team for games not yet completed (today or in future)
// data: array of game objects
export function sortNBASchedule(data: NbaSchedule[]) {
  const gamesToday: NbaSchedule[] = [];
  const upcoming: NbaSchedule[] = [];
  const beforeToday: NbaSchedule[] = [];
  const dateToday = new Date();

  data.forEach(game => {
    const gamesDate = new Date(game.startTimeUTC);

    if (isSameDate(dateToday, gamesDate)) {
      gamesToday.push(game);
    } else if (gamesDate > dateToday) {
      upcoming.push(game);
    } else {
      beforeToday.push(game);
    }
  });

  return { gamesToday, upcoming, beforeToday };
}

/**
 * sort schedule to find matches live, upcoming and recently completed
 * @param {array} data 
 */
export function sortFootballSchedule(matches: FootballSchedule[]) {
  const live: FootballSchedule[] = [];
  const upcoming: FootballSchedule[] = [];
  const completed: FootballSchedule[] = [];
  const now = new Date();
  const dateIn24Hrs = new Date(60 * 60 * 24 * 1000 + now.getTime());
  const date12HrsAgo = new Date(now.getTime() - (60 * 60 * 12 * 1000));

  // Separate into games past, today and upcoming
  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    const startDate = new Date(match.eventDate);
    const isMatchFinished = (match.status == 'Match Finished') ? true : false;

    // Nested if to ensure matches completed and not started do not reach later if blocks
    // last block should be live but ensure it is same date
    if (isMatchFinished) {
      if (startDate > date12HrsAgo) completed.push(match);
    } else if (now < startDate) {
      if (now > dateIn24Hrs) upcoming.push(match);
    } else if (isSameDate(now, startDate)) {
      live.push(match);
    }
  }

  // Sort each one by date
  sortFootballByDate(live);
  sortFootballByDate(upcoming);
  sortFootballByDate(completed);

  return { live, upcoming, completed };
}

// Sort by date for epl api's data
function sortFootballByDate(data: FootballSchedule[]) {
  return data.sort(function (a, b) {
    const dateA = a.eventTimestamp;
    const dateB = b.eventTimestamp;
    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
  });
}

export function sortTennisSchedule(data: TennisTournament[]) {
  const ongoing: TennisTournament[] = [];
  const upcoming: TennisTournament[] = [];
  const completed: TennisTournament[] = [];
  const now = Date.now();

  // Separate tournamentsinto past, ongoing and upcoming
  data.forEach(t => {
    const startDate = (t.currentSeason && t.currentSeason.startDate) ? 
      t.currentSeason.startDate : futureDateString;
    const endDate = (t.currentSeason && t.currentSeason.endDate) ? 
      t.currentSeason.endDate : futureDateString;

    if (new Date(startDate).getTime() > now) upcoming.push(t);
    else if (new Date(endDate).getTime() < now) completed.push(t);
    else ongoing.push(t);
  });

  // Sort each one by date
  sortTennisByDate(ongoing);
  sortTennisByDate(upcoming);
  sortTennisByDate(completed);

  return { ongoing, upcoming, completed };
}

function sortTennisByDate(data: TennisTournament[]) {
  return data.sort(function (a, b) {
    if (a.currentSeason && a.currentSeason.startDate && b.currentSeason && b.currentSeason.startDate) {
      const dateA = a.currentSeason.startDate;
      const dateB = b.currentSeason.startDate;
      return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
    } else if (b.currentSeason && b.currentSeason.startDate && (!a.currentSeason || !a.currentSeason.startDate)) 
      return 1;
    else if (a.currentSeason && a.currentSeason.startDate && (!b.currentSeason || !b.currentSeason.startDate))
      return -1;
    else return 0;
  });
}

export function sortESportsTournaments(data: ESportsTournament[]) {
  const ongoing: ESportsTournament[] = [];
  const upcoming: ESportsTournament[] = [];
  const completed: ESportsTournament[] = [];
  const now = Date.now();
  const teams: ESportsTeamBase[] = [];

  // Separate tournaments into today followed by upcoming and past
  for (let i = 0; i < data.length; i++) {
    const tournament = data[i];
    const beginDate = new Date(tournament.beginAt);
    const endDate = new Date(tournament.endAt);

    if (beginDate.getTime() > now) upcoming.push(tournament);
    else if (endDate.getTime() < now) completed.push(tournament);
    else ongoing.push(tournament);

    // This part collects all teams from the tournaments to be displayed in dropdown
    tournament.teams.forEach(team => {
      // Only add team into teams array if not already in it
      if (!teams.some(t => t.id == team.id)) teams.push(team);
    });
  }

  sortESportByDate(ongoing);
  sortESportByDate(upcoming);
  sortESportByEndDate(completed);
  sortESportTeams(teams);

  return { ongoing, upcoming, completed, teams };
}

export function sortESportsSeries(data: ESportsSeries[]) {
  const ongoingSeries: ESportsSeries[] = [];
  const upcomingSeries: ESportsSeries[] = [];
  const completedSeries: ESportsSeries[] = [];
  const now = Date.now();

  // Separate series into today followed by upcoming and past
  for (let i = 0; i < data.length; i++) {
    const series = data[i];
    const beginDate = (series.beginAt) ? new Date(series.beginAt) : futureDate;    
    const endDate = (series.endAt) ? new Date(series.endAt) : futureDate;

    if (beginDate.getTime() > now) upcomingSeries.push(series);
    else if (endDate.getTime() < now) completedSeries.push(series);
    else ongoingSeries.push(series);
  }

  sortESportByDate(ongoingSeries);
  sortESportByDate(upcomingSeries);
  sortESportByEndDate(completedSeries);

  return { ongoingSeries, upcomingSeries, completedSeries };
}

export function sortESportsMatches(data: ESportsMatch[]) {
  const today: ESportsMatch[] = [];
  const upcoming: ESportsMatch[] = [];
  const past: ESportsMatch[] = [];
  const dateToday = new Date();

  // Separate matches into today followed by upcoming and past
  data.forEach(match => {
    const matchDate = (match.beginAt) ? new Date(match.beginAt) : futureDate;

    if (isSameDate(dateToday, matchDate)) {
      today.push(match);
    } else if (matchDate > dateToday) {
      upcoming.push(match);
    } else {
      past.push(match);
    }
  });

  sortESportByDate(today);
  sortESportByDate(upcoming);
  sortESportByDate(past);

  return { today, upcoming, past };
}

// Sort by descending (most recent dates first)
export function sortESportByDate(
  data: ESportsTournament[] | ESportsSeries[] | ESportsMatch[]) {
  return data.sort(function (a, b) {
    const dateA = a.beginAt;
    const dateB = b.beginAt;
    return (dateA > dateB) ? -1 : (dateA < dateB) ? 1 : 0;
  });
}

export function sortESportByEndDate(
  data: ESportsTournament[] | ESportsSeries[] | ESportsMatch[]) {
  return data.sort(function (a, b) {
    const dateA = a.endAt;
    const dateB = b.endAt;
    return (dateA > dateB) ? -1 : (dateA < dateB) ? 1 : 0;
  });
}

function sortESportTeams(data: ESportsTeamBase[]) {
  return data.sort(function (a, b) {
    const dateA = a.name;
    const dateB = b.name;
    return (dateA < dateB) ? -1 : (dateA > dateB) ? 1 : 0;
  });
}

// data = matches
export function getESportsTeamsFromMatches(data: ESportsMatch[]) {
  const teams: ESportsTeamBase[] = [];
  // loop through all matches
  for (let i = 0; i < data.length; i++) {
    // compare both opponents see whether need to add to array or not
    data[i].opponents.forEach(competitor => {
      // Only add team into teams array if not already in it
      if (!teams.some(t => t.id == competitor.opponent.id))
        teams.push(competitor.opponent);
    });
  }

  return teams;
}

export function getTournamentName(tournament: ESportsTournament) {
  let tournamentName = '';
  if (tournament) {
    if (tournament.league) tournamentName += tournament.league.name + ' ';
    if (tournament.series) {
      if (tournament.series.name != null) {
        tournamentName += tournament.series.name + ' ';
      } else if (tournament.series.fullName != null) {
        tournamentName += tournament.series.fullName + ' ';
      }
    }
      
    tournamentName += tournament.name;
  }
  
  return tournamentName;
}

export function getTournamentNameFromMatch(match) {
  let tournamentName = '';
  if (match) {
    if (match.league) tournamentName += match.league.name + ' ';
    if (match.series) {
      if (match.series.name != null) {
        tournamentName += match.series.name + ' ';
      } else if (match.series.fullName != null) {
        tournamentName += match.series.fullName + ' ';
      }
    }
      
    tournamentName += match.tournament.name;
  }
  
  return tournamentName;
}

/**
 * convert to objects to be used in common dropdown function used across all apis
 * @param {array} teams 
 */
export function convertEplTeamsToArray(teams) {
  const ddTeams: any[] = [];
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
  const thumbnails: any[] = [];

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

export function isSameDate(dateTestedAgainst: Date, dateToTest: Date) {
  const year = dateTestedAgainst.getFullYear();
  const month = dateTestedAgainst.getMonth();
  const monthDate = dateTestedAgainst.getDate();

  return (dateToTest.getFullYear() == year) &&
    (dateToTest.getMonth() == month) &&
    (dateToTest.getDate() == monthDate);
}

// Given a Date object, give the time formatted in 00:00
export function getFormattedTime(date: Date): string {
  const h = (date.getHours() < 10 ? '0' : '') + date.getHours(),
    m = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
  return h + ':' + m;
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

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}
