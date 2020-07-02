import * as React from "react";
import { Table } from "react-bootstrap";
import { Order } from "../Models/Order";
import { getOrders } from "../Utilities";
import PaginationX from "../Components/Pagination";

interface IProps {
  customerId: string;
  customerName: string;
}

interface IState {
    cxName: string,
    cxId: string,
    orders: Array<Order>,
    loading: boolean,
    page: number,
    maxPage: number
}

export default class Orders extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        cxName: this.props.customerName,
        cxId: this.props.customerId,
        orders: [],
        loading: true,
        page: 1,
        maxPage: 1
    }
    this.loadOrders(1);
  }

  loadOrders = async (page: number) => {
    let res = await getOrders(this.state.cxId, page);
    console.log(res.maxPage)
    this.setState({
        orders: res.data,
        page: page,
        maxPage: res.maxPage,
        loading: false
    });
  }

  getDate = (date: Date) => {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }

  onPageClick = async (page: number) => {
    if(page !== this.state.page && page > 0 && page <= this.state.maxPage) {
      await this.loadOrders(page);
    }
  }

  render() {
    let jsx = <div>Loading...</div>
    if(!this.state.loading) {
      jsx = <div >
            {
                this.state.orders.length === 0 ?
                <h3 style={{alignSelf: "center"}}>No Orders found for customer {this.state.cxName}</h3>
                :
                <Table responsive variant="dark">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Time</th>
                            <th>Product</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total Price</th>
                        </tr>
                    </thead>
                    <tbody>
                    {
                        this.state.orders.map((el, index) => 
                        (
                            <tr>
                                <td>{index+1+(this.state.page-1)*25}</td>
                                <td>{this.getDate(new Date(el.timestamp!))}</td>
                                <td>{el.product}</td>
                                <td>{el.price}</td>
                                <td>{el.quantity}</td>
                                <td>{(el.price as number)*(el.quantity as number)}</td>
                            </tr>
                        ))
                    }
                    </tbody>
                </Table>
            }
            <PaginationX onPageClick={this.onPageClick} page={this.state.page} maxPage={this.state.maxPage}/>
            </div>
    }
    return jsx;
  }
}
