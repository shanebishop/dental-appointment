import React from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  CardBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";

const SignIn = () => (
  <React.Fragment>
    <div className="text-center mt-4">
      <p className="lead">Sign in to your account to continue</p>
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
            <FormGroup>
              <Label>Password</Label>
              <Input
                bsSize="lg"
                type="password"
                name="password"
                placeholder="Enter your password"
              />
            </FormGroup>
            <div className="text-center mt-3">
              <Link to="/">
                <Button color="primary" size="lg">
                  Sign in
                </Button>
              </Link>
            </div>
          </Form>
        </div>
      </CardBody>
    </Card>
  </React.Fragment>
);

export default SignIn;
