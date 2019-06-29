import { ESportsTeamBase } from "./esports-team-base.model";
import { ESportsPlayer } from "./esports-player.model";
import { ESportsVideoGame } from "./esports-video-game.model";

export interface ESportsTeam extends ESportsTeamBase {
  players: ESportsPlayer[];
  videoGame: ESportsVideoGame;
}