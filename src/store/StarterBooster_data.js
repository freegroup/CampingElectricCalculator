const images = require.context("@/store/images/starterBooster/", true, /\.png$/)

export default [
  { 
    uuid: "B522FFA9-0D08-4A82-9399-65B9D74A4B28", 
    type: "starterBooster", 
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
      type: "DC-DC Converter",
      eingangsspannung: 12,
      eingangsstrom: 15,
      spannung: 12,
      strom: 15,
      watt: 12 * 15
    }
  }
]
