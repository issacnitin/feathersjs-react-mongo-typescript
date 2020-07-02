import React from 'react';
import { getCustomers } from '../Utilities';
import { Customer } from "../Models/Customers";
import { ListGroup } from "react-bootstrap";

interface IProps {
    setCustomer: (cx: string, cxName: string) => void
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
    if(index === -1) {
      this.props.setCustomer("sampleid", "samplename");
      return;
    }
    if(!this.state.customers[index]._id) {
      this.setState({
        error: true,
        errorMessage: "Customer Id is undefined or null"
      });
      return;
    }
    this.props.setCustomer(this.state.customers[index]._id as string, this.state.customers[index].firstName + " " + this.state.customers[index].lastName);
  } 

  render() {
    return (
      <ListGroup>
          {
            this.state.customers.length === 0 ?
              <h3 style={{alignSelf: "center"}}>No customers found</h3>
              :
              this.state.customers.map((cx, index) => (
                  <ListGroup.Item action key={index} variant={(index%2 === 0) ? "light":"dark"} onClick={this.onCustomerClick.bind(this, index)}>{cx.firstName} {cx.lastName}</ListGroup.Item>
              ))
          }
      </ListGroup>
    );
  }
}