const images = require.context("@/assets/components/usbConsumer/", true, /\.png$/)

const components = [
  { 
    uuid: "1w312343lk245phone", 
    type: "usbConsumer", 
    name: "SmartPhone ", 
    imageSrc: images("./phone_charge.png"),
    data: {
      spannung: 12, 
      strom: 1.5, // I=P/U
      watt: 1.5 * 12
    }
  }
]

export default components
