import { Alert } from "react-bootstrap";


const ErrorAlert = ({ text }) => (
  <Alert variant="danger">{text}</Alert>
);

export default ErrorAlert
