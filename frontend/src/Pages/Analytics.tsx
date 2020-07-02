import * as React from "react";
import { Table } from "react-bootstrap";
import { getAnalytics } from "../Utilities";
import { AnalyticsData } from "../Models/Analytics";

interface IProps {
    
}

interface IState {
    data: Array<AnalyticsData>
}

export default class Analytics extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
        data: []
    }
    this.loadOrders();
  }

  loadOrders = async () => {
    let data : Array<AnalyticsData> = await getAnalytics();
    data.sort((a, b) => {return a.day! - b.day!})
    this.setState({
        data: data
    });
  }

  render() {
    return (
      <div >
        {
        this.state.data.length === 0 ?
          <h3 style={{alignSelf: "center"}}>No Analytics found</h3>
            :
          <Table responsive variant="dark">
              <thead>
                  <tr>
                      <th>Day #</th>
                      <th>Orders</th>
                      <th>Total Price</th>
                  </tr>
              </thead>
                <tbody>
                {
                    this.state.data.map((el, index) => 
                    (
                        <tr>
                            <td>{el.day}</td>
                            <td>{el.count}</td>
                            <td>{el.sum}</td>
                        </tr>
                    ))
                }
                </tbody>
          </Table>
        }
      </div>
    );
  }
}
