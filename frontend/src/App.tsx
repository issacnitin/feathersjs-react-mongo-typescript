import React from 'react';
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import Analytics from "./Pages/Analytics";
import './App.css';
import Header from "./Header";

enum Page{
  CUSTOMERS,
  ORDERS,
  ANALYICS
}

interface IProps {

}

interface IState {
  page: Page;
  cxId: string;
  cxName: string;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      page: Page.CUSTOMERS,
      cxId: "",
      cxName: ""
    }
  }

  setHome = () => {
    this.setState({
      page: Page.CUSTOMERS
    });
  }

  setCustomer = (cx: string, cxName: string) => {
    this.setState({
      page: Page.ORDERS,
      cxId: cx,
      cxName: cxName
    });
  }

  setAnalytics = () => {
    this.setState({
      page: Page.ANALYICS
    });
  }

  render() {
    let jsx : JSX.Element;
    switch(this.state.page) {
      case Page.CUSTOMERS:
        jsx = <Customers setCustomer={this.setCustomer} />;
        break;
      case Page.ORDERS:
        jsx = <Orders customerName={this.state.cxName} customerId={this.state.cxId}/>;
        break;
      case Page.ANALYICS:
        jsx = <Analytics />;
        break;
      default:
        jsx = <Customers setCustomer={this.setCustomer} />;
        break;
    }
    return (
      <div className="App">
        <Header setAnalytics={this.setAnalytics} setHome={this.setHome}/>
        <div style={{width:"80%", padding: "20px", marginLeft: "auto", marginRight: "auto"}}>
          {jsx}
        </div>
      </div>
    );
  }
}