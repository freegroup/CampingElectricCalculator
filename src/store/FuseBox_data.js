const images = require.context("@/store/images/fuseBox/", true, /\.png$/)

export default 
[
  { 
    uuid: "7asdf", 
    type: "fuseBox", 
    name: "Fusebox 12-slots", 
    imageSrc: images("./mictuning_12.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/331M0QM",
        label: "MICTUNING 12-Fach Fusebox, ATO Sicherungskasten mit LED-Anzeige",
        lastKnownPrice: 19.90
      }
    ],
    data: {
      strom: 100,
      spannung: 12,
      strom_je_anschluss: 15,
      anschluesse: 12
    }
  }
]
