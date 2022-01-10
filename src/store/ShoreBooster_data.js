const images = require.context("@/store/images/shoreBooster/", true, /\.png$/)

export default [
  { 
    uuid: "C574D3F2-0164-46DF-BC2F-C558BA54599D", 
    type: "shoreBooster", 
    name: "Victron Energy 20A", 
    imageSrc: images("./victron_20A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3zJaNVC",
        label: "Victron Energy Blue Smart IP22 Lader 12/20(1) 230V",
        lastKnownPrice: 160
      }
    ],
    data: {
      chargeSupport: ["LiFePO4"],
      eingangsspannung: 230,
      spannung: 12,
      strom: 20,
      watt: 12 * 20
    }
  },
  { 
    uuid: "C7950C31-70F6-48C2-BE4A-95D856276FFC", 
    type: "shoreBooster", 
    name: "Victron Energy 30A", 
    imageSrc: images("./victron_30A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3tgWV3Q",
        label: "Victron Energy Blue Smart IP22 Lader 12/30(1) 230V",
        lastKnownPrice: 190
      }
    ],
    data: {
      chargeSupport: ["LiFePO4"],
      eingangsspannung: 230,
      spannung: 12,
      strom: 30,
      watt: 12 * 30
    }
  },
  { 
    uuid: "E74C9F12-B3A1-4654-9F83-04077138DECA", 
    type: "shoreBooster", 
    name: "H-TronicAutomatic 0.3A", 
    imageSrc: images("./htronic_03A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3qbQ9ui",
        label: "H-TronicAutomatic lead-acid battery wall socket charger",
        lastKnownPrice: 16.90
      }
    ],
    data: {
      chargeSupport: ["Blei"],
      eingangsspannung: 230,
      spannung: 12,
      strom: 0.3,
      watt: 12 * 0.3
    }
  }
]
