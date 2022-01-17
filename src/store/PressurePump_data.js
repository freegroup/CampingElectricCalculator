const images = require.context("@/store/images/pressurePump/", true, /\.png$/)

export default [
  { 
    uuid: "1w3123pump43lk245", 
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
      durchfluss: 11.7,
      druck: 2.1,
      spannung: 12, 
      strom: 5
    }
  },
  { 
    uuid: "CEBC581C-B3F3-45C8-895A-BDBD1F3E35D5", 
    name: "Shurflo Soft-Serie", 
    imageSrc: images("./shurflo_soft.png"),
    operationHours: 2,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3nmtxFv",
        label: "Shurflo Druckwasserpumpe Soft-Serie 11,3 l/min",
        lastKnownPrice: 151
      }
    ],
    data: {
      durchfluss: 11.3,
      druck: 2.1,
      spannung: 12, 
      strom: 3.5
    }
  }
]
