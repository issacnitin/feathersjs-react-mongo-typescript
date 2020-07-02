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
  loading: boolean;
}

export default class Customers extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      customers: [],
      error: false,
      errorMessage: "",
      loading: true
    }
    this.loadCustomers();
  }

  loadCustomers = async () => {
    let customers = await getCustomers();
    this.setState({
      customers: customers,
      loading: false
    });
  }

  onCustomerClick = (index: number) => {
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
    let jsx = <div>Loading...</div>
    if(!this.state.loading) {
      jsx = <ListGroup>
                  {
                    this.state.customers.length === 0 ?
                      <h3 style={{alignSelf: "center"}}>No customers found</h3>
                      :
                      this.state.customers.map((cx, index) => (
                        <div>
                          <ListGroup.Item action style={{margin: "5px"}} key={index} variant={(index%2 === 0) ? "light":"dark"} onClick={this.onCustomerClick.bind(this, index)}>{cx.firstName} {cx.lastName}</ListGroup.Item>
                        </div>
                      ))
                  }
              </ListGroup>;
    }
    
    return jsx;
  }
}