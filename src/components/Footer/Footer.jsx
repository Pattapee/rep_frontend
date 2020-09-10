
/*eslint-disable*/
import React from "react";
import { Container } from "reactstrap";
import { Link } from "react-router-dom";
// used for making the prop types of this component
import PropTypes from "prop-types";

class Footer extends React.Component {
  render() {
    return (
      <footer
        className={"footer" + (this.props.default ? " footer-default" : "")}>
        <Container fluid={this.props.fluid ? true : false}>
          <nav>
            <ul>
              <li>
                <Link to="/admin/dashboard" className="nav-link">
                  <p>
                    <i className="now-ui-icons business_chart-bar-32" />
                    &nbsp;Dashboard
                  </p>
                </Link>
              </li>
              {/* <li>
                <Link to="/admin/item/list" className="nav-link">
                  <p>
                    <i className="now-ui-icons design_bullet-list-67" />
                    &nbsp;ข้อมูลวัสดุ
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/admin/itemwithdraw/list" className="nav-link">
                  <p>
                    <i className="now-ui-icons design_bullet-list-67" />
                    &nbsp;การรับเข้าวัสดุ
                  </p>
                </Link>
              </li>
              <li>
                <Link to="/admin/itemdeposit/list" className="nav-link">
                  <p>
                    <i className="now-ui-icons design_bullet-list-67" />
                    &nbsp;การเบิกวัสดุ
                  </p>
                </Link>
              </li> */}
            </ul>
          </nav>
          <div className="copyright">
            &copy; {new Date().getFullYear() + 543}, Powered by{" "}
              Ombudsman.go.th
          </div>
        </Container>
      </footer>
    );
  }
}

Footer.propTypes = {
  default: PropTypes.bool,
  fluid: PropTypes.bool
};

export default Footer;
