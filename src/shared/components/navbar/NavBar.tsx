import * as React from "react";
import { Menu, Icon } from "antd";
import { Link } from "react-router-dom";

import { appName, paths } from "../../../helpers/constants";

const Item = Menu.Item;
const SubMenu = Menu.SubMenu;
const ItemGroup = Menu.ItemGroup;
interface State {
  current: string;
}

class NavBar extends React.Component<{}, State> {
  state = {
    current: "app"
  };

  handleClick = e => {
    this.setState({ current: e.key });
  };

  render() {
    return (
      <Menu
        mode="horizontal"
        onClick={this.handleClick}
        selectedKeys={[this.state.current]}
        subMenuOpenDelay={0}
      >
        <Item key="app">
          <Link to={paths.LANDING}>
            <Icon type="play-circle" />
            {appName}
          </Link>
        </Item>
        <SubMenu title="Sports">
          <Item key="basketball">
            <Link to={paths.SPORTS + paths.BASKETBALL}>Basketball</Link>
          </Item>
          <ItemGroup title="Football">
            <Item key="epl">
              <Link to={`${paths.SPORTS}${paths.FOOTBALL}/epl`}>
                English Premier League
              </Link>
            </Item>
            <Item key="europaleague">
              <Link to={`${paths.SPORTS}${paths.FOOTBALL}/europaleague`}>
                Europa League
              </Link>
            </Item>
            <Item key="championsleague">
              <Link to={`${paths.SPORTS}${paths.FOOTBALL}/championsleague`}>
                Champions League
              </Link>
            </Item>
          </ItemGroup>
          <Item key="tennis">
            <Link to={paths.SPORTS + paths.TENNIS}>Tennis</Link>
          </Item>
        </SubMenu>
        <SubMenu title="Esports">
          <Item key="dota">
            <Link to={paths.ESPORTS + paths.DOTA}>DOTA 2</Link>
          </Item>
          <Item key="lol">
            <Link to={paths.ESPORTS + paths.LOL}>League of Legends</Link>
          </Item>
          <Item key="csgo">
            <Link to={paths.ESPORTS + paths.CSGO}>Counter Strike: GO</Link>
          </Item>
          <Item key="overwatch">
            <Link to={paths.ESPORTS + paths.OVERWATCH}>Overwatch</Link>
          </Item>
        </SubMenu>
        {/* <Item key="events">
          <Link to={paths.EVENTS}>Events</Link>
        </Item> */}
        {/* <Item key="login" className="right">
          <Link to={paths.LOGIN}>Login</Link>
        </Item> */}
      </Menu>
    );
  }
}

export default NavBar;
