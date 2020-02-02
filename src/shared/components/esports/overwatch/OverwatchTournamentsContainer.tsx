import * as React from "react";
import { connect } from "react-redux";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { getTournamentName } from "../../../../helpers/utils";
import { getOverwatchTournaments } from "../../../redux/overwatch/overwatch-actions";

import SelectDropdown from "../../common/SelectDropdown";
import { OverwatchState } from "../../../redux/overwatch/overwatch-types";
import { ReduxState } from "../../../redux/redux-state";
import { ESportsTournament } from "../../../../types/esports-api/esports-tournament.model";

interface StateProps {
  overwatch: OverwatchState;
  selectTournament: (any) => void;
}
interface DispatchProps {
  getOverwatchTournaments;
}
type Props = StateProps & DispatchProps;
interface State {
  values: string[];
  tournaments: ESportsTournament[];
}

class OverwatchTournamentsContainer extends React.Component<Props, State> {
  constructor(props) {
    super(props);

    this.state = {
      values: [],
      tournaments: props.overwatch.tournaments
    };
  }

  componentDidMount() {
    const { overwatch } = this.props;
    if (!overwatch.tournaments.length)
      this.props.getOverwatchTournaments().then(data => {
        this.setState({ tournaments: data });
      });
  }

  handleChange = values => {
    // Either get all tournaments when nothing selected in dropdown or
    // get tournaments that include any team that has been selected
    const tournaments = !values.length
      ? this.props.overwatch.tournaments
      : this.props.overwatch.tournaments.filter(tournament => {
          for (let i = 0; i < tournament.teams.length; i++) {
            const team = tournament.teams[i];
            if (values.some(value => value == team.name)) return tournament;
          }
        });

    this.setState({ tournaments });
  };

  getTournamentsForCalendar = (tournaments: ESportsTournament[]) => {
    const events = [] as any[];

    for (let i = 0; i < tournaments.length; i++) {
      const tournament = tournaments[i];

      events.push({
        id: tournament.id,
        title: getTournamentName(tournament),
        start: tournament.beginAt,
        end: tournament.endAt
      });
    }

    return events;
  };

  render() {
    return (
      <div className="section">
        <SelectDropdown
          handleChange={this.handleChange}
          options={this.props.overwatch.teams}
        />
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[dayGridPlugin]}
            events={this.getTournamentsForCalendar(this.state.tournaments)}
            eventClick={this.props.selectTournament}
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  overwatch: state.overwatch
});

const mapDispatchToProps = {
  getOverwatchTournaments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OverwatchTournamentsContainer);
