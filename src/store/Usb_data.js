const images = require.context("@/store/images/usb/", true, /\.png$/)

export default [
  { 
    uuid: "1w312343lk245", 
    name: "USB", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3t9eWkF",
        label: "ProCar 67341000 Power USB-C/A",
        lastKnownPrice: 16.99
      }
    ],
    data: {
      spannung: 12, 
      strom: 3.6, // I=P/U
      buchsen: 1,      
      strom_je_anschluss: 3.6
    }
  },
  { 
    uuid: "1w312343lk2452x", 
    name: "USB", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3t9eWkF",
        label: "ProCar 67341000 Power USB-C/A",
        lastKnownPrice: 16.99
      }
    ],
    data: {
      spannung: 12, 
      strom: 2 * 3.6, // I=P/U
      buchsen: 2,
      strom_je_anschluss: 3.6
    }
  },
  { 
    uuid: "1w312343lk2454x", 
    name: "USB", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3t9eWkF",
        label: "ProCar 67341000 Power USB-C/A",
        lastKnownPrice: 16.99
      }
    ],
    data: {
      spannung: 12, 
      strom: 4 * 3.6, // I=P/U
      buchsen: 4,
      strom_je_anschluss: 3.6
    }
  }
]
