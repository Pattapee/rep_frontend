/* eslint-disable no-undef */

import React from "react";
import { Link } from "react-router-dom"
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


class suballdistrict extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      error: undefined,
      isLoaded: false
    }
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  getDataAll = async () => {
    console.log(this.props.location.state.data.district)
    let body = { district: this.props.location.state.data.district }

    let result = await axios.post(`${process.env.REACT_APP_API_IP}/getonedistrict`, body)
    console.log(result)
    // try {
    //   this.setState({
    //     data: alldistrict.data,
    //     isLoaded: true,
    //   })
    // } catch (error) {
    //   this.setState({ isLoaded: true })
    //   console.error(error)
    // }
  }
  async componentDidMount() {
    this.getDataAll()
  }

  render() {
    let { error, isLoaded, labelnamelow, labelDatalow, labelDatatop, labelnametop, data } = this.state
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
              <Col xs={12}>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">ข้อมูลจำนวนเรื่องร้องเรียน ภายในเขต ของกรุงเทพฯ</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Button color="default" size="md" onClick={this.goBack}>
                      <i className="now-ui-icons arrows-1_minimal-left"></i>&nbsp;&nbsp;ย้อนกลับ
                    </Button> {'   '}
                    <ReactHTMLTableToExcel
                      table="suballdistrict"
                      filename={"suballdistrict_" + uuidv4()}
                      className="btn btn-info"
                      sheet="Item"
                      buttonText="Export Excel" />
                    <Table responsive hover size="sm" id="suballdistrict">
                      <thead className="text-primary text-center">
                        <tr>
                          <th>#</th>
                          <th>เขต</th>
                          <th>จำนวน</th>
                          <td>Detail</td>
                        </tr>
                      </thead>
                      <tbody className="text-center">
                        {data.map((prop, key) => {
                          return (
                            <tr>
                              <td>{key + 1}</td>
                              <td>
                                {prop.district}
                              </td>
                              <td>
                                {prop.countz}
                              </td>
                              <td>
                                <Link
                                  to={{
                                    pathname: '/omb/subdistrict',
                                    state: { data: prop }
                                  }} >
                                  <i className="now-ui-icons files_paper"></i>&nbsp;&nbsp;เรียกดูข้อมูล
                                </Link>
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
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

export default suballdistrict;