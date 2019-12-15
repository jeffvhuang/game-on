import { days, months } from "./constants";
import { NbaSchedule } from "../types/nba-api/nba-schedule.model";
import { FootballSchedule } from "../types/football-api/football-schedule.model";
import { TennisTournament } from "../types/tennis-api/tennis-tournament.model";
import { ESportsTournament } from "../types/esports-api/esports-tournament.model";
import { ESportsTeamBase } from "../types/esports-api/esports-team-base.model";
import { ESportsSeries } from "../types/esports-api/espots-series.model";
import { ESportsMatch } from "../types/esports-api/esports-match.model";
import { TennisMatch } from "../types/tennis-api/tennis-match.model";
import { FootballSortedSchedule } from "../types/football-api/football-sorted-schedule.model";
import { TennisSortedMatches } from "../types/tennis-api/tennis-sorted-matches.model";
import { RoundMatches } from "../types/tennis-api/round-matches.model";

export const futureDateString = "Sun Dec 31 2199";
export const futureDate = new Date(futureDateString);

// Sleep function to delay tasks to mock delayed api response
export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//#region sorting

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

  sortNbaByDateDescending(beforeToday);

  return { gamesToday, upcoming, beforeToday };
}

function sortNbaByDateDescending(data: NbaSchedule[]) {
  return data.sort(function(a, b) {
    const dateA = a.startTimeUTC;
    const dateB = b.startTimeUTC;
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  });
}

/**
 * sort schedule to find matches today, upcoming and recently completed
 * @param {array} data
 */
export function sortFootballSchedule(
  matches: FootballSchedule[]
): FootballSortedSchedule {
  const today: FootballSchedule[] = [];
  const upcoming: FootballSchedule[] = [];
  const completed: FootballSchedule[] = [];
  const now = new Date();

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];
    const startDate = new Date(match.eventDate);

    if (isSameDate(now, startDate)) {
      today.push(match);
    } else if (now > startDate) {
      completed.push(match);
    } else {
      upcoming.push(match);
    }
  }

  // Sort each one by date
  sortFootballByDate(today);
  sortFootballByDate(upcoming);
  sortFootballByDateDescending(completed);

  return { today, upcoming, completed };
}

// Sort in ascending order
function sortFootballByDate(data: FootballSchedule[]) {
  return data.sort(function(a, b) {
    const dateA = a.eventTimestamp;
    const dateB = b.eventTimestamp;
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });
}

function sortFootballByDateDescending(data: FootballSchedule[]) {
  return data.sort(function(a, b) {
    const dateA = a.eventTimestamp;
    const dateB = b.eventTimestamp;
    return dateA < dateB ? 1 : dateA > dateB ? -1 : 0;
  });
}

// sort matches into recently completed, live and upcoming.
export function sortTennisMatches(matches: TennisMatch[]): TennisSortedMatches {
  const live: TennisMatch[] = [];
  const upcoming: TennisMatch[] = [];
  const completed: TennisMatch[] = [];
  // const now = Date.now();
  const now = new Date();
  const dateIn24Hrs = new Date(60 * 60 * 24 * 1000 + now.getTime());
  const date12HrsAgo = new Date(now.getTime() - 60 * 60 * 12 * 1000);

  for (let i = 0; i < matches.length; i++) {
    const match = matches[i];

    const startDate = new Date(match.scheduled);
    const isMatchFinished = match.status == "closed" ? true : false;

    // Nested if to ensure matches completed and not started do not reach later if blocks
    // last block should be live but ensure it is same date
    if (isMatchFinished) {
      if (startDate > date12HrsAgo) completed.push(match);
    } else if (now < startDate) {
      if (startDate < dateIn24Hrs) upcoming.push(match);
    } else if (isSameDate(now, startDate)) {
      live.push(match);
    }
  }

  return { live, upcoming, completed };
}

