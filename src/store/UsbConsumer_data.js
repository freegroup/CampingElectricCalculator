const images = require.context("@/store/images/usbConsumer/", true, /\.png$/)

const components = [
  { 
    uuid: "1w312343lk245phone", 
    type: "usbConsumer", 
    name: "SmartPhone ", 
    imageSrc: images("./phone_charge.png"),
    shopping: [
    ],
    data: {
      spannung: 12, 
      strom: 1.5, // I=P/U
      watt: 1.5 * 12
    }
  }
]

export default components
