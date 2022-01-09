const images = require.context("@/store/images/usbConsumer/", true, /\.png$/)

export default [
  { 
    uuid: "1w312343lk245phone", 
    type: "usbConsumer", 
    name: "SmartPhone ", 
    imageSrc: images("./phone_charge.png"),
    operationHours: 2,
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 1.5, // I=P/U
      watt: 1.5 * 12
    }
  }
]
