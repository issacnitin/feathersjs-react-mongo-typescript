import React from 'react';
import { getCustomers } from '../Utilities';
import { Customer } from "../Models/Customers";
import { ListGroup } from "react-bootstrap";

interface IProps {
    setCustomer: (cx: string) => void
}

interface IState {
  customers: Array<Customer>;
  error: boolean;
  errorMessage: string;
}

export default class Customers extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      customers: [],
      error: false,
      errorMessage: ""
    }
    this.loadCustomers();
  }

  loadCustomers = async () => {
    let customers = await getCustomers();
    this.setState({
      customers: customers
    });
  }

  onCustomerClick = (index: number) => {
    if(index == -1) {
      this.props.setCustomer("sampleid");
      return;
    }
    if(!this.state.customers[index]._id) {
      this.setState({
        error: true,
        errorMessage: "Customer Id is undefined or null"
      });
      return;
    }
    this.props.setCustomer(this.state.customers[index]._id as string);
  }

  render() {
    return (
        <ListGroup>
            <ListGroup.Item action variant={"light"}  onClick={this.onCustomerClick.bind(this, -1)}>asd</ListGroup.Item>
            {
            this.state.customers.map((cx, index) => (
                <ListGroup.Item action key={index} variant={(index%2 === 0) ? "light":"dark"} onClick={this.onCustomerClick.bind(this, index)}>{cx.firstName} {cx.lastName}</ListGroup.Item>
            ))
            }
        </ListGroup>    
    );
  }
}