import * as React from "react";
import TennisMatchup from "./TennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  matchesToShow: TennisMatch[];
}

function TennisRoundLeft({ matchesToShow }: Props) {
  return (
    <div>
      {matchesToShow.map((m, i) => {
        const topOrBotMatchup = i % 2 == 0 ? "top" : "bot";
        return (
          <TennisMatchup key={i} match={m} topOrBotMatchup={topOrBotMatchup} />
        );
      })}
    </div>
  );
}

export default TennisRoundLeft;
