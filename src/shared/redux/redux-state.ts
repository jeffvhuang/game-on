import { DotaState } from "./dota/dota-types";
import { NbaState } from "./nba/nba-types";
import { FootballState } from "./football/football-types";
import { TennisState } from "./tennis/tennis-types";
import { LolState } from "./lol/lol-types";
import { CsgoState } from "./csgo/csgo-types";
import { OverwatchState } from "./overwatch/overwatch-types";
import { GeneralState } from "./general/general-types";

export interface ReduxState {
  general: GeneralState;
  nba: NbaState;
  tennis: TennisState;
  epl: FootballState;
  championsLeague: FootballState;
  europaLeague: FootballState;
  dota: DotaState;
  lol: LolState;
  csgo: CsgoState;
  overwatch: OverwatchState;
}
