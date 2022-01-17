const images = require.context("@/store/images/light/", true, /\.png$/)

export default [
  { 
    uuid: "EA27D7A1-55A7-403A-8CB1-00A3D90830ED", 
    name: "Lamomo Warm 5m", 
    imageSrc: images("./lamomo_led_strip_2m.png"),
    operationHours: 2,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3fauKeA",
        label: "Lamomo LED Strip Warmweiss, 12V Dimmbar, 5M Wasserdicht 3000K LED Lichtband, Silikon Lichtleiste mit Netzteil und Controller",
        lastKnownPrice: 43
      }
    ],
    data: {
      spannung: 12, 
      strom: 11 / 12,
      laenge: 5
    }
  }
]
