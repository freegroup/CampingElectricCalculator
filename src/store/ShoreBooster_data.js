const images = require.context("@/store/images/shoreBooster/", true, /\.png$/)

export default [
  { 
    uuid: "custom",
    name: "Generic Shore Power Charger", 
    imageSrc: images("./custom.png"),
    operationHours: 1,
    exportable: true,
    shopping: [],
    data: {
      chargeSupport: ["LiFePO4"],
      eingangsspannung: 0,
      spannung: 0,
      strom: 0
    }
  },
  { 
    uuid: "C574D3F2-0164-46DF-BC2F-C558BA54599D",
    name: "Victron Energy", 
    imageSrc: images("./victron_20A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3uhW2Zl",
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
    name: "NRG Charger NXS", 
    imageSrc: images("./ngr_nxr_5A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3Hk0N8s",
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
    name: "Victron Energy", 
    imageSrc: images("./victron_30A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3AScX63",
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
    name: "H-TronicAutomatic", 
    imageSrc: images("./htronic_03A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/34lRBSe",
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
  },
  { 
    uuid: "20671AA5-CEBF-4366-89D9-D62A7F75E67F",
    name: "Victron Energy ", 
    imageSrc: images("./victron_24A_24V.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3IRMcla",
        label: "Victron Energy BPC241642002 Blue Smart IP22 Ladegerät 24/161 230V CEE 7/7, 24V/16A",
        lastKnownPrice: 179.90
      }
    ],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AMG"],
      eingangsspannung: 230,
      spannung: 24,
      strom: 24
    }
  },
  { 
    uuid: "B2D09015-4850-4F40-B2C7-4E38F33FEF4B",
    name: "Victron Energy ", 
    imageSrc: images("./victron_8A_24V.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3g8HJOv",
        label: "Victron Blue Smart IP22 Acculader24/8 ",
        lastKnownPrice: 134.53
      }
    ],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AMG"],
      eingangsspannung: 230,
      spannung: 24,
      strom: 8
    }
  }
  }/* NEW_COMPONENT_PLACE */
]
