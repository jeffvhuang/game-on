import React from 'react';
import { object } from 'prop-types';

export default class SportsPageContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>Sports Page: {this.props.match.params.sport}</h1>
      </div>
    );
  }
}

SportsPageContainer.propTypes = {
  match: object
};
