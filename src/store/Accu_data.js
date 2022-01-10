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
        label: "LIONTRON LiFePO4 12,8V 100Ah",
        lastKnownPrice: 994
      }
    ],
    data: {
      amperestunden: 100,
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
        label: "LIONTRON LiFePO4 12,8V 200Ah",
        lastKnownPrice: 1796
      }
    ],
    data: {
      amperestunden: 200,
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
        label: "LIONTRON LiFePO4 12,8V 150Ah",
        lastKnownPrice: 1386
      }
    ],
    data: {
      amperestunden: 150,
      spannung: 12,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "10A62DB5-3195-47CC-9DCE-E249DD8F7789", 
    type: "accu", 
    name: "ECO-WORTHY 12V 30Ah LiFePO4",
    description: "ECO-WORTHY 12V 30Ah LiFePO4 with BMS",
    imageSrc: images("./eco_worthy_30Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tc7Uvq",
        label: "ECO-WORTHY 12V 30Ah LiFePO4 Akku wiederaufladbare Lithiumbatterie",
        lastKnownPrice: 115
      }
    ],
    data: {
      amperestunden: 30,
      spannung: 12,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "00DB77EB-C014-43BE-890F-251BE9F9859E", 
    type: "accu", 
    name: "ECO-WORTHY 12V 50Ah LiFePO4",
    description: "ECO-WORTHY 12V 50Ah LiFePO4 with BMS",
    imageSrc: images("./eco_worthy_50Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3qb8kQP",
        label: "ECO-WORTHY 12V 50Ah LiFePO4 Akku wiederaufladbare Lithiumbatterie",
        lastKnownPrice: 219
      }
    ],
    data: {
      amperestunden: 50,
      spannung: 12,
      type: "LiFePO4"
    }
  },
  { 
    uuid: "A1DBFC5E-8900-4AD4-8ED7-392B0F470AE0", 
    type: "accu", 
    name: "ECO-WORTHY 12V 100Ah LiFePO4",
    description: "ECO-WORTHY 12V 100Ah LiFePO4 with BMS",
    imageSrc: images("./eco_worthy_100Ah.png"),
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3qcaGz2",
        label: "ECO-WORTHY 12V 100Ah LiFePO4 Akku wiederaufladbare Lithiumbatterie",
        lastKnownPrice: 429
      }
    ],
    data: {
      amperestunden: 100,
      spannung: 12,
      type: "LiFePO4"
    }
  }
]
