import React from 'react';
import { getCustomers } from './Utilities';
import { Customer } from "./Models/Customers";
import { ListGroup } from "react-bootstrap";

interface IProps {

}

interface IState {
  customers: Array<Customer>;
}

export default class App extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      customers: []
    }
    this.loadCustomers();
  }

  loadCustomers = async () => {
    let customers = await getCustomers();
    this.setState({
      customers: customers
    });
  }

  render() {
    return (
      <div className="App">
        <ListGroup>
          <ListGroup.Item>Test</ListGroup.Item>
          {
            this.state.customers.map((cx) => (
                <ListGroup.Item>{cx.firstName} {cx.lastName}</ListGroup.Item>
            ))
          }
        </ListGroup>
      </div>
    );
  }
}