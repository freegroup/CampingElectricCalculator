const images = require.context("@/store/images/usb/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "USB", 
    imageSrc: images("./custom.png"),
    operationHours: 24,
    exportable: true,
    shopping: [],
    data: {
      spannung_min: 0, 
      spannung_max: 0,
      buchsen: 0,      
      spannung_je_buchse: 0,
      strom_je_buchse: 0
    }
  },
  { 
    uuid: "1w312343lk245", 
    name: "USB", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3ob2nSu",
        label: "ProCar 67341000 Power USB-C/A",
        lastKnownPrice: 16.99
      }
    ],
    data: {
      spannung_min: 12, 
      spannung_max: 12,
      buchsen: 1,
      spannung_je_buchse: 5,
      strom_je_buchse: 3.6
    }
  },
  { 
    uuid: "EDACC5FF-10E2-4D4A-BEA7-34423E5EA813", 
    name: "USB", 
    imageSrc: images("./usb_12_24_front.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3ueSrLO",
        label: "Auto Dual USB Stecker",
        lastKnownPrice: 15.39
      }
    ],
    data: {
      spannung_min: 12, 
      spannung_max: 24,
      buchsen: 1,
      spannung_je_buchse: 5,
      strom_je_buchse: 3.6
    }
  }
  /* NEW_COMPONENT_PLACE */
]
