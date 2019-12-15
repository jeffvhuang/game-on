import * as React from "react";

import DotaSeriesContainer from "./DotaSeriesContainer";

class DotaPage extends React.Component {
  render() {
    return (
      <div>
        <div className="page-header">
          <h1>Dota 2</h1>
        </div>
        <DotaSeriesContainer />
      </div>
    );
  }
}

export default DotaPage;
