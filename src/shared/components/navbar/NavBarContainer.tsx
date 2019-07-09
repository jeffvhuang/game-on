import * as React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'react-router-dom';

import { appName, paths, sports, esportsTitles } from '../../../helpers/constants';

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;
interface State {
  current: string
}

class NavBarContainer extends React.Component<{}, State> {
  state = {
    current: 'app'
  }
  
  handleClick = e => {
    this.setState({ current: e.key });
  }

  render() {
    return (
      <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]} subMenuOpenDelay={0}>
        <Item key="app">
          <Link to={paths.LANDING}>
            <Icon type="play-circle" />{appName}
          </Link>
        </Item>
        {/* <Item key="highlights">
          <Link to={paths.HIGHLIGHTS}>Highlights</Link>
        </Item> */}
        <SubMenu title="Sports">
          <Item key="basketball">
            <Link to={paths.SPORTS + paths.BASKETBALL}>{sports.BASKETBALL}</Link>
          </Item>
          <Item key="football">
            <Link to={paths.SPORTS + paths.FOOTBALL}>{sports.FOOTBALL}</Link>
          </Item>
          <Item key="tennis">
            <Link to={paths.SPORTS + paths.TENNIS}>{sports.TENNIS}</Link>
          </Item>
        </SubMenu>
        <SubMenu title="E-Sports">
          <Item key="dota">
            <Link to={paths.ESPORTS + paths.DOTA}>{esportsTitles.DOTA}</Link>
          </Item>
          <Item key="lol">
            <Link to={paths.ESPORTS + paths.LOL}>{esportsTitles.LEAGUE}</Link>
          </Item>
          <Item key="csgo">
            <Link to={paths.ESPORTS + paths.CSGO}>{esportsTitles.CSGO}</Link>
          </Item>
          <Item key="overwatch">
            <Link to={paths.ESPORTS + paths.OVERWATCH}>{esportsTitles.OVERWATCH}</Link>
          </Item>
        </SubMenu>
        <Item key="events">
          <Link to={paths.EVENTS}>Events</Link>
        </Item>
        <Item key="login" className="right">
          <Link to={paths.LOGIN}>Login</Link>
        </Item>
      </Menu>
    );
  }
}

export default NavBarContainer;