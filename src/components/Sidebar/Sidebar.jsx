
/*eslint-disable*/
import React from "react";
import { NavLink, Link } from "react-router-dom";
import { Nav, Label } from "reactstrap";
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from "perfect-scrollbar";

import logo from "Logo-omb.png";

var ps;

class Sidebar extends React.Component {
  constructor(props) {
    super(props);
    this.activeRoute.bind(this);
  }
  // verifies if routeName is the one active (in browser input)
  activeRoute(routeName) {
    return this.props.location.pathname.indexOf(routeName) > -1 ? "active" : "";
  }
  componentDidMount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(this.refs.sidebar, {
        suppressScrollX: true,
        suppressScrollY: false
      });
    }
  }
  componentWillUnmount() {
    if (navigator.platform.indexOf("Win") > -1) {
      ps.destroy();
    }
  }
  render() {
    return (
      <div className="sidebar" data-color={this.props.backgroundColor}>
        <Link
          to='/omb/dashboard'>
          <div className="logo">
            <div className="logo-img">
              <a
                href="#"
                className="simple-text logo-mini"
                target="_blank"
              >
                <img src={logo} alt="react-logo" />
              </a>
              <a
                href="#"
                className="simple-text logo-normal"
                target="_blank"
              >
                <Label>Ombudsman</Label>
              </a>
            </div>
          </div>
        </Link>
        <div className="sidebar-wrapper" ref="sidebar">
          <Nav>
            {this.props.routes.map((prop, key) => {
              if (prop.redirect) return null;
              // [Ga] Hide routes on Sidebar
              if (prop.show != false) {
                return (
                  <li
                    className={
                      this.activeRoute(prop.layout + prop.path) +
                      (prop.pro ? " active active-pro" : "")
                    }
                    key={key}
                  >
                    <NavLink
                      to={prop.layout + prop.path}
                      className="nav-link"
                      activeClassName="active"
                    >
                      <i className={"now-ui-icons " + prop.icon} />
                      <p>{prop.name}</p>
                    </NavLink>
                  </li>
                );
              }
            })}
          </Nav>
        </div>
      </div>
    );
  }
}

export default Sidebar;
