import React from "react";
import { MDBDataTable } from "mdbreact";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap-css-only/css/bootstrap.min.css";
import "mdbreact/dist/css/mdb.css";

const DatatablePage = (props) => {
  return <MDBDataTable striped bordered small data={props.data} />;
};

export default DatatablePage;