export function sortTennisSchedule(data: TennisTournament[]) {
  const ongoing: TennisTournament[] = [];
  const upcoming: TennisTournament[] = [];
  const completed: TennisTournament[] = [];
  const now = Date.now();

  // Separate tournamentsinto past, ongoing and upcoming
  data.forEach(t => {
    const startDate =
      t.currentSeason && t.currentSeason.startDate
        ? t.currentSeason.startDate
        : futureDateString;
    const endDate =
      t.currentSeason && t.currentSeason.endDate
        ? t.currentSeason.endDate
        : futureDateString;

    if (new Date(startDate).getTime() > now) upcoming.push(t);
    else if (new Date(endDate).getTime() < now) completed.push(t);
    else ongoing.push(t);
  });

  // Sort each one by date
  sortTennisByDate(ongoing);
  sortTennisByDate(upcoming);
  sortTennisByDateDescending(completed);

  return { ongoing, upcoming, completed };
}

function sortTennisByDate(data: TennisTournament[]) {
  return data.sort(function(a, b) {
    if (
      a.currentSeason &&
      a.currentSeason.startDate &&
      b.currentSeason &&
      b.currentSeason.startDate
    ) {
      const dateA = a.currentSeason.startDate;
      const dateB = b.currentSeason.startDate;
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    } else if (
      b.currentSeason &&
      b.currentSeason.startDate &&
      (!a.currentSeason || !a.currentSeason.startDate)
    )
      return 1;
    else if (
      a.currentSeason &&
      a.currentSeason.startDate &&
      (!b.currentSeason || !b.currentSeason.startDate)
    )
      return -1;
    else return 0;
  });
}

function sortTennisByDateDescending(data: TennisTournament[]) {
  return data.sort(function(a, b) {
    if (
      a.currentSeason &&
      a.currentSeason.startDate &&
      b.currentSeason &&
      b.currentSeason.startDate
    ) {
      const dateA = a.currentSeason.startDate;
      const dateB = b.currentSeason.startDate;
      return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
    } else if (
      b.currentSeason &&
      b.currentSeason.startDate &&
      (!a.currentSeason || !a.currentSeason.startDate)
    )
      return -1;
    else if (
      a.currentSeason &&
      a.currentSeason.startDate &&
      (!b.currentSeason || !b.currentSeason.startDate)
    )
      return 1;
    else return 0;
  });
}

export function sortTennisScheduleIntoRounds(
  schedule: TennisMatch[]
): RoundMatches[] {
  const roundMatches: RoundMatches[] = [];
  // Create rounds and separate the matches into their rounds
  for (let i = 0; i < schedule.length; i++) {
    // Only include the match if round data available and not cancelled
    if (schedule[i].tournamentRound && schedule[i].status !== "cancelled") {
      const round = schedule[i].tournamentRound.name;
      if (round && round !== "qualification") {
        const roundMatch = roundMatches.find(r => r.round == round);
        // Create a new roundMatch object to store matches if it does not exist yet in array
        if (!roundMatch) roundMatches.push({ round, matches: [schedule[i]] });
        else roundMatch.matches.push(schedule[i]);
      }
    }
  }

  return roundMatches;
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
    const beginDate = series.beginAt ? new Date(series.beginAt) : futureDate;
    const endDate = series.endAt ? new Date(series.endAt) : futureDate;

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
    const matchDate = match.beginAt ? new Date(match.beginAt) : futureDate;

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
  data: ESportsTournament[] | ESportsSeries[] | ESportsMatch[]
) {
  return data.sort(function(a, b) {
    const dateA = a.beginAt;
    const dateB = b.beginAt;
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  });
}

export function sortESportByEndDate(
  data: ESportsTournament[] | ESportsSeries[] | ESportsMatch[]
) {
  return data.sort(function(a, b) {
    const dateA = a.endAt;
    const dateB = b.endAt;
    return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
  });
}

function sortESportTeams(data: ESportsTeamBase[]) {
  return data.sort(function(a, b) {
    const dateA = a.name;
    const dateB = b.name;
    return dateA < dateB ? -1 : dateA > dateB ? 1 : 0;
  });
}
//#endregion

