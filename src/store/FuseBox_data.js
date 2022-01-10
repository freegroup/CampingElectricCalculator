const images = require.context("@/store/images/fuseBox/", true, /\.png$/)

export default 
[
  { 
    uuid: "7asdf", 
    type: "fuseBox", 
    name: "Sicherungsbox 12", 
    imageSrc: images("./mictuning_12.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
    ],
    data: {
      strom: 100,
      spannung: 12,
      strom_je_anschluss: 15,
      anschluesse: 12
    }
  }
]
