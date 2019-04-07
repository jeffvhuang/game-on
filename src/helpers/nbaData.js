// Third party APIs
// APi from official NBA but CORS blocked
// export const nbaAPI = {
//   HOST: 'http://data.nba.net/10s',
//   SCHEDULE: '/prod/v1/2018/schedule.json'
// };

// API from Rapidapi.com
export const nbaAPI = {
  HOST: 'https://api-nba-v1.p.rapidapi.com',
  SCHEDULE: '/games/seasonYear' + '/2018',
  TEAMS: '/teams/league/standard'
};
