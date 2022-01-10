const images = require.context("@/store/images/usb/", true, /\.png$/)

export default [
  { 
    uuid: "1w312343lk245", 
    type: "usb", 
    name: "USB 3.6A", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 3.6, // I=P/U
      watt: 3.6 * 12,
      buchsen: 1
    }
  },
  { 
    uuid: "1w312343lk2452x", 
    type: "usb", 
    name: "2x USB 3.6A", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 2 * 3.6, // I=P/U
      watt: 2 * 3.6 * 12,
      buchsen: 2
    }
  },
  { 
    uuid: "1w312343lk2454x", 
    type: "usb", 
    name: "4x USB 3.6A", 
    imageSrc: images("./usb.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 4 * 3.6, // I=P/U
      watt: 4 * 3.6 * 12,
      buchsen: 4
    }
  }
]
