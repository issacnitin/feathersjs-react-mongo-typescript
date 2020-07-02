import * as React from "react";
import { Navbar, Nav } from "react-bootstrap";

interface IProps {
    setHome : () => void,
    setAnalytics: () => void
}

interface IState {

}

export default class Header extends React.Component<IProps, IState> {
    constructor(props: IProps) {
        super(props)
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" sticky="top" expand="lg">
                <Navbar.Brand href="#home">Management Portal</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">
                    <Nav.Link onClick={this.props.setHome} href="#home">Home</Nav.Link>
                    <Nav.Link onClick={this.props.setAnalytics} href="#analytics">Analytics</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}