const images = require.context("@/store/images/fridge/", true, /\.png$/)

export default [
  { 
    uuid: "1w3453lk245", 
    type: "fridge", 
    name: "Engel CK100", 
    imageSrc: images("./engel_ck100.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3HUxwBf",
        label: "Engel SAWSD90F-D-B Kompressorkühlschrank CK-100 12",
        lastKnownPrice: 869
      }
    ],
    data: {
      spannung: 12, 
      strom: 32 / 12, // I=P/U
      watt: 32,
      liter: 80
    }
  }
]
