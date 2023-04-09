import React from "react";
import Layout from "../components/Apps/shared/Layout";
import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

function Home() {
  return <Layout>

   <Container fluid>
   {/* create a jumbotron with bootstrap */}
    <div className="jumbotron">
      <h1 className="display-4">Hello, world!</h1>
      <p className="lead">

        This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      <p>It uses utility classes for typography and spacing to space content out within the larger container.</p>
      <Link className="btn btn-primary btn-lg" to="#" role="button">Learn more</Link>
    </div>
    </Container>



  </Layout>;
}

export default Home;
