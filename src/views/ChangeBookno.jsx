/* eslint-disable no-undef */
import React from "react"
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  Col,
  Label,
  Spinner,
  Button,
  Input,
  FormGroup,
  Form,
} from "reactstrap"
import PanelHeader from "components/PanelHeader/PanelHeader.jsx"
import axios from "axios"
// import moment from "moment"
// import "moment/locale/th"
// import DatePicker from "react-datepicker"
import * as _ from "lodash"
import NotificationAlert from "react-notification-alert"

class ChangeBookno extends React.Component {
  constructor() {
    super()
    this.state = {
      publishbook: {},
      Oneprebookno: {},
      allprebookno: [],
      error: undefined,
      isLoaded: false,
      filter: "",
      visible: true,
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSubmitupdate = this.handleSubmitupdate.bind(this)
    this.onDismiss = this.onDismiss.bind(this)
    this.notify = this.notify.bind(this)
    // this.onClickHandlerprebook = this.onClickHandlerprebook.bind(this)
  }

  onDismiss() {}
  notify(black_number,book_number) {
    var options = {}
    options = {
      place: "tc",
      message: (
        <div>
          <div>
            ไม่มีข้อมูลการออกหนังสือครั้งสุดท้าย<br></br>{" "}
            <b>เรื่องร้องเรียนเลขดำที่ {black_number}</b><br></br>
            <b>เลขที่หนังสือ {book_number}</b>
          </div>
        </div>
      ),
      type: "warning",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    }
    this.refs.notificationAlert.notificationAlert(options)
  }
  notifymsg(msg) {
    var options = {}
    options = {
      place: "tc",
      message: (
        <div>
          <div>{msg}</div>
        </div>
      ),
      type: "success",
      icon: "now-ui-icons ui-1_bell-53",
      autoDismiss: 7,
    }
    this.refs.notificationAlert.notificationAlert(options)
  }

  async handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let body = {}
    formData.forEach((value, property) => (body[property] = value))
    body.black_number = body.black_number.trim()
    body.book_number = body.book_number.trim()
    let result = await axios.post(
      `${process.env.REACT_APP_API_IP}/getcontentbook`,
      body
    )
    if (_.first(result.data)) {
      this.notifymsg('ค้นหาข้อมูลสำเร็จ')
      try {
        this.setState({
          publishbook: _.first(result.data),
          isLoaded: true,
        })
      } catch (error) {
        this.setState({ isLoaded: true })
        console.error(error)
      }
    } else {
      this.notify(body.black_number,body.book_number)
    }
  }
  async handleSubmitupdate(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let body = {}
    formData.forEach((value, property) => (body[property] = value))
    if (body.CONTENTID) {
      body.prebookno = _.find(this.state.allprebookno, { BNID: +body.prebookno })
      let data = {
        F1RUN: body.prebookno.BNID,
        year: body.year,
      }
      let maxf4 = await axios.post(`${process.env.REACT_APP_API_IP}/getmaxf4`, data)
      let prebookno = _.find(this.state.allprebookno, {
        BOOKNO: `${_.split(body.prebookno.BOOKNO, "/")[0]}/`,
      })
      let maxF4 = +maxf4.data[0].F4 + 1
      let dataUpdatePCContent = {
        F4: _.padStart(maxF4, 5, "00"),
        PREBOOKNO: prebookno.BOOKNO,
        F1RUN: prebookno.BNID,
        CONTENTID: body.CONTENTID,
      }
      let resultcontent = await axios.post(
        `${process.env.REACT_APP_API_IP}/updatepccontent`,
        dataUpdatePCContent
      )
      let dataUpdate = {
        book_number: `${dataUpdatePCContent.PREBOOKNO}${maxF4}`,
        CONTENTID: body.CONTENTID,
      }
      let result = await axios.post(
        `${process.env.REACT_APP_API_IP}/updatepublishbook`,
        dataUpdate
      )
    
      if (resultcontent && result) {
        this.notifymsg(`เปลี่ยนสำนักข้อมูลเรียบร้อยแล้ว`)
      }
    } else {
      this.notifymsg("ค้นหาข้อมูลเรื่องร้องเรียนก่อน")
    }
  }

  getPrebookName = async () => {
    let result = await axios.get(`${process.env.REACT_APP_API_IP}/getprebookname`)
    try {
      this.setState({
        allprebookno: result.data,
        isLoaded: true,
      })
    } catch (error) {
      this.setState({ isLoaded: true })
      console.error(error)
    }
  }

  async componentDidMount() {
    await this.getPrebookName()
  }

