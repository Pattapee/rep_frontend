/* eslint-disable no-undef */
import React from "react";
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
  Table
} from "reactstrap";

// core components
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import axios from 'axios'
import moment from 'moment'
import 'moment/locale/th'
import DatePicker from "react-datepicker";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { v4 as uuidv4 } from "uuid"

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      dateCheck: new Date(),
      dateCheck2: new Date(),
      allpostcode: [],
      error: undefined,
      isLoaded: false
    };
    this.handleChangeDate = this.handleChangeDate.bind(this);
    this.handleChangeDate2 = this.handleChangeDate2.bind(this);
  }

  handleChangeDate(date) {
    this.setState({
      dateCheck: date
    });
  }
  handleChangeDate2(date) {
    this.setState({
      dateCheck2: date
    });
  }

  getAllPostcode = async () => {
    // let body = { district: this.props.location.state.data.district }
    let datefrom = moment(this.state.dateCheck)
    let dateto = moment(this.state.dateCheck2)
    let body = {}
    body.datefrom = `${datefrom.year()}-${datefrom.month() + 1}-${datefrom.day()}`
    body.dateto = `${dateto.year()}-${dateto.month() + 1}-${dateto.day()}`
    let result = await axios.post(`${process.env.REACT_APP_API_IP}/postcodes`, body)
    console.log(result.data)
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

  async componentDidMount() {
    this.getAllPostcode()
  }
  render() {
    let { error, isLoaded, allpostcode } = this.state

    if (error) {
      return <div className="container">Error: {error.message}</div>
    } else if (!isLoaded) {
      return <div className="container">
        <Label>Loading...</Label>
        <Spinner size="sm" color="primary" />{' '}
        <Spinner size="sm" color="primary" />{' '}
        <Spinner size="sm" color="primary" />{' '}
      </div>
    } else {
      return (
        <>
          <PanelHeader size="sm" />
          <div className="content">
            <Row>
              <Col xs={12} md={12} >
                <Card className="card-chart">
                  <CardHeader>
                    <h2 className="h2">ข้อมูลเลขไปรษณีย์ในระบบ</h2>
                  </CardHeader>
                  <CardBody>
                    <Label>จาก:</Label>
                    <DatePicker
                      selected={this.state.dateCheck}
                      onChange={this.handleChangeDate}
                      dateFormat="dd / MM / yyyy"
                      className="form-control"
                    />
                    <br></br>
                    <br></br>
                    <Label>ถึง:</Label>
                    <DatePicker
                      selected={this.state.dateCheck2}
                      onChange={this.handleChangeDate2}
                      dateFormat="dd / MM / yyyy"
                      className="form-control"
                    />
                    <br></br>
                    <Button color="primary" size="md" onClick={this.getAllPostcode}>
                      <i className="now-ui-icons ui-1_zoom-bold"></i>&nbsp;&nbsp;Search
                    </Button>
                    <hr></hr>
                    <ReactHTMLTableToExcel
                      table="suballdistrict"
                      filename={"suballdistrict_" + uuidv4()}
                      className="btn btn-primary"
                      sheet="Item"
                      buttonText="Export Excel" />
                    <Table responsive hover size="sm" id="suballdistrict">
                      <thead className="text-primary text-center">
                        <tr>
                          <th>#</th>
                          <th>ชื่อผู้รับ</th>
                          <th>ที่อยู่</th>
                          <th>จังหวัด</th>
                          <th>เลขที่พัสดุ</th>
                          <th>เลขที่หนังสือ</th>
                          <th>เลขที่หนังสือสำนัก</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {allpostcode.map((prop, key) => {
                          let address = prop.address.split(" ")
                          let addresslen = address.length - 2
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>{prop.F7}</td>
                              <td>{prop.address}</td>
                              <td>{address[addresslen]}</td>
                              <td>{prop.F25}</td>
                              <td>{prop.noOrganization}</td>
                              <td>{prop.noDepartment}</td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </CardBody>
                  <CardFooter>
                  </CardFooter>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    }
  }
}

export default Dashboard;
