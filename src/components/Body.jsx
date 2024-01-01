import React, { Component } from "react";
import { Container } from "react-bootstrap";
import { Route, BrowserRouter as Router } from "react-router-dom";
import { Routes } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Layout from "./Layout";


class Body extends Component {
    render() {
        return(
            <main>
            <Container>
                <Router>
                    <Routes>
                        <Route index element={<Layout />} />
                        <Route path="/home"  element={<Home />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </Router>
            </Container>
            </main>
        );
    }
}

export default Body;