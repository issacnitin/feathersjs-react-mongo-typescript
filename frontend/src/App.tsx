import React from 'react';
import Customers from "./Pages/Customers";
import Orders from "./Pages/Orders";
import Analytics from "./Pages/Analytics";
import './App.css';

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
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      page: Page.CUSTOMERS,
      cxId: ""
    }
  }

  setCustomer = (cx: string) => {
    this.setState({
      page: Page.ORDERS,
      cxId: cx
    });
  }

  render() {
    let jsx : JSX.Element;
    switch(this.state.page) {
      case Page.CUSTOMERS:
        jsx = <Customers setCustomer={this.setCustomer} />;
        break;
      case Page.ORDERS:
        jsx = <Orders customerId={this.state.cxId}/>;
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
        <div className="AppInner">
          {jsx}
        </div>
      </div>
    );
  }
}