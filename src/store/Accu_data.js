const images = require.context("@/store/images/accu/", true, /\.png$/)

export default [
  { 
    uuid: "6473ECD0-5189-4DB0-8E31-480975998729", 
    type: "accu", 
    name: "LIONTRON 100Ah",
    description: "LIONTRON LiFePO4 12,8V 100Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_100ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3t0bMQc",
        label: "LIONTRON LiFePO4 12,8V 100Ah"
      }
    ],
    data: {
      ah: 100,
      spannung: 12,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "BD79BE1F-AEF9-467E-A0B7-7270080AF600", 
    type: "accu", 
    name: "LIONTRON 200Ah",
    description: "LIONTRON LiFePO4 12,8V 200Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_200ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3mUKjeY",
        label: "LIONTRON LiFePO4 12,8V 200Ah"
      }
    ],
    data: {
      ah: 200,
      spannung: 12,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "FFF2A576-2AB2-4C0D-8982-C2053E83DC73", 
    type: "accu", 
    name: "LIONTRON 150Ah",
    description: "LIONTRON LiFePO4 12,8V 150Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_150ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3sX9xNx",
        label: "LIONTRON LiFePO4 12,8V 150Ah"
      }
    ],
    data: {
      ah: 150,
      spannung: 12,
      type: "LiFePO4"
    }
  }
]
