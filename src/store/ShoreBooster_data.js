const images = require.context("@/store/images/shoreBooster/", true, /\.png$/)

export default [
  { 
    uuid: "C574D3F2-0164-46DF-BC2F-C558BA54599D", 
    type: "shoreBooster", 
    name: "Victron Energy", 
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
      strom: 20
    }
  },
  { 
    uuid: "B5248EE2-1227-400F-A9B9-FCF112180998", 
    type: "shoreBooster", 
    name: "NRG Charger NXS", 
    imageSrc: images("./ngr_nxr_5A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3nnEXcp",
        label: "NRG Charger NXS 5.0 12V Batterien Ladegerät Blei Säure AGM Gel Calcium Batterie Automatik Ladegerät Auto",
        lastKnownPrice: 53.90
      }
    ],
    data: {
      chargeSupport: ["AGM", "Gel"],
      eingangsspannung: 230,
      spannung: 12,
      strom: 5
    }
  },
  { 
    uuid: "C7950C31-70F6-48C2-BE4A-95D856276FFC", 
    type: "shoreBooster", 
    name: "Victron Energy", 
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
      strom: 30
    }
  },
  { 
    uuid: "E74C9F12-B3A1-4654-9F83-04077138DECA", 
    type: "shoreBooster", 
    name: "H-TronicAutomatic", 
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
      strom: 0.3
    }
  }
]
