const images = require.context("@/store/images/fuseBox/", true, /\.png$/)

export default 
[
  {
    uuid: "custom", 
    name: "Generic Fusebox", 
    imageSrc: images("./custom.png"),
    operationHours: 24,
    exportable: true,
    shopping: [],
    data: {
      strom: 0,
      spannung_min: 12,
      spannung_max: 48,
      strom_je_anschluss: 0,
      anschluesse: 0
    }
  },
  { 
    uuid: "7asdf", 
    name: "Fusebox", 
    imageSrc: images("./mictuning_12.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3obCT7J",
        label: "MICTUNING 12-Fach Fusebox, ATO Sicherungskasten mit LED-Anzeige",
        lastKnownPrice: 19.90
      }
    ],
    data: {
      strom: 100,
      spannung_min: 12,
      spannung_max: 12,
      strom_je_anschluss: 15,
      anschluesse: 12
    }
  },
  { 
    uuid: "012D2D77-DD37-4124-8ED4-AE03522519FA", 
    name: "MareTeam", 
    imageSrc: images("./mareteam_6.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3AZ4u1b",
        label: "Mareteam Sicherungspaneel mit Beleuchtung - 2 x 3 A, 2 x 6 A, 1 x 8 A, 1 x 10 A",
        lastKnownPrice: 52.90
      }
    ],
    data: {
      strom: 6 * 4,
      spannung_min: 12,
      spannung_max: 12,
      strom_je_anschluss: 4,
      anschluesse: 6
    }
  },
  { 
    uuid: "50FF3B1D-FF3F-43C5-8C48-D01B694EC2DF", 
    name: "Philippi - STV 106", 
    imageSrc: images("./philipi_stv106.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3s2OqY2",
        label: "Philippi - Stromkreisverteiler STV 106",
        lastKnownPrice: 120
      }
    ],
    data: {
      strom: 6 * 8,
      spannung_min: 12,
      spannung_max: 12,
      strom_je_anschluss: 8,
      anschluesse: 6
    }
  },
  { 
    uuid: "30ED8CBE-A6F5-4ABA-AEF0-3D6A7389D3E0", 
    name: "Philippi - STV 110", 
    imageSrc: images("./philipi_stv110.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3IKNZbs",
        label: "Philippi - Stromkreisverteiler STV 110",
        lastKnownPrice: 180
      }
    ],
    data: {
      strom: 10 * 8,
      spannung_min: 12,
      spannung_max: 12,
      strom_je_anschluss: 8,
      anschluesse: 10
    }
  },
  { 
    uuid: "432DED45-0BB0-4060-A788-43B0DDDDEC4F", 
    name: "Simple Fusebox", 
    imageSrc: images("./sicherungsfach_8.png"),
    operationHours: 24,
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3GesdeC",
        label: "Simple Fusebox 8x",
        lastKnownPrice: 11.99
      }
    ],
    data: {
      strom: 8 * 15,
      spannung_min: 12,
      spannung_max: 35,
      strom_je_anschluss: 15,
      anschluesse: 8
    }
  },
  /* NEW_COMPONENT_PLACE */
]
