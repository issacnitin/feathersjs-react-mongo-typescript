import React from 'react';
import { getCustomers } from '../Utilities';
import { Customer } from "../Models/Customers";
import { Table, Button } from "react-bootstrap";
import "./Customers.css";
import PaginationX from "../Components/Pagination";

interface IProps {
    setCustomer: (cx: string, cxName: string) => void
}

interface IState {
  customers: Array<Customer>;
  error: boolean;
  errorMessage: string;
  loading: boolean;
  page: number;
  maxPage: number;
}

export default class Customers extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      customers: [],
      error: false,
      errorMessage: "",
      loading: true,
      page: 1,
      maxPage: 25
    }
    this.loadCustomers(1);
  }

  loadCustomers = async (page: number) => {
    let res = await getCustomers(page);
    this.setState({
      customers: res.data,
      page: page,
      maxPage: res.maxPage,
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

  onPageClick = async (page: number) => {
    if(page !== this.state.page && page > 0 && page <= this.state.maxPage) {
      await this.loadCustomers(page);
    }
  }

  render() {
    let jsx = <div>Loading...</div>
    if(!this.state.loading) {
      jsx = <div>
            <Table responsive variant="dark">
                <thead>
                  <tr>
                      <th>#</th>
                      <th>Name</th>
                      <th></th>
                  </tr>
                </thead>
                  {
                    this.state.customers.length === 0 ?
                      <h3 style={{alignSelf: "center"}}>No customers found</h3>
                      :
                      this.state.customers.map((cx, index) => (
                        <tr key={index}>
                          <td>{index+1 + (this.state.page-1)*25}</td>
                          <td>{cx.firstName} {cx.lastName}</td>
                          <td><Button className="Button" onClick={this.onCustomerClick.bind(this, index)}>View Orders</Button></td>
                        </tr>
                      ))
                  }
              </Table>
              <PaginationX onPageClick={this.onPageClick} page={this.state.page} maxPage={this.state.maxPage}/>
            </div>
    }
    
    return jsx;
  }
}