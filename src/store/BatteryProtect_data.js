const images = require.context("@/store/images/batteryProtect/", true, /\.png$/)

export default
[
  { 
    uuid: "custom", 
    name: "Generic Battery Protection", 
    description: "Generic Battery Protection for an undefined type of battery",
    imageSrc: images("./custom.png"),
    exportable: true,
    shopping: [],
    data: {
      strom: 0,
      spannung: 0
    }
  },
  { 
    uuid: "7FA1FD36-70DE-4364-AAD7-5CE44D1953EC", 
    name: "Victron Battery Protect", 
    description: "The BatteryProtect function disconnects the battery from the (less important) consumers before it is completely discharged, which would damage it.",
    imageSrc: images("./victron_65A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3s2HD0y",
        label: "Victron Battery Protect 12/24V 65A programmierbar für Wohnmobil und Yacht",
        lastKnownPrice: 41.47
      }
    ],
    data: {
      strom: 65,
      spannung: 12
    }
  },
  { 
    uuid: "56332EB9-6752-40C2-80E0-9840DDE77CAA", 
    name: "VOTRONIC Battery Protector", 
    description: "VOTRONIC 4250683611260 3075 Battery Protector 40A",
    imageSrc: images("./votronic_12_40.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3ub8vhx",
        label: "VOTRONIC 4250683611260 3075 Battery Protector 40A",
        lastKnownPrice: 67.14
      }
    ],
    data: {
      strom: 40,
      spannung: 12
    }
  },
  { 
    uuid: "918E0563-E85C-4156-B4C8-2693547BB287", 
    name: "VOTRONIC Battery Protector", 
    description: "VOTRONIC 4250683611260 3075 Battery Protector 100A",
    imageSrc: images("./votronic_12_100.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/34lQUIC",
        label: "VOTRONIC 4250683611260 3075 Battery Protector 100A",
        lastKnownPrice: 130.14
      }
    ],
    data: {
      strom: 100,
      spannung: 12
    }
  },
  { 
    uuid: "4CC440B8-6702-4D4B-9E6D-D8F96FE4732E", 
    name: "VOTRONIC Battery Protector", 
    description: "VOTRONIC 4250683611260 3075 Battery Protector 100A",
    imageSrc: images("./votronic_24_100.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3G4DDkV",
        label: "VOTRONIC 4250683611260 3075 Battery Protector 100A",
        lastKnownPrice: 130.14
      }
    ],
    data: {
      strom: 100,
      spannung: 24
    }
  },
  { 
    uuid: "66D84D84-59AB-4419-A2E8-15EE79E285C9", 
    name: "Kemo M148", 
    description: "Kemo M148-24",
    imageSrc: images("./kemo_12V_10A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3reNikO",
        label: "Kemo M148-24 Batteriewächter",
        lastKnownPrice: 34.99
      }
    ],
    data: {
      strom: 10,
      spannung: 12
    }
  },
  { 
    uuid: "66D84D84-59AB-4419-A2E8-15EE79E285C9", 
    name: "Kemo M148", 
    description: "Kemo M148-24",
    imageSrc: images("./kemo_24V_10A.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3KQOTVT",
        label: "Kemo M148-24 Batteriewächter",
        lastKnownPrice: 34.99
      }
    ],
    data: {
      strom: 10,
      spannung: 24
    }
  }
  /* NEW_COMPONENT_PLACE */
]
