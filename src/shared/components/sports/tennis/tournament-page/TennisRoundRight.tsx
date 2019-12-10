import * as React from "react";
import NextTennisMatchup from "./NextTennisMatchup";
import { TennisMatch } from "../../../../../types/tennis-api/tennis-match.model";

interface Props {
  matchesToShow: TennisMatch[];
}

function TennisRoundRight({ matchesToShow }: Props) {
  return (
    <div>
      {matchesToShow.map((m, i) => {
        return <NextTennisMatchup key={i} match={m} />;
      })}
    </div>
  );
}

export default TennisRoundRight;
