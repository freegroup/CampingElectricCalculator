const images = require.context("@/store/images/dcdcBooster/", true, /\.png$/)

export default
[
  { 
    uuid: "custom", 
    name: "Generic DC-DC Converter", 
    description: "Generic DC-DC Converter",
    imageSrc: images("./custom.png"),
    exportable: true,
    shopping: [],
    data: {
      strom_out: 0,
      spannung_in: 0,
      spannung_out: 0
    }
  },
  { 
    uuid: "FBB6A004-FDC3-4937-A08C-30DED8119B66", 
    name: "Victron Energy", 
    description: "Victron Energy Orion-Tr 24/12-10 DC/DC-Wandler 24 V/DC - 12.5 V/DC/12 A 120 W",
    imageSrc: images("./orion_tr_24_12_10.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3G8YrYJ",
        label: "Victron Energy Orion-Tr 24/12-10 DC/DC-Wandler 24 V/DC - 12.5 V/DC/12 A 120 W",
        lastKnownPrice: 37.90
      }
    ],
    data: {
      strom_out: 10,
      spannung_in: 24,
      spannung_out: 12
    }
  }
]
