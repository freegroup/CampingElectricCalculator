import { toFixed } from "@/utils/Wire.js"
const images = require.context("@/store/images/fridge/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "Generic Fridge", 
    imageSrc: images("./custom.png"),
    operationHours: 24,
    exportable: true,
    shopping: [],
    data: {
      spannung: 0, 
      strom: 0, // I=P/U
      liter: 0
    }
  },
  { 
    uuid: "1w3453lk245", 
    name: "Engel CK100", 
    imageSrc: images("./engel_ck100.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3GgZmq1",
        label: "Engel SAWSD90F-D-B Kompressorkühlschrank CK-100",
        lastKnownPrice: 869
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(32 / 12),
      liter: 80
    }
  }
  }/* NEW_COMPONENT_PLACE */
]
