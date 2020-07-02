import * as React from "react";
import { Pagination } from "react-bootstrap";

interface IProps {
    page: number;
    maxPage: number;
    onPageClick: (page: number) => void
}

interface IState {
    
}

export default class PaginationX extends React.Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
    }

    onFirstPageClick = () => {
        this.props.onPageClick(1);
    }

    onPrevPageClick = () => {
        this.props.onPageClick(this.props.page-1);
    }

    onNextPageClick = () => {
        this.props.onPageClick(this.props.page+1);
    }

    onLastPageClick = () => {
        this.props.onPageClick(this.props.maxPage);
    }

    onPageClick = async (page: number) => {
        if(page !== this.props.page) {
            await this.props.onPageClick(page)
        }
    }

    render() {
        return (
            <Pagination size="lg" style={{width: "100%", justifyContent: "center"}}>
                <Pagination.First key="first" onClick={this.onFirstPageClick.bind(this)} />
                <Pagination.Prev key="prev" onClick={this.onPrevPageClick.bind(this)}/>
                <Pagination.Item key={this.props.page-2} onClick={this.onPageClick.bind(this, this.props.page-2)}>{this.props.page-2 > 0 ? this.props.page-2 : "-"}</Pagination.Item> 
                <Pagination.Item key={this.props.page-1} onClick={this.onPageClick.bind(this, this.props.page-1)}>{this.props.page-1 > 0 ? this.props.page-1 : "-" }</Pagination.Item>
                <Pagination.Item key={this.props.page} active>{this.props.page}</Pagination.Item>
                <Pagination.Item key={this.props.page+1} onClick={this.onPageClick.bind(this, this.props.page+1)}>{this.props.page+1 <= this.props.maxPage ? this.props.page+1 : "-"}</Pagination.Item>
                <Pagination.Item key={this.props.page+2} onClick={this.onPageClick.bind(this, this.props.page+2)}>{this.props.page+2 <= this.props.maxPage ? this.props.page+2 : "-"}</Pagination.Item>
                <Pagination.Next key="next" onClick={this.onNextPageClick.bind(this)}/>
                <Pagination.Last key="last" onClick={this.onLastPageClick.bind(this)}/> 
            </Pagination>
        )
    }
}