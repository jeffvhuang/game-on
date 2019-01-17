import React from 'react';
import { object } from 'prop-types';

export default class ESportsPageContainer extends React.Component {
  render() {
    return (
      <div>
        <h1>E-Sports Page: {this.props.match.params.esport}</h1>
      </div>
    );
  }
}

ESportsPageContainer.propTypes = {
  match: object
};
