import * as React from "react";
import Routes from './Routes';
import NavBar from './components/navbar/NavBar';
import { Layout } from 'antd';

const { Header, Content, Footer } = Layout;

class App extends React.Component {
  render() {
    return (
      <Layout className="content-wrapper">
        <Header className="header">
          <NavBar />
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