import React from "react";
import { Layout } from "antd";
import SearchAndDisplay from "./SearchAndDisplay";
import RecipeDetail from "./RecipeDetail";
import CategoryDetail from "./CategoryDetail";
import { Link, Route, BrowserRouter, Switch } from "react-router-dom";
import Logo from "./assets/logo.jpg";

const { Header, Footer, Content } = Layout;

const App = () => (
  <div>
    <BrowserRouter>
      <Layout>
        <Header className="header">
          <Link to="/">
            <img className="logo fade" src={Logo} alt="Logo"></img>
          </Link>
        </Header>

        <Switch>
          <Route exact path="/">
            <Content className="content">
              <SearchAndDisplay />
            </Content>
          </Route>

          <Route exact path="/recipe/:id">
            <Content className="content">
              <RecipeDetail />
            </Content>
          </Route>

          <Route exact path="/category/:category">
            <Content className="content">
              <CategoryDetail />
            </Content>
          </Route>
        </Switch>

        <Footer>Footer</Footer>
      </Layout>
    </BrowserRouter>
  </div>
);

export default App;
