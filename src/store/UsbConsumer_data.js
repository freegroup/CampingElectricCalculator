const images = require.context("@/store/images/usbConsumer/", true, /\.png$/)

export default [
  { 
    uuid: "1w312343lk245phone", 
    type: "usbConsumer", 
    name: "SmartPhone", 
    imageSrc: images("./phone_charge.png"),
    operationHours: 2,
    shopping: [
    ],
    data: {
      spannung: 5, 
      strom: 1.5, // I=P/U
      watt: 1.5 * 5
    }
  },
  { 
    uuid: "4D17FAB4-DA63-4ED0-879F-DF34EF6BDFFA", 
    type: "usbConsumer", 
    name: "15inch Mac Book Pro", 
    imageSrc: images("./macbook_charge.png"),
    operationHours: 2,
    shopping: [
    ],
    data: {
      spannung: 5, 
      strom: 87 / 5, // I=P/U
      watt: 87
    }
  },
  { 
    uuid: "51EA546A-AF25-4C1C-8019-EC1DA24C697B", 
    type: "usbConsumer", 
    name: "13inch Mac Book Pro", 
    imageSrc: images("./macbook_charge.png"),
    operationHours: 2,
    shopping: [
    ],
    data: {
      spannung: 5, 
      strom: 61 / 5, // I=P/U
      watt: 61
    }
  },
  { 
    uuid: "901D2C87-35EE-4EBD-96AE-A890F62DF45A", 
    type: "usbConsumer", 
    name: "12inch Mac Book Pro", 
    imageSrc: images("./macbook_charge.png"),
    operationHours: 2,
    shopping: [
    ],
    data: {
      spannung: 5, 
      strom: 30 / 5, // I=P/U
      watt: 30
    }
  },
  { 
    uuid: "6F5314FF-D1B5-448F-AD82-9CE2C20B25ED", 
    type: "usbConsumer", 
    name: "Mac Book Air", 
    imageSrc: images("./macbook_charge.png"),
    operationHours: 2,
    shopping: [
    ],
    data: {
      spannung: 5, 
      strom: 30 / 5, // I=P/U
      watt: 30
    }
  }
]
