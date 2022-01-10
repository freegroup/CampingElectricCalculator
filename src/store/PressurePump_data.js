const images = require.context("@/store/images/pressurePump/", true, /\.png$/)

const components = [
  { 
    uuid: "1w3123pump43lk245", 
    type: "pressurePump", 
    name: "Lilie LP4142", 
    imageSrc: images("./lilie_lp4142.png"),
    operationHours: 2,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3nbrZ1j",
        label: "Lilie WhiteYellow Soft Serie Membran Water pump",
        lastKnownPrice: 105
      }
    ],
    data: {
      spannung: 12, 
      strom: 3.5,
      watt: 3.5 * 12 // P=I*U
    }
  }
]

export default components
