import * as React from "react";
import { Table } from "react-bootstrap";
import { Order } from "../Models/Order";
import { getOrders } from "../Utilities";

interface IProps {
  customerId: string;
}

interface IState {
    cxId: string,
    orders: Array<Order>
}

export default class Orders extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        cxId: this.props.customerId,
        orders: []
    }
    this.loadOrders();
  }

  loadOrders = async () => {
    let orders = await getOrders();
    this.setState({
        orders: orders
    });
  }

  render() {
    return (
      <div >
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
                        <td>{el.timestamp?.getDate()}</td>
                        <td>{el.product}</td>
                        <td>{el.price}</td>
                        <td>{el.quantity}</td>
                        <td>{(el.price as number)*(el.quantity as number)}</td>
                    </tr>
                ))
            }
            </tbody>
        </Table>
      </div>
    );
  }
}
