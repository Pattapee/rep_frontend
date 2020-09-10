import Dashboard from "views/Dashboard.jsx"
import Notifications from "views/Notifications.jsx"
import Icons from "views/Icons.jsx"
import Maps from "views/Maps.jsx"
import UserPage from "views/UserPage.jsx"
import alldistrict from "views/alldistrict.jsx"
import suballdistrict from "views/suballdistrict.jsx"
import subprovincetop from "views/subprovincetop.jsx"
import subprovincelow from "views/subprovincelow.jsx"
var dashRoutes = [
  {
    path: "/dashboard",
    name: "Postcode",
    icon: "business_chart-bar-32",
    component: Dashboard,
    layout: "/omb",
  },
  {
    path: "/alldistrict",
    name: "alldistrict",
    icon: "business_chart-bar-32",
    component: alldistrict,
    layout: "/omb",
    show: false,
  },
  {
    path: "/suballdistrict",
    name: "suballdistrict",
    icon: "business_chart-bar-32",
    component: suballdistrict,
    layout: "/omb",
    show: false,
  },
  {
    path: "/subprovincelow",
    name: "subprovincelow",
    icon: "business_chart-bar-32",
    component: subprovincelow,
    layout: "/omb",
    show: false,
  },
  {
    path: "/subprovincetop",
    name: "subprovincetop",
    icon: "business_chart-bar-32",
    component: subprovincetop,
    layout: "/omb",
    show: false,
  },
  {
    path: "/Notifications",
    name: "Notifications",
    icon: "business_chart-bar-32",
    component: Notifications,
    layout: "/omb",
    show: false,
  },
  {
    path: "/Icons",
    name: "Icons",
    icon: "business_chart-bar-32",
    component: Icons,
    layout: "/omb",
    show: false,
  },
  {
    path: "/UserPage",
    name: "UserPage",
    icon: "business_chart-bar-32",
    component: UserPage,
    layout: "/omb",
    show: false,
  },
  {
    path: "/Maps",
    name: "Maps",
    icon: "business_chart-bar-32",
    component: Maps,
    layout: "/omb",
    show: false,
  },
  {
    path: "/Notifications",
    name: "Notifications",
    icon: "business_chart-bar-32",
    component: Notifications,
    layout: "/omb",
    show: false,
  }
]
export default dashRoutes
