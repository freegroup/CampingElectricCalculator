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
    uuid: "E7477671-FFBF-4BE4-807F-485E1C1CD2CC", 
    name: "Victron Energy Orion-Tr 24/12-10", 
    description: "Victron Energy Orion-Tr 24/12-10 DC/DC-Wandler 24 V/DC - 12.5 V/DC/12 A 120 W",
    imageSrc: images("./orion_tr_24_12_10.png"),
    exportable: true,
    shopping: [
      {
        shop: "Amazon",
        link: "https://amzn.to/3obMJpQ",
        label: "Victron Energy Orion-Tr 24/12-10 DC/DC-Wandler 24 V/DC - 12.5 V/DC/12 A 120 W",
        lastKnownPrice: 37.90
      }
    ],
    data: {
      strom_out: 10,
      spannung_in: 24,
      spannung_out: 12
    }
  },
  { 
    uuid: "A8B9C1D2-E3F4-4A5B-9C8D-7E6F5A4B3C2D", 
    name: "PEKAWAY USB-C Ladegerät 100W", 
    description: "PEKAWAY Caravan USB-C Netzteil 12/24V 100W, PD 3.0, Metall silber (CAMP 100W USB-C3)",
    imageSrc: images("./pekaway_100w.png"),
    exportable: true,
    shopping: [
      {
        shop: "Reichelt",
        link: "https://www.reichelt.de/de/de/shop/produkt/caravan_-_usb-c_netzteil_12_24_v_100_w_metall_silber-367044",
        label: "PEKAWAY Caravan USB-C Netzteil 12/24V 100W (CAMP 100W USB-C3)",
        lastKnownPrice: 67.95
      }
    ],
    data: {
      strom_out: 5,
      spannung_in: 12,
      spannung_out: 20
    }
  },
  /* NEW_COMPONENT_PLACE */
]
