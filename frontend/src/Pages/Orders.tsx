import * as React from "react";
import { Table } from "react-bootstrap";
import { Order } from "../Models/Order";
import { getOrders } from "../Utilities";

interface IProps {
  customerId: string;
  customerName: string;
}

interface IState {
    cxName: string,
    cxId: string,
    orders: Array<Order>,
    loading: boolean
}

export default class Orders extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        cxName: this.props.customerName,
        cxId: this.props.customerId,
        orders: [],
        loading: true
    }
    this.loadOrders();
  }

  loadOrders = async () => {
    let orders = await getOrders(this.state.cxId);
    this.setState({
        orders: orders,
        loading: false
    });
  }

  getDate = (date: Date) => {
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
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
                                <td>{index+1}</td>
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
            </div>
    }
    return jsx;
  }
}