  render() {
    let { error, isLoaded, allprebookno, publishbook } = this.state
    if (error) {
      return <div className="container">Error: {error.message}</div>
    } else if (!isLoaded) {
      return (
        <div className="container">
          <Label>Loading...</Label>
          <Spinner size="sm" color="primary" /> <Spinner size="sm" color="primary" />{" "}
          <Spinner size="sm" color="primary" />{" "}
        </div>
      )
    } else {
      return (
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <NotificationAlert ref="notificationAlert" />
            <Row>
              <Col md={12}>
                <Card>
                  <CardHeader>
                    <h5 className="title">เปลี่ยนเลขที่หนังสือ</h5>
                    <p className="category">
                      ใช้สำหรับเปลี่ยนเลขที่หนังสือย้ายสำนัก อาทิเช่น ผผ 09/... เป็น
                      ผผ 10/...
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col>
                          <Label>เลขดำที่</Label>
                          <Input
                            type="text"
                            name="black_number"
                            id="black_number"
                            placeholder="ระบุข้อมูลเลขดำที่ "
                            required="required"
                          />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>เลขที่หนังสือ</Label>
                          <Input
                            type="text"
                            name="book_number"
                            id="book_number"
                            placeholder="ระบุข้อมูลเลขที่หนังสือ "
                            required="required"
                          />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button color="primary">
                            <i className="now-ui-icons ui-1_zoom-bold"></i>
                            &nbsp;&nbsp;ค้นหาข้อมูล
                          </Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                    </Form>
                    <hr></hr>
                    <Form onSubmit={this.handleSubmitupdate}>
                      <Row hidden>
                        <Col>
                          <Label>รหัสเลขที่หนังสือ (CONTENTID)</Label>
                          <Input
                            type="text"
                            name="CONTENTID"
                            id="CONTENTID"
                            defaultValue={
                              publishbook.CONTENTID ? publishbook.CONTENTID : null
                            }
                            readOnly={true}
                          />
                        </Col>
                        <Col> </Col>
                        <Col></Col>
                      </Row>
                      <Row hidden>
                        <Col>
                          <Label>ข้อมูลเลขที่หนังสือออกสนง. (content_no)</Label>
                          <Input
                            type="text"
                            name="content_no"
                            id="content_no"
                            defaultValue={
                              publishbook.content_no ? publishbook.content_no : null
                            }
                            readOnly={true}
                            required="required"
                          />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>ข้อมูลเลขดำที่ (black_number)</Label>
                          <Input
                            type="text"
                            name="black_number"
                            id="black_number"
                            defaultValue={
                              publishbook.black_number
                                ? publishbook.black_number
                                : ""
                            }
                            readOnly={true}
                            required="required"
                          />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <Label>ข้อมูลเลขที่ออกหนังสือ (book_number)</Label>
                          <Input
                            type="text"
                            name="book_number"
                            id="book_number"
                            defaultValue={
                              publishbook.book_number
                                ? publishbook.book_number
                                : null
                            }
                            readOnly={true}
                            required="required"
                          />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="exampleSelectMulti">เลือกปี</Label>
                            <Input
                              type="select"
                              name="year"
                              id="year"
                              required="required"
                            >
                              <option value={new Date().getFullYear()}>
                                {new Date().getFullYear() + 543}
                              </option>
                              <option value={new Date().getFullYear() - 1}>
                                {new Date().getFullYear() + 542}
                              </option>
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for="exampleSelectMulti">
                              เลือกสำนักที่ต้องการย้าย
                            </Label>
                            <Input
                              type="select"
                              name="prebookno"
                              id="prebookno"
                              onClick={this.onClickHandlerprebook}
                              required="required"
                            >
                              {this.state.allprebookno &&
                                allprebookno.map((prop, key) => {
                                  return (
                                    <option value={prop.BNID} key={prop.BNID}>
                                      {prop.DEPNAME}
                                      {" - "}
                                      {prop.BOOKNO}
                                    </option>
                                  )
                                })}
                            </Input>
                          </FormGroup>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row hidden>
                        <Col>
                          <Label>publish_book_id</Label>
                          <Input
                            type="text"
                            name="publish_book_id"
                            id="publish_book_id"
                            defaultValue={
                              publishbook.publish_book_id
                                ? publishbook.publish_book_id
                                : "-"
                            }
                            readOnly={true}
                          />
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                      <Row>
                        <Col>
                          <Button color="success">
                            <i className="now-ui-icons loader_refresh"></i>
                            &nbsp;&nbsp;เปลี่ยนเลขที่หนังสือ
                          </Button>
                        </Col>
                        <Col></Col>
                        <Col></Col>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )
    }
  }
}

export default ChangeBookno
