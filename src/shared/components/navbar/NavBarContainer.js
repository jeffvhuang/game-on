import React from 'react';
import { Menu, Icon } from 'antd';
import { appName, paths } from '../../../helpers/constants';
import { Link } from 'react-router-dom';

export default class NavBarContainer extends React.Component {
  state = {
    current: 'app'
  }
  
  handleClick = e => {
    this.setState({ current: e.key });
  }

  render() {
    return (
      <Menu mode="horizontal" onClick={this.handleClick} selectedKeys={[this.state.current]} subMenuOpenDelay={0}>
        <Menu.Item key="app">
          <Link to={paths.LANDING}>
            <Icon type="play-circle" />{appName}
          </Link>
        </Menu.Item>
        <Menu.Item key="highlights">
          <Link to={paths.HIGHLIGHTS}>Highlights</Link>
        </Menu.Item>
        <Menu.SubMenu title="Sports">
          <Menu.Item key="basketball">
            <Link to={paths.SPORTS + paths.BASKETBALL}>Basketball</Link>
          </Menu.Item>
          <Menu.Item key="football">
            <Link to={paths.SPORTS + paths.FOOTBALL}>Football</Link>
          </Menu.Item>
          <Menu.Item key="tennis">
            <Link to={paths.SPORTS + paths.TENNIS}>Tennis</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu title="E-Sports">
          <Menu.Item key="dota">
            <Link to={paths.ESPORTS + paths.DOTA}>Dota 2</Link>
          </Menu.Item>
          <Menu.Item key="lol">
            <Link to={paths.ESPORTS + paths.LOL}>League of Legends</Link>
          </Menu.Item>
          <Menu.Item key="csgo">
            <Link to={paths.ESPORTS + paths.CSGO}>Counter Strike: GO</Link>
          </Menu.Item>
          <Menu.Item key="overwatch">
            <Link to={paths.ESPORTS + paths.OVERWATCH}>Overwatch</Link>
          </Menu.Item>
        </Menu.SubMenu>
        <Menu.Item key="events">
          <Link to={paths.EVENTS}>Events</Link>
        </Menu.Item>
        <Menu.Item key="login" className="right">
          <Link to={paths.LOGIN}>Login</Link>
        </Menu.Item>
      </Menu>
    );
  }
}