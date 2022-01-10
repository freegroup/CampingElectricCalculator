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
  },
  { 
    uuid: "012D2D77-DD37-4124-8ED4-AE03522519FA", 
    type: "fuseBox", 
    name: "MareTeam 6-slots", 
    imageSrc: images("./mareteam_6.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3f72ZDE",
        label: "Mareteam Sicherungspaneel mit Beleuchtung - 2 x 3 A, 2 x 6 A, 1 x 8 A, 1 x 10 A",
        lastKnownPrice: 52.90
      }
    ],
    data: {
      strom: 6 * 4,
      spannung: 12,
      strom_je_anschluss: 4,
      anschluesse: 6
    }
  },
  { 
    uuid: "50FF3B1D-FF3F-43C5-8C48-D01B694EC2DF", 
    type: "fuseBox", 
    name: "Philippi - STV 106", 
    imageSrc: images("./philipi_stv106.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/33jQ2Um",
        label: "Philippi - Stromkreisverteiler STV 106",
        lastKnownPrice: 120
      }
    ],
    data: {
      strom: 6 * 8,
      spannung: 12,
      strom_je_anschluss: 8,
      anschluesse: 6
    }
  }
]
