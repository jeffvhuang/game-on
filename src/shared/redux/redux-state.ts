import { DotaState } from "./dota/dota-types";
import { NbaState } from "./nba/nba-types";
import { EplState } from "./football/epl/epl-types";
import { TennisState } from "./tennis/tennis-types";
import { LolState } from "./lol/lol-types";
import { ChampionsLeagueState } from "./football/champions-league/champions-league-types";
import { EuropaLeagueState } from "./football/europa-league/europa-league-types";

export interface ReduxState {
  nba: NbaState,
  tennis: TennisState,
  epl: EplState,
  championsLeague: ChampionsLeagueState,
  europaLeague: EuropaLeagueState,
  dota: DotaState,
  lol: LolState,
}