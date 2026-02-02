const images = require.context("@/store/images/heater/", true, /\.png$/)

export default [
  { 
    uuid: "E93F0D45-1F8D-4340-BE22-1276CF0176E3", 
    name: "Autoterm Planar 2D", 
    imageSrc: images("./planar_2d.png"),
    operationHours: 8,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3G8YROI",
        label: "Autoterm Air 2D (ehemals Planar 2D) 2KW 12V Diesel - Standheizung mit Bedienteil PU-27",
        lastKnownPrice: 560.00
      }
    ],
    data: {
      spannung: 12, 
      strom: 2.42,
      heizleistung: 2000 
    }
  },
  { 
    uuid: "F773661B-67F6-4CAE-BBD6-85C484EAE51E", 
    name: "Tseipoaoi Standheizung", 
    imageSrc: images("./tseipoaoi.png"),
    operationHours: 8,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3s7j42e",
        label: "Tseipoaoi Standheizung,12V 5KW Diesel Standheizung",
        lastKnownPrice: 175.90
      }
    ],
    data: {
      spannung: 12, 
      strom: 5, // I=P/U
      heizleistung: 5000
    }
  }
  }/* NEW_COMPONENT_PLACE */
]
