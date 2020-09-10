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
import { Pie } from "react-chartjs-2";
import 'chartjs-plugin-datalabels';


class alldistrict extends React.Component {
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
    this.goBack = this.goBack.bind(this);
  }
  goBack() {
    this.props.history.goBack();
  }
  getDataAll = async () => {
    let topdistrict = await axios.get(`${process.env.REACT_APP_API_IP}/topdistrict`)
    let lowdistrict = await axios.get(`${process.env.REACT_APP_API_IP}/lowdistrict`)
    let alldistrict = await axios.get(`${process.env.REACT_APP_API_IP}/alldistrict`)

    let labelnametop = []
    let labelDatatop = []
    let labelnamelow = []
    let labelDatalow = []
    try {
      await topdistrict.data.forEach(value => {
        labelnametop.push(value.district)
        labelDatatop.push(value.countz)
      });
      await lowdistrict.data.forEach(value => {
        labelnamelow.push(value.district)
        labelDatalow.push(value.countz)
      });
      this.setState({
        data: alldistrict.data,
        labelnamelow: labelnamelow,
        labelDatalow: labelDatalow,
        labelDatatop: labelDatatop,
        labelnametop: labelnametop,
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
    let { error, isLoaded, labelnamelow, labelDatalow, labelDatatop, labelnametop, data } = this.state
    const options = {
      plugins: {
        datalabels: {
          formatter: (value, ctx) => {
            let datasets = ctx.chart.data.datasets;
            if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
              let sum = datasets[0].data.reduce((a, b) => a + b, 0);
              let percentage = Math.round((value / sum) * 100) + "%";
              return percentage;
            } else {
              return percentage;
            }
          },
          color: "Black"
        },
        align: 'center',
        maintainAspectRatio: true
      }
    };

    const datalow = {
      labels: labelnamelow,
      datasets: [
        {
          label: "# of Votes",
          data: labelDatalow,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 3
        }
      ]
    };
    const datatop = {
      labels: labelnametop,
      datasets: [
        {
          label: "# of Votes",
          data: labelDatatop,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderWidth: 3
        }
      ]
    };
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
                      table="alldistrict"
                      filename={"alldistrict_" + uuidv4()}
                      className="btn btn-info"
                      sheet="Item"
                      buttonText="Export Excel" />
                    <Row>
                      <Col xs={12} md={6} >
                        <h3>มากที่สุด 10 อันดับ</h3>
                        <div className="chart-area">
                          <Pie data={datatop} width={50} height={50} options={options} />
                        </div>
                      </Col>
                      <Col xs={12} md={6} >
                        <h3>น้อยที่สุด 10 อันดับ</h3>
                        <div className="chart-area">
                          <Pie data={datalow} width={50} height={50} options={options} />
                        </div>
                      </Col>
                    </Row>

                    <br></br>
                    <br></br>
                    <br></br>
                    <Table responsive hover size="sm" id="alldistrict">
                      <thead className="text-primary text-center">
                        <tr>
                          <th>#</th>
                          <th>เขต</th>
                          <th>จำนวน</th>
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
                                    pathname: '/omb/suballdistrict',
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

export default alldistrict;