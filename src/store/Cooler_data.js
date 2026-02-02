import { toFixed } from "@/utils/Wire.js"
const images = require.context("@/store/images/cooler/", true, /\.png$/)

export default [
  { 
    uuid: "custom", 
    name: "Generic Cooler", 
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
    uuid: "F40CF4A7-6381-4ECC-9C3B-4A64C493C20B", 
    name: "Dino KRAFTPAKET", 
    imageSrc: images("./dino_28l.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3KVpMkK",
        label: "Dino KRAFTPAKET 131001 Kühlbox 12V 230V (WÄRMT & KÜHLT) HÖHE: 44cm GRÖSSE: 32-Liter (28L netto)",
        lastKnownPrice: 78.11
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(48 / 12), // I=P/U
      liter: 28
    }
  },
  { 
    uuid: "2FF46743-7B05-4DB3-954A-C2CE12DF82AE", 
    name: "Dino KRAFTPAKET", 
    imageSrc: images("./dino_40l.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3g8suVM",
        label: "Dino KRAFTPAKET 131002 Kühlbox 12V 230V (WÄRMT & KÜHLT) HÖHE: 42cm GRÖSSE: 45-Liter (40L netto)",
        lastKnownPrice: 111.19
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(48 / 12), // I=P/U
      liter: 40
    }
  },
  { 
    uuid: "86F70CE9-9F47-45BC-AB3C-F24CC33A565B", 
    name: "DOMETIC Tropicool TCX 07", 
    imageSrc: images("./dometic_tropicool_tcx_07.png"),
    operationHours: 12,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3gghiX2",
        label: "DOMETIC Tropicool TCX 07",
        lastKnownPrice: 214.90
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(36 / 12), // I=P/U
      liter: 7
    }
  },
  { 
    uuid: "64010CEC-A57D-4C29-AA64-CECA927E5D89", 
    name: "DOMETIC Tropicool TCX 14", 
    imageSrc: images("./dometic_tropicool_tcx_14.png"),
    operationHours: 12,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/32Lgd6B",
        label: "DOMETIC Tropicool TCX 14",
        lastKnownPrice: 187
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(46 / 12),
      liter: 14
    }
  },
  { 
    uuid: "C8CC6F48-52C8-43A0-83B5-5CA2CAB6E1A2", 
    name: "DOMETIC Tropicool TCX 21", 
    imageSrc: images("./dometic_tropicool_tcx_21.png"),
    operationHours: 12,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3ATaYP2",
        label: "DOMETIC Tropicool TCX 21",
        lastKnownPrice: 212.90
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(46 / 12),
      liter: 21
    }
  },
  { 
    uuid: "81C5A751-C7BC-4B95-AEF4-DA5E8E4E25EC", 
    name: "DOMETIC Tropicool TCX 35", 
    imageSrc: images("./dometic_tropicool_tcx_35.png"),
    operationHours: 12,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3HhOrhc",
        label: "DOMETIC Tropicool TCX 35",
        lastKnownPrice: 259.00
      }
    ],
    data: {
      spannung: 12, 
      strom: toFixed(46 / 12),
      liter: 33
    }
  },
  /* NEW_COMPONENT_PLACE */
]
