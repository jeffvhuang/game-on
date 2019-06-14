import * as React from "react";
import Routes from './Routes';
import NavBarContainer from './components/navbar/NavBarContainer';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="content-wrapper">
        <Header className="header">
          <NavBarContainer />
        </Header>
        <Content>
          <Routes />
        </Content>
        <Footer className="text-center">
          Game On ©2019 Created by Jeffrey Huang
        </Footer>
      </Layout>
    );
  }
}

export default App;