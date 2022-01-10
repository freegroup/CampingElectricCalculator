export default {
  en: {
    data: { 
      label: {
        amperestunden: "Ampere Hour",
        strom: "Current",
        nennladestrom: "Current",
        nennstrom: "Current",
        watt: "Watt",
        strom_je_anschluss: "Current / Unit",
        anschluesse: "Units",
        type: "Type",
        gewicht: "Weight",
        zellen: "Cells",
        leerlaufspannung: "Open-Circuit Voltage",
        kurzschlusstrom: "Short-Circuit Current",
        eingangsspannung: "Input Voltage",
        eingangsstrom: "Input Current",
        eingangswatt: "Input Watt",
        chargeSupport: "Supported Battery Types",
        spannung: "Voltage",
        operationHours: "Operation Hours",
        nennspannung: "Nominal Voltage"
      },
      unit: {
        amperestunden: "Ah",
        strom: "A",
        nennladestrom: "A",
        nennstrom: "A",
        strom_je_anschluss: "A",
        watt: "Watt",
        anschluesse: "",
        type: "",
        gewicht: "Gramm",
        zellen: "",
        leerlaufspannung: "Volt",
        kurzschlusstrom: "A",
        eingangsspannung: "Volt",
        eingangsstrom: "A",
        eingangswatt: "Watt",
        spannung: "Volt",
        nennspannung: "Volt",
        operationHours: "hours",
        chargeSupport: ""
      }
    },
    view: {
      shopping: {
        battery: "Battery",
        charge: "Charging Side",
        factsheet: "Factsheet",
        shops: "Online Shops",
        consumer: "Consumer Side"
      }
    },
    component: {
      solarBooster: "Solar Booster",
      killSwitch: "Power Switch",
      solarPanel: "Solar Panel",
      shoreBooster: "Shore Power Battery Charger",
      starterBooster: "DC-DC Booster",
      starterAccu: "Start Battery",
      alternator: "Alternator",
      accu: "Caravan Battery",
      fridge: "Fridge",
      fuse: "Fuse",
      fuseBox: "Fuse Box",
      pressurePump: "Pressure Pump",
      usb: "Usb Socket",
      usbConsumer: "Usb Charging Devices"
    },
    dialog: {
      selectComponent: {
        title: "Exchange Component",
        subtitle: "Replace the component with one of the same type but different characteristics"
      },
      consumer: {
        title: "Energy Consumption",
        subtitle: "Displays the total energy consumption flowing through this component"
      },
      balance: {
        title: "Energy Balance",
        subtitle: "An overview of the energy flowing into and out of the component"
      },
      addComponent: {
        okButton: "Close",
        title: "Add Component",
        subtitle: "Add a new component to the diagram which will be included in the total calculation."
      },
      error: {
        okButton: "Close",
        title: "Component Error",
        subtitle: "Indicates errors in the configuration of the components or their children"
      },
      info: {
        okButton: "Close",
        title: "Component Information",
        subtitle: "Technical details about the component"
      },
      timer: {
        okButton: "Apply",
        title: "Timer Settings",
        subtitle: "Set the average time per day that the device is in operation or charged from the power supply.",
        sliderLabel: "Hours/Day",
        sliderDescription: "Operation hours per day",
        description: "Not all devices are connected to the electrical system 24 hours a day and consume or providing electricity. <b>Here you can set how long you think the affected device is in operation on average per day.</b> These are items like cell phones, camera batteries, drone batteries, external chargers, water pumps, and so on. Basically anything that you charge and then unplug for use."
      },
      help: {
        okButton: "Close",
        title: "What does the tool do?",
        subtitle: "Simplifies the calculation of your currents and consumption of your electrics"
      }
    }
  },
  de: {
    message: {
      hello: 'Hallo Welt'
    },
    dialog: {
      selectComponent: {
        header: "Bauteil auswählen"
      }  
    }
  }
}
