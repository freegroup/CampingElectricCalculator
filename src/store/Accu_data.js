const images = require.context("@/assets/components/accu/", true, /\.png$/)

export default [
  { 
    uuid: "1", 
    type: "accu", 
    name: "LIONTRON 80Ah",
    description: "LIONTRON LiFePO4 12,8V 80Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_artic.png"),
    data: {
      ah: 80,
      spannung: 12,
      typ: "LiFePO4"
    }
  },
  { 
    uuid: "2", 
    type: "accu", 
    name: "LIONTRON 100Ah",
    description: "LIONTRON LiFePO4 12,8V 100Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_artic.png"),
    data: {
      ah: 100,
      spannung: 12,
      typ: "LiFePO4"
    }
  },
  { 
    uuid: "3", 
    type: "accu", 
    name: "LIONTRON 200Ah",
    description: "LIONTRON LiFePO4 12,8V 200Ah LX Smart BMS mit Bluetooth",
    imageSrc: images("./liotron_artic.png"),
    data: {
      ah: 200,
      spannung: 12,
      typ: "LiFePO4"
    }
  }
]
