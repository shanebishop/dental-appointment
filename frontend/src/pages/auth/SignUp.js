import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input
} from "reactstrap";

const SignUp = () => (
  <React.Fragment>
    <div className="text-center mt-4">
      <h1 className="h2">Complete registration</h1>
    </div>

    <Card>
      <CardBody>
        <div className="m-sm-4">
          <Form>
            <FormGroup>
              <Label>Email</Label>
              <Input
                bsSize="lg"
                type="email"
                name="email"
                placeholder="Enter your email"
              />
            </FormGroup>
            {/*TODO Should create tooltip for this*/}
            <FormGroup>
              <Label>Register token</Label>
              <Input
                bsSize="lg"
                type="password"
                name="register-token"
                placeholder="Enter registration token"
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                bsSize="lg"
                type="password"
                name="password"
                placeholder="Enter password"
              />
            </FormGroup>
            <FormGroup>
              <Label>Password</Label>
              <Input
                bsSize="lg"
                type="password"
                name="password-confirm"
                placeholder="Re-enter password"
              />
            </FormGroup>
            <div className="text-center mt-3">
              <Link to="/dashboard/default">
                <Button color="primary" size="lg">
                  Complete registration
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </CardBody>
    </Card>
  </React.Fragment>
);

export default SignUp;
