/* eslint-disable no-undef */

import React from "react";
import { Redirect, Link } from "react-router-dom"
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Table,
  Row,
  Col,
  Button,
  Spinner,
  Label
} from "reactstrap";
import PanelHeader from "components/PanelHeader/PanelHeader.jsx";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { v4 as uuidv4 } from "uuid"
import axios from 'axios'

class subprovincelow extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      labelnametop: [],
      labelDatatop: [],
      labelnamelow: [],
      labelDatalow: [],
      error: undefined,
      isLoaded: false
    }
  }
  getDataAll = async () => {
    let body = {}
    body.province = this.props.location.state.data
    let result = await axios.post(`${process.env.REACT_APP_API_IP}/getoneprovince`, body)
    try {
      this.setState({
        data: result.data,
        isLoaded: true,
      })
    } catch (error) {
      this.setState({ isLoaded: true })
      console.error(error)
    }
  }
  async componentDidMount() {
    this.getDataAll()
  }

  render() {
    let { error, isLoaded, data } = this.state
    if (error) {
      return <div className="container">Error: {error.message}</div>
    }
    else if (!this.props.location.state.data) {
      // eslint-disable-next-line no-unused-expressions
      <Redirect to="/omb/dashboard" />
    }
    else if (!isLoaded) {
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
              <Col xs={12}>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">ข้อมูลจำนวนเรื่องร้องเรียน ภายในเขต ของกรุงเทพฯ</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Link
                      to="/omb/dashboard">
                      <Button color="default" size="md" >
                        <i className="now-ui-icons arrows-1_minimal-left"></i>&nbsp;&nbsp;ย้อนกลับ
                    </Button>
                    </Link>
                    {'   '}
                    <ReactHTMLTableToExcel
                      table="provincelow"
                      filename={"provincelow_" + uuidv4()}
                      className="btn btn-info"
                      sheet="Item"
                      buttonText="Export Excel" />
                    <Table responsive hover size="sm" id="provincelow">
                      <thead className="text-primary text-center">
                        <tr>
                          <th>#</th>
                          <th>เลขดำที่</th>
                          <th>ช่องทาง</th>
                          <th>จังหวัด</th>
                          <th>หน่วยงานที่ถูกร้อง</th>
                          <th>กรม</th>
                          <th>ประเด็นหลักที่เกี่ยวข้อง</th>
                          <th style={{ display: 'none' }}>ข้อเท็จจริงจากการสอบสวน</th>
                          <th style={{ display: 'none' }}>ผลการวินิจฉัย</th>
                          <th style={{ display: 'none' }}>ยุติด้วยมาตรา</th>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {data.map((prop, key) => {
                          console.log(prop)
                          return (
                            <tr className="text-center" key={key}>
                              <td>{key + 1}</td>
                              <td>
                                {prop.blacknumber}
                              </td>
                              <td>
                                {prop.way}
                              </td>
                              <td>
                                {prop.province}
                              </td>
                              <td>
                                {prop.department}
                              </td>
                              <td>
                                {prop.kasuange}
                              </td>
                              <td>
                                {prop.maintitle}
                              </td>
                              <td style={{ display: 'none' }}>
                                {prop.truestory}
                              </td>
                              <td style={{ display: 'none' }}>
                                {prop.resulttruestory}
                              </td>
                              <td style={{ display: 'none' }}>
                                {prop.codetruestory}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                    <Link
                      to="/omb/dashboard">
                      <Button color="default" size="md" >
                        <i className="now-ui-icons arrows-1_minimal-left"></i>&nbsp;&nbsp;ย้อนกลับ
                    </Button>
                    </Link> {'   '}
                    <ReactHTMLTableToExcel
                      table="provincetop"
                      filename={"provincetop_" + uuidv4()}
                      className="btn btn-info"
                      sheet="Item"
                      buttonText="Export Excel" />
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
    }
  }
}

export default subprovincelow;