import { DotaState } from "./dota/dota-types";
import { NbaState } from "./nba/nba-types";
import { EplState } from "./football/epl/epl-types";
import { TennisState } from "./tennis/tennis-types";
import { LolState } from "./lol/lol-types";
import { ChampionsLeagueState } from "./football/champions-league/champions-league-types";
import { EuropaLeagueState } from "./football/europa-league/europa-league-types";
import { CsgoState } from "./csgo/csgo-types";
import { OverwatchState } from "./overwatch/overwatch-types";
import { GeneralState } from "./general/general-types";

export interface ReduxState {
  general: GeneralState,
  nba: NbaState,
  tennis: TennisState,
  epl: EplState,
  championsLeague: ChampionsLeagueState,
  europaLeague: EuropaLeagueState,
  dota: DotaState,
  lol: LolState,
  csgo: CsgoState,
  overwatch: OverwatchState,
}