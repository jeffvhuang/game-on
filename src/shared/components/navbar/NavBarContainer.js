import React from 'react';
import { Menu, Icon } from 'antd';
import { appName } from '../../../helpers/constants';

export default class NavBarContainer extends React.Component {
  render() {
    return (
      <Menu>
        <Menu.Item>
          <Icon type="play-circle" />{appName}
        </Menu.Item>
        <Menu.Item>Highlights</Menu.Item>
        <Menu.SubMenu>
          Sports
          <Menu.Item>Basketball</Menu.Item>
          <Menu.Item>Football</Menu.Item>
          <Menu.Item>Tennis</Menu.Item>
        </Menu.SubMenu>
        <Menu.SubMenu>
          E-Sports
          <Menu.Item>Dota 2</Menu.Item>
          <Menu.Item>League of Legends</Menu.Item>
          <Menu.Item>Counter Strike: GO</Menu.Item>
          <Menu.Item>Overwatch</Menu.Item>
        </Menu.SubMenu>
        <Menu.Item>Events</Menu.Item>
        <Menu.Item>Login</Menu.Item>
      </Menu>
    );
  }
}