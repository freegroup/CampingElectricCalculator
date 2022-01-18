const images = require.context("@/store/images/switchPanel/", true, /\.png$/)

export default [
  { 
    uuid: "25750F25-43BC-4C2E-A583-2E185157F554", 
    name: "Meipire 5", 
    imageSrc: images("./meipire_5.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3ny0krr",
        label: "Meipire 5 Switch Panel with LED",
        lastKnownPrice: 12.99
      }
    ],
    data: {
      spannung: 12, 
      strom: 15, // I=P/U
      schalter: 5,      
      strom_je_anschluss: 3
    }
  }
]
