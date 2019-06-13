import React from 'react';
import { string, array, func } from 'prop-types';
import { Table } from 'antd';

const { Column } = Table;
LolTournamentMatches.propTypes = {
  header: string,
  matches: array.isRequired,
  getRow: func
};

function LolTournamentMatches({ header, matches, getRow }) {
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

export default LolTournamentMatches;