//#region sport specific conversion methods
export function getTennisRoundName(roundName: string): string {
  const parts = roundName.split("_");
  return parts.map(p => capitalise(p)).join(" ");
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
  let tournamentName = "";
  if (tournament) {
    if (tournament.league) tournamentName += tournament.league.name + " ";
    if (tournament.series) {
      if (tournament.series.name != null) {
        tournamentName += tournament.series.name + " ";
      } else if (tournament.series.fullName != null) {
        tournamentName += tournament.series.fullName + " ";
      }
    }

    tournamentName += tournament.name;
  }

  return tournamentName;
}

export function getTournamentNameFromMatch(match) {
  let tournamentName = "";
  if (match) {
    if (match.league) tournamentName += match.league.name + " ";
    if (match.series) {
      if (match.series.name != null) {
        tournamentName += match.series.name + " ";
      } else if (match.series.fullName != null) {
        tournamentName += match.series.fullName + " ";
      }
    }

    tournamentName += match.tournament.name;
  }

  return tournamentName;
}

export function getEsportsTournamentsForCalendar(
  tournaments: ESportsTournament[]
) {
  const events = [] as any[];

  for (let i = 0; i < tournaments.length; i++) {
    const tournament = tournaments[i];

    events.push({
      id: tournament.id,
      title: getTournamentName(tournament),
      start: tournament.beginAt,
      end: tournament.endAt
    });
  }

  return events;
}

/**
 * convert to objects to be used in common dropdown function used across all apis
 * @param {array} teams
 */
export function convertEplTeamsToArray(teams) {
  const ddTeams: any[] = [];
  teams.forEach(t =>
    ddTeams.push({
      fullName: t.name,
      shortName: t.code,
      teamId: t.team_id,
      logo: t.logo
    })
  );
  return ddTeams;
}
//#endregion

//#region miscellaneous helper methods
export function isSameDate(dateTestedAgainst: Date, dateToTest: Date) {
  return (
    dateToTest.getFullYear() == dateTestedAgainst.getFullYear() &&
    dateToTest.getMonth() == dateTestedAgainst.getMonth() &&
    dateToTest.getDate() == dateTestedAgainst.getDate()
  );
}

// Given a Date object, give the time formatted in 00:00
export function getFormattedTime(date: Date | null): string {
  if (!date) return "";

  const h = date.getHours() < 13 ? date.getHours() : date.getHours() - 12,
    m = (date.getMinutes() < 10 ? "0" : "") + date.getMinutes(),
    meridiem = date.getHours() < 12 ? "am" : "pm";
  return `${h}:${m} ${meridiem}`;
}

/**
 * return in format "Wed Feb 1"
 * @param dateString format: "2015-10-25"
 */

export function getDayMonthDateFromReverseFormat(
  dateString: string | null
): string {
  if (!dateString) return "";
  const dateParts = dateString.split("-");
  if (dateParts.length != 3) return "";
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]);
  const monthDate = parseInt(dateParts[2]);
  const date = new Date(year, month - 1, monthDate);
  return (
    days[date.getDay()] + " " + months[date.getMonth()] + " " + date.getDate()
  );
}

export function getDayMonthDate(date: string) {
  // return if it is not a valid date string or object
  // if (!isValidDate(date)) return null;
  const d = new Date(date);

  return `${days[d.getDay()]} ${months[d.getMonth()]} ${d.getDate()}`;
}

// return format: Wed, 21st Nov
export function getDateWithOrdinal(d: Date): string {
  return `${days[d.getDay()]}, ${getNumberWithOrdinal(d.getDate())} ${
    months[d.getMonth()]
  }`;
}

export function isValidDate(d: string) {
  return Object.prototype.toString.call(d) === "[object Date]";
}

export function uuidv4() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0,
      v = c == "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function getNumberWithOrdinal(n) {
  var s = ["th", "st", "nd", "rd"],
    v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function capitalise(word: string) {
  return word.charAt(0).toUpperCase() + word.substring(1).toLowerCase();
}
//#endregion
