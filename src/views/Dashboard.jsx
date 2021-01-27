/* eslint-disable no-undef */
import React from "react"
// reactstrap components
import {
  Row,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Col,
  Label,
  Spinner,
  Button,
  Table,
  Input,
  Form,
} from "reactstrap"

import PanelHeader from "components/PanelHeader/PanelHeader.jsx"
import axios from "axios"
import moment from "moment"
import MomentUtils from "@date-io/moment"
import "moment/locale/th"
import { MuiPickersUtilsProvider, DatePicker } from "material-ui-thai-datepickers"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSearch } from "@fortawesome/free-solid-svg-icons"
import Workbook from "react-excel-workbook"
import { v4 as uuidv4 } from "uuid"
import * as _ from "lodash"

class Dashboard extends React.Component {
  constructor() {
    super()
    this.state = {
      dateCheck: new Date(),
      dateCheck2: new Date(),
      allpostcode: [],
      error: undefined,
      isLoaded: false,
      filter: "",
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeDate2 = this.handleChangeDate2.bind(this)
  }

  handleChangeDate(date) {
    this.setState({
      dateCheck: date,
    })
  }
  handleChangeDate2(date) {
    this.setState({
      dateCheck2: date,
    })
  }
  removeData = async (value) => {
    let result = _.remove(this.state.allpostcode, (prop) => {
      return prop.F25 !== value.F25
    })
    this.setState({
      allpostcode: result,
      isLoaded: true,
    })
  }

  getAllPostcode = async () => {
    let datefrom = moment(this.state.dateCheck)
    let dateto = moment(this.state.dateCheck2)
    let body = {}
    body.datefrom = `${datefrom.year()}-${datefrom.month() + 1}-${datefrom.date()}`
    body.dateto = `${dateto.year()}-${dateto.month() + 1}-${dateto.date()}`
    let result = await axios.post(`${process.env.REACT_APP_API_IP}/postcodes`, body)
    await _.map(result.data, (prop) => {
      if (prop.address) {
        let address = prop.address.split(" ")
        let addresslen = address.length - 2
        prop.addressresult = address[addresslen]
        if (address[addresslen]) {
          prop.addressresult = address[addresslen]
        } else {
          prop.addressresult = "-"
        }
      } else {
        prop.addressresult = "-"
      }
      return prop
    })
    try {
      this.setState({
        allpostcode: result.data,
        isLoaded: true,
      })
    } catch (error) {
      this.setState({ isLoaded: true })
      console.error(error)
    }
  }

  async handleSubmit(e) {
    e.preventDefault()
    let formData = new FormData(e.target)
    let body = {}
    let datefrom = moment(this.state.dateCheck)
    let dateto = moment(this.state.dateCheck2)
    formData.forEach((value, property) => (body[property] = value))
    body.datefrom = `${datefrom.year()}-${datefrom.month() + 1}-${datefrom.date()}`
    body.dateto = `${dateto.year()}-${dateto.month() + 1}-${dateto.date()}`
    let result = await axios.post(`${process.env.REACT_APP_API_IP}/postcodes`, body)
    await _.map(result.data, (prop) => {
      if (prop.address) {
        let address = prop.address.split(" ")
        let addresslen = address.length - 2
        prop.addressresult = address[addresslen]
        if (address[addresslen]) {
          prop.addressresult = address[addresslen]
        } else {
          prop.addressresult = "-"
        }
      } else {
        prop.addressresult = "-"
      }
      return prop
    })
    try {
      this.setState({
        allpostcode: result.data,
        isLoaded: true,
      })
    } catch (error) {
      this.setState({ isLoaded: true })
      console.error(error)
    }
  }

  handleChangeSearch = (event) => {
    this.setState({ filter: event.target.value })
  }

  async componentDidMount() {
    this.getAllPostcode()
  }
  render() {
    let { error, isLoaded, filter, allpostcode } = this.state
    const lowercasedFilter = filter.toLowerCase()
    const filteredData = allpostcode.filter((item) => {
      return Object.keys(item).some((key) =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      )
    })

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
            <Row>
              <Col xs={12} md={12}>
                <Card className="card-chart">
                  <CardHeader>
                    <h5 className="title">
                      ข้อมูลเลขไปรษณีย์หนังสือออกในระบบสำนักงานอัตโนมัติ
                    </h5>
                    <p className="category">
                      ใช้สำหรับค้นข้อมูลหนังสือที่ได้ทำการออกเลขจากระบบ
                    </p>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col>
                        <Label for="Check">จาก: </Label> &nbsp; &nbsp; &nbsp;
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={"th"}>
                          <DatePicker
                            format="DD/MM/YYYY"
                            pickerHeaderFormat="DD/MM/YYYY"
                            yearOffset={543}
                            value={this.state.dateCheck}
                            onChange={this.handleChangeDate}
                            locale={"th"}
                          />
                        </MuiPickersUtilsProvider>
                        <br></br>
                        <br></br>
                        <Label for="Check2">ถึง: </Label> &nbsp; &nbsp; &nbsp;
                        <MuiPickersUtilsProvider utils={MomentUtils} locale={"th"}>
                          <DatePicker
                            format="DD/MM/YYYY"
                            pickerHeaderFormat="DD/MM/YYYY"
                            yearOffset={543}
                            value={this.state.dateCheck2}
                            onChange={this.handleChangeDate2}
                            locale={"th"}
                          />
                        </MuiPickersUtilsProvider>
                      </Col>
                      <Col></Col>
                      <Col></Col>
                    </Row>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                      <Row>
                        <Col>
                          <Label>เลขที่พัสดุ:</Label>
                          <Input
                            id="postcode"
                            name="postcode"
                            placeholder="ระบุเลขที่พัสดุ"
                            type="text"
                          />
                        </Col>
                        <Col>
                          <Label>เลขที่หนังสือ:</Label>
                          <Input
                            id="f4"
                            name="f4"
                            placeholder="ระบุเลขที่หนังสือ"
                            type="text"
                          />
                        </Col>
                        <Col>
                          <Label>เลขที่หนังสือสำนัก</Label>
                          <Input
                            id="prebookno"
                            name="prebookno"
                            placeholder="ระบุเลขที่หนังสือสำนัก"
                            type="text"
                          />
                        </Col>
                      </Row>
                      <Button color="primary" size="sm">
                        <FontAwesomeIcon icon={faSearch} />
                        &nbsp;&nbsp;Search
                      </Button>
                    </Form>
                    <hr></hr>
                    <Row>
                      <Col xs={12}>
                        <Label>กรองข้อมูล</Label>
                        <Input
                          type="text"
                          name="searchTxt"
                          id="searchTxt"
                          placeholder="ระบุข้อมูลที่ต้องการให้กรอง"
                          onChange={this.handleChangeSearch}
                        />
                      </Col>
                    </Row>
                    <hr></hr>
                    &nbsp;&nbsp;&nbsp;
                    <Workbook
                      size="sm"
                      filename={`postcode_${uuidv4()}.xlsx`}
                      element={
                        <button className="btn btn-primary" size="sm">
                          <FontAwesomeIcon icon={faSearch} /> Export Excel
                        </button>
                      }
                    >
                      <Workbook.Sheet data={filteredData} name="PostCode">
                        <Workbook.Column label="ชื่อผู้รับ" value={"F7"} />
                        <Workbook.Column label="ที่อยู่" value={"address"} />
                        <Workbook.Column label="จังหวัด" value={"addressresult"} />
                        <Workbook.Column label="เลขที่พัสดุ" value={"F25"} />
                        <Workbook.Column
                          label="เลขที่หนังสือ"
                          value={"noOrganization"}
                        />
                        <Workbook.Column
                          label="เลขที่หนังสือสำนัก"
                          value={"noDepartment"}
                        />
                      </Workbook.Sheet>
                    </Workbook>
                    <Table responsive hover size="sm" id="reportems">
                      <thead className="text-primary text-center">
                        <tr>
                          <th colSpan={2}>#</th>
                          <th>ชื่อผู้รับ</th>
                          <th>ที่อยู่</th>
                          <th>จังหวัด</th>
                          <th>เลขที่พัสดุ</th>
                          <th>เลขที่หนังสือ</th>
                          <th>เลขที่หนังสือสำนัก</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {filteredData.map((prop, key) => {
                          return (
                            <tr key={key + 1}>
                              <td>
                                <i
                                  className="now-ui-icons ui-1_simple-remove"
                                  onClick={this.removeData.bind(this, prop)}
                                ></i>
                              </td>
                              <td>{key + 1}</td>
                              <td>{prop.F7}</td>
                              <td>{prop.address}</td>
                              <td>{prop.addressresult}</td>
                              <td>{prop.F25}</td>
                              <td>{prop.noOrganization}</td>
                              <td>{prop.noDepartment}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter></CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )
    }
  }
}

export default Dashboard
