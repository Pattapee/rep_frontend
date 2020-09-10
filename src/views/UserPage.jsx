
import React from "react";

// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  FormGroup,
  Form,
  Input,
  Row,
  Col
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";

class User extends React.Component {
  render() {
    return (
      <>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md="8">
              <Card>
                <CardHeader>
                  <h5 className="title">Edit Profile</h5>
                </CardHeader>
                <CardBody>
                  <Form>
                    <Row>
                      <Col className="pr-1" md="5">
                        <FormGroup>
                          <label>Company (disabled)</label>
                          <Input
                            defaultValue="Creative Code Inc."
                            disabled
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="3">
                        <FormGroup>
                          <label>Username</label>
                          <Input
                            defaultValue="michael23"
                            placeholder="Username"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label htmlFor="exampleInputEmail1">
                            Email address
                          </label>
                          <Input placeholder="Email" type="email" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="6">
                        <FormGroup>
                          <label>First Name</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="Company"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="6">
                        <FormGroup>
                          <label>Last Name</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Last Name"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>Address</label>
                          <Input
                            defaultValue="Bld Mihail Kogalniceanu, nr. 8 Bl 1, Sc 1, Ap 09"
                            placeholder="Home Address"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className="pr-1" md="4">
                        <FormGroup>
                          <label>City</label>
                          <Input
                            defaultValue="Mike"
                            placeholder="City"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="px-1" md="4">
                        <FormGroup>
                          <label>Country</label>
                          <Input
                            defaultValue="Andrew"
                            placeholder="Country"
                            type="text"
                          />
                        </FormGroup>
                      </Col>
                      <Col className="pl-1" md="4">
                        <FormGroup>
                          <label>Postal Code</label>
                          <Input placeholder="ZIP Code" type="number" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <FormGroup>
                          <label>About Me</label>
                          <Input
                            cols="80"
                            defaultValue="Lamborghini Mercy, Your chick she so thirsty, I'm in
                            that two seat Lambo."
                            placeholder="Here can be your description"
                            rows="4"
                            type="textarea"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
            <Col md="4">
              <Card className="card-user">
                <div className="image">
                  <img alt="..." src={require("assets/img/bg5.jpg")} />
                </div>
                <CardBody>
                  <div className="author">
                    <a href="#pablo" onClick={e => e.preventDefault()}>
                      <img
                        alt="..."
                        className="avatar border-gray"
                        src={require("assets/img/mike.jpg")}
                      />
                      <h5 className="title">Mike Andrew</h5>
                    </a>
                    <p className="description">michael24</p>
                  </div>
                  <p className="description text-center">
                    "Lamborghini Mercy <br />
                    Your chick she so thirsty <br />
                    I'm in that two seat Lambo"
                  </p>
                </CardBody>
                <hr />
                <div className="button-container">
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-facebook-f" />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-twitter" />
                  </Button>
                  <Button
                    className="btn-neutral btn-icon btn-round"
                    color="default"
                    href="#pablo"
                    onClick={e => e.preventDefault()}
                    size="lg"
                  >
                    <i className="fab fa-google-plus-g" />
                  </Button>
                </div>
              </Card>
            </Col>
          </Row>
        </div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Now Ui Table Heading</h5>
                  <p className="category">
                    Created using Montserrat Font Family
                 </p>
                </CardHeader>
                <CardBody>
                  <div className="typography-line">
                    <h1>
                      <span>Header 1</span>The Life of Now Ui Dashboard{" "}
                    </h1>
                  </div>
                  <div className="typography-line">
                    <h2>
                      <span>Header 2</span>The Life of Now Ui Dashboard{" "}
                    </h2>
                  </div>
                  <div className="typography-line">
                    <h3>
                      <span>Header 3</span>The Life of Now Ui Dashboard{" "}
                    </h3>
                  </div>
                  <div className="typography-line">
                    <h4>
                      <span>Header 4</span>The Life of Now Ui Dashboard{" "}
                    </h4>
                  </div>
                  <div className="typography-line">
                    <h5>
                      <span>Header 5</span>The Life of Now Ui Dashboard{" "}
                    </h5>
                  </div>
                  <div className="typography-line">
                    <h6>
                      <span>Header 6</span>The Life of Now Ui Dashboard{" "}
                    </h6>
                  </div>
                  <div className="typography-line">
                    <p>
                      <span>Paragraph</span>I will be the leader of a company
                     that ends up being worth billions of dollars, because I
                     got the answers. I understand culture. I am the nucleus. I
                     think that’s a responsibility that I have, to push
                     possibilities, to show people, this is the level that
                     things could be at.
                   </p>
                  </div>
                  <div className="typography-line">
                    <span>Quote</span>
                    <blockquote>
                      <p className="blockquote blockquote-primary">
                        "I will be the leader of a company that ends up being
                        worth billions of dollars, because I got the answers. I
                        understand culture. I am the nucleus. I think that’s a
                        responsibility that I have, to push possibilities, to
                        show people, this is the level that things could be at."
                       <br />
                        <br />
                        <small>- Noaa</small>
                      </p>
                    </blockquote>
                  </div>

                  <div className="typography-line">
                    <span>Muted Text</span>
                    <p className="text-muted">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                   </p>
                  </div>
                  <div className="typography-line">
                    <span>Primary Text</span>
                    <p className="text-primary">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                   </p>
                  </div>
                  <div className="typography-line">
                    <span>Info Text</span>
                    <p className="text-info">
                      I will be the leader of a company that ends up being worth
                     billions of dollars, because I got the answers...{" "}
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Success Text</span>
                    <p className="text-success">
                      I will be the leader of a company that ends up being worth
                     billions of dollars, because I got the answers...{" "}
                    </p>
                  </div>
                  <div className="typography-line">
                    <span>Warning Text</span>
                    <p className="text-warning">
                      I will be the leader of a company that ends up being worth
                      billions of dollars, because I got the answers...
                   </p>
                  </div>
                  <div className="typography-line">
                    <span>Danger Text</span>
                    <p className="text-danger">
                      I will be the leader of a company that ends up being worth
                     billions of dollars, because I got the answers...{" "}
                    </p>
                  </div>
                  <div className="typography-line">
                    <h2>
                      <span>Small Tag</span>
                     Header with small subtitle <br />
                      <small>Use "small" tag for the headers</small>
                    </h2>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </>
    );
  }
}

export default User;
