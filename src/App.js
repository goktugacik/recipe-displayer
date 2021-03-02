import React from "react";
import { Layout } from "antd";
import SearchAndDisplay from "./SearchAndDisplay";

const { Header, Footer, Content } = Layout;

const App = () => (
  <div>
    <Layout>
      <Header>Header</Header>
      <Content>
        <SearchAndDisplay />{" "}
      </Content>
      <Footer>Footer</Footer>
    </Layout>
  </div>
);

export default App;
