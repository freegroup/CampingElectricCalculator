const images = require.context("@/store/images/carSocketCharger/", true, /\.png$/)

export default
[
  { 
    uuid: "custom", 
    name: "Generic Car Socket Charger", 
    description: "Generic USB Charger for Car Socket",
    imageSrc: images("./custom.png"),
    exportable: true,
    shopping: [],
    data: {
      strom: 0,
      watt: 0
    }
  },
  { 
    uuid: "C1D2E3F4-A5B6-4C7D-8E9F-0A1B2C3D4E5F", 
    name: "CTEK USB-Zigarettenanzünder-Adapter", 
    description: "CTEK USB-Zigarettenanzünder-Adapter 40-464, USB-C Kabel, für 12V, 8A, 60 Watt",
    imageSrc: images("./ctek.png"),
    exportable: true,
    shopping: [
      {
        shop: "Büromarkt AG",
        link: "https://www.bueromarkt-ag.de/usb-zigarettenanzuender-adapter_ctek_40-464,p-40-464.html",
        label: "CTEK USB-Zigarettenanzünder-Adapter 40-464",
        lastKnownPrice: 23.99
      }
    ],
    data: {
      strom: 8,
      watt: 60
    }
  }
  /* NEW_COMPONENT_PLACE */
]
