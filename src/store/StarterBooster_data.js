const images = require.context("@/store/images/starterBooster/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "Generic Alternator Charger", 
    imageSrc: images("./custom.png"),
    operationHours: 1,
    exportable: true,
    shopping: [],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      eingangsspannung_min: 0,
      eingangsspannung_max: 0,
      eingangsstrom: 0,
      spannung: 0,
      strom: 0
    }
  },
  { 
    uuid: "B522FFA9-0D08-4A82-9399-65B9D74A4B28", 
    name: "Schaudt WA121525", 
    imageSrc: images("./schaudt_wa121525.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3r6cTuS",
        label: "Schaudt 9990359 Booster WA 121525",
        lastKnownPrice: 146
      }
    ],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      eingangsspannung_min: 12,
      eingangsspannung_max: 15,
      eingangsstrom: 15,
      spannung: 12,
      strom: 15
    }
  },
  { 
    uuid: "7798DFAE-4555-48B5-BF48-CE891D09EF03", 
    name: "Victron Smart 24/12", 
    imageSrc: images("./victron_smart_24_12_20.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/33HdZW9",
        label: "Victron Orion-Tr Smart 24/12-20A (240W) DC DC Wandler Ladebooster B2B Lader",
        lastKnownPrice: 162.46
      }
    ],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      eingangsspannung_min: 20,
      eingangsspannung_max: 35,
      eingangsstrom: 10,
      spannung: 12,
      strom: 20
    }
  },
  { 
    uuid: "B039949C-2747-48F1-8607-C160A78E21C1", 
    name: "Victron Smart 24/12", 
    imageSrc: images("./victron_smart_24_12_30.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3fup5Ak",
        label: "Victron Orion-Tr Smart 24/12-30A (360W) DC DC Wandler Ladebooster B2B Lader",
        lastKnownPrice: 226.50
      }
    ],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      eingangsspannung_min: 20,
      eingangsspannung_max: 35,
      eingangsstrom: 15,
      spannung: 12,
      strom: 30
    }
  },
  { 
    uuid: "E64B8FC5-353F-40C5-942C-A5055E2A66C8", 
    name: "VOTRONIC VCC 12/12", 
    imageSrc: images("./votronic_20A.png"),
    operationHours: 1,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3IdufNr",
        label: "VOTRONIC Lade-Wandler VCC 1212",
        lastKnownPrice: 201.50
      }
    ],
    data: {
      chargeSupport: ["LiFePO4", "Blei", "AGM"],
      eingangsspannung_min: 10,
      eingangsspannung_max: 16.5,
      eingangsstrom: 20,
      spannung: 12,
      strom: 20
    }
  }
]
