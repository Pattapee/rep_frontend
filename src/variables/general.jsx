// ##############################
// // // tasks list for Tasks card in Dashboard view
// #############################

const tasks = [
  {
    checked: true,
    text: 'Sign contract for "What are conference organizers afraid of?"'
  },
  {
    checked: false,
    text: "Lines From Great Russian Literature? Or E-mails From My Boss?"
  },
  {
    checked: true,
    text:
      "Flooded: One year later, assessing what was lost and what was found when a ravaging rain swept through metro Detroit"
  }
]

// ##############################
// // // table head data and table body data for Tables view
// #############################

const thead = ["Name", "Country", "City", "Salary"]
const tbody = [
  {
    className: "table-success",
    data: ["Dakota Rice", "Niger", "Oud-Turnhout", "$36,738"]
  },
  {
    className: "",
    data: ["Minerva Hooper", "Curaçao", "Sinaai-Waas", "$23,789"]
  },
  {
    className: "table-info",
    data: ["Sage Rodriguez", "Netherlands", "Baileux", "$56,142"]
  },
  {
    className: "",
    data: ["Philip Chaney", "Korea, South", "Overland Park", "$38,735"]
  },
  {
    className: "table-danger",
    data: ["Doris Greene", "Malawi", "Feldkirchen in Kärnten", "$63,542"]
  },
  { className: "", data: ["Mason Porter", "Chile", "Gloucester", "$78,615"] },
  {
    className: "table-warning",
    data: ["Jon Porter", "Portugal", "Gloucester", "$98,615"]
  }
]

// [Ga]Data Config Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDM81i-uwyBLZ03es5f-guEFeYEcu165po",
  authDomain: "mug-inventory.firebaseapp.com",
  databaseURL: "https://mug-inventory.firebaseio.com",
  projectId: "mug-inventory",
  storageBucket: "mug-inventory.appspot.com",
  messagingSenderId: "991488024349",
  appId: "1:991488024349:web:b69b04920fe63255ba0bf4",
  measurementId: "G-KWJXPHWP26"
}

// tasks list for Tasks card in Dashboard view
// data for <thead> of table in TableList view
// data for <tbody> of table in TableList view
export { tasks, thead, tbody, firebaseConfig }
