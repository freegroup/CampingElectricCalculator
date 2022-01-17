const images = require.context("@/store/images/cooler/", true, /\.png$/)

export default [
  { 
    uuid: "F40CF4A7-6381-4ECC-9C3B-4A64C493C20B", 
    name: "Dino KRAFTPAKET", 
    imageSrc: images("./dino_28l.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3GpLaMo",
        label: "Dino KRAFTPAKET 131001 Kühlbox 12V 230V (WÄRMT & KÜHLT) HÖHE: 44cm GRÖSSE: 32-Liter (28L netto)",
        lastKnownPrice: 78.11
      }
    ],
    data: {
      spannung: 12, 
      strom: 48 / 12, // I=P/U
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
        link: "https://amzn.to/3GrCXaq",
        label: "Dino KRAFTPAKET 131002 Kühlbox 12V 230V (WÄRMT & KÜHLT) HÖHE: 42cm GRÖSSE: 45-Liter (40L netto)",
        lastKnownPrice: 111.19
      }
    ],
    data: {
      spannung: 12, 
      strom: 48 / 12, // I=P/U
      liter: 40
    }
  }
]
