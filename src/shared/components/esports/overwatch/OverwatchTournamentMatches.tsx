import * as React from 'react';
import { Table } from 'antd';
import { ESportsMatch } from '../../../../types/esports-api/esports-match.model';
import { ReactNode } from 'react';

const { Column } = Table;
interface Props {
  header?: string,
  matches: ESportsMatch[],
  getRow: () => ((record: ESportsMatch, index: number, indent: number, expanded: boolean) => ReactNode) | undefined;
};

function OverwatchTournamentMatches({ header, matches, getRow }: Props) {
  return (
    <div className="list">
      <h2>{header}</h2>
      <Table dataSource={matches} expandedRowRender={getRow()}>
        <Column title="Name" dataIndex="name" key="name" />
        <Column title="Team 1" dataIndex="team1" key="team1" />
        <Column title="Team 2" dataIndex="team2" key="team2" />
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Time" dataIndex="time" key="time" />
      </Table>
    </div>
  );
}

export default OverwatchTournamentMatches;