export default {
  en: {
    profile: {
      low: {
        name: "Pure Camper",
        description: "You travel mostly in the warm months, drive daily to new destinations, stay overnight from time to time on places with power supply and charge now and then, for example, your cell phone, tablet or laptop, the installed standard battery (usually 90 Ah AGM battery) and a 100 Wp solar panel is usually enough for you"
      },
      standard: {
        name: "Standard Camper",
        description: "Do you like to travel all year round and be completely free? Do you travel to new destinations (almost) every day and charge your cell phone, tablet or laptop from time to time, for example. A 100 Wp solar panel should normally be sufficient here."
      },
      aboveaverage: {
        name: "Frequent User",
        description: "Do you like to travel all year round and be completely free? You do not drive to new destinations every day and charge your cell phone, tablet or laptop and other devices, such as camera, drone and the like and would like to use a coffee maker or hair dryer?  Here I would recommend you at least 200 Wp solar as well as a lithium battery with min. 100Ah capacity."
      },
      power: {
        name: "Van Lifer",
        description: "For example, if you use your camper as a mobile office for several days, you should calculate your needs as described above. Because it is not possible to work with the laptop completely without electricity 🙂. There are no upper limits here."
      }
    },
    data: { 
      label: {
        amperestunden: "Ampere Hour",
        effective_amperestunden: "Usable Ampere Hour",
        strom: "Drawn Current",
        durchfluss: "Flow Rate",
        liter: "Volume",
        druck: "Pressure",
        nennladestrom: "Current",
        ladestrom: "Charge Current", // berechenter Ladestrom eines Charger in Abhängigkeit von input Watt
        ladespannung: "Charge Voltage",
        nennstrom: "Current",
        watt: "Watt",
        spannung_je_buchse: "Supplied Voltage",
        strom_je_buchse: "Supplied Current",
        strom_je_anschluss: "Current/Slot",
        strom_out: "Current (out)",
        strom_in: "Current (in)",
        anschluesse: "Units",
        buchsen: "Units",
        bms: "Discharge Protection (BMS)",
        type: "Type",
        gewicht: "Weight",
        zellen: "Cells",
        controller: "Controller",
        panel: "Panel",
        laenge: "Length",
        leerlaufspannung: "Open-Circuit Voltage",
        kurzschlussstrom: "Short-Circuit Current",
        eingangsspannung: "Input Voltage",
        eingangsspannung_min: "Input Voltage (min)",
        eingangsspannung_max: "Input Voltage (max)",
        eingangsstrom: "Input Current",
        eingangswatt: "Input Watt",
        chargeSupport: "Battery Types",
        spannung: "Voltage",
        spannung_in: "Voltage (in)",
        spannung_out: "Voltage (out)",
        spannung_min: "Voltage (min)",
        spannung_max: "Voltage (max)",
        operationHours: "Operation Hours",
        nennspannung: "Nominal Voltage"
      },
      unit: {
        amperestunden: "Ah",
        effective_amperestunden: "Ah",
        strom: "A",
        durchfluss: "L/min",
        liter: "Liter",
        druck: "bar",
        nennladestrom: "A",
        ladestrom: "A",
        panel: "",
        controller: "",
        ladespannung: "V",
        nennstrom: "A",
        bms: "",
        spannung_je_buchse: "V",
        strom_je_buchse: "A",
        strom_je_anschluss: "A",
        strom_out: "A",
        strom_in: "A",
        watt: "Watt",
        anschluesse: "",
        buchsen: "",
        type: "",
        gewicht: "Gramm",
        zellen: "",
        laenge: "Meter",
        leerlaufspannung: "V",
        kurzschlussstrom: "A",
        eingangsspannung: "V",
        eingangsspannung_min: "V",
        eingangsspannung_max: "V",
        eingangsstrom: "A",
        eingangswatt: "Watt",
        spannung: "V",
        spannung_in: "V",
        spannung_out: "V",
        spannung_min: "V",
        spannung_max: "V",
        nennspannung: "V",
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
      name: {
        solarBooster: "Solar Booster",
        dcdcBooster: "DC/DC Converter",
        solarSet: "Solar Panel + Controller",
        carSocket: "Car Socket",
        killSwitch: "Power Switch",
        switchPanel: "Switch Panel",
        solarPanel: "Solar Panel",
        shoreBooster: "Shore Power Battery Charger",
        batteryProtect: "Battery Protection",
        starterBooster: "DC-DC Booster",
        starterAccu: "Start Battery",
        alternator: "Alternator",
        accu: "Caravan Battery",
        fridge: "Fridge",
        heater: "Heater",
        fuse: "Fuse",
        fuseBox: "Fuse Box",
        pressurePump: "Pressure Pump",
        usb: "Usb Socket",
        usbConsumer: "Usb Charging Devices",
        light: "Light"
      },
      description: {
        switchPanel: "Install a switch panel to operate several appliances from one location in your camper. These switch panels.",
        dcdcBooster: "A DC-to-DC converter is an electronic circuit or electromechanical device that converts a source of direct current (DC) from one voltage level to another. ",
        solarBooster: "Solar charge controllers sits in between the solar panels and your battery and used to convert varying voltages from solar cells to charge batteries of different types (Acid, LiFePo4,..)",
        solarSet: "This was the easiest and quickest way to complete our solar panel setup but it's not necessarily the cheapest. If you don't want to fiddle around with solar panel too much with solar panel wiring and finding the right controller, then a solar panel kit is for you.",
        carSocket: "An automobile auxiliary power outlet (also known as power socket) in an automobile became a de facto standard DC connector to supply electrical power for portable accessories used in or near an automobile directly from the vehicle's electrical system",
        killSwitch: "Power switches are designed to cut-off electrical power, help protect against electrical fires when equipment is not in use. They also provide a reliable way to shut down electrical power during maintenance and protect batteries from excessive drain",
        solarPanel: "A solar panel is actually a collection of solar (or photovoltaic) cells, which can be used to generate electricity through photovoltaic effec",
        shoreBooster: "A shore power converter charger is another way to charge the solar system's battery. You can plug the charger into a standard 120V/220V outlet and it will rapidly recharge your battery",
        batteryProtect: "If the battery is discharged below the recommended end-of-discharge voltage, overall battery performance degrades, the cycle life is shortened and the battery may die prematurely. If the battery do not provide this as a build in feature, you should add this to your circuit",
        starterBooster: "They're a smart charger that runs off 12-volts. They do this by taking the power output of your vehicle's alternator and creating an output voltage and current that's ideally suited to charging and/or maintaining your auxiliary battery",
        starterAccu: "The starter battery (in the case of motor vehicles: car battery, cf. also lead battery) is an accumulator and supplies the electrical current for the starter of an internal combustion engine, for example of a motor vehicle.",
        alternator: "An alternator is a device, used especially in a car, that creates an electrical current. This software needs the information of the alternator to ensure that the current flow fits perfect to your DC-DC charger",
        accu: "An auxiliary battery system in a camper is to isolate the starting battery when the engine is not running—which prevents it from being drained and unable to start your vehicle. With the engine off (read: alternator not producing power), the auxiliary battery is used to power all of your interior accessories (interior lights, stereo, 12v fridge/freezer, etc.), thus preserving your starting battery for... well, for starting",
        fridge: "An RV fridge cools your food to a safe temperature for storage just like your fridge at home. Often, it is smaller to fit in the space of the RV and has a few special features, like latching doors and the ability to run on different power sources",
        fuse: "One of the common problems with the electrical system is the flow of excess current. The excess current can wreak havoc and to save yourself from that, there are fuses and circuit breakers",
        fuseBox: "Fuse boxes are used to individually fuse small end devices. This prevents that in the event of minor damage, the lines to the end loads are damaged or even the entire electrical system in the camper fails. You must add a fuse box for security reasons before you can add any consumer.",
        pressurePump: "The water pump pressurizes water lines in an RV to force water out. When you open a water fixture, it releases pressure and activates the water pump. The water pump repressurizes the water lines, and water continues to flow until you close the fixture",
        usb: "A USB plug socket is ideal for charging portable devices such as a smartphone or tablet",
        usbConsumer: "You can add your laptop, smart phone and other devices which can be charged via USB. This helps to calculate your overall power consumption",
        light: "Different light sources of LED strips, LED bulbs or spotlights in the outdoor area of the vehicle"
      }
    },
    dialog: {
      fileOpen: {
        title: "Open Example Configuration",
        subtitle: "Standard suggestions for laying out the electrical system in a camper according to the user profiles"
      },
      serial: {
        title: "Serial Connection",
        subtitle: "Connecting Solar Panels Together in Series"
      },
      parallel: {
        title: "Parallel Connection",
        subtitle: "Connecting Solar Panels Together in Parallel"
      },
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
        shopLabel: "Shops",
        suggestComponent: "Suggest new Component",
        subtitle: "Add a new component to the diagram which will be included in the total calculation.",
        lastKnownPrice: "Last known price"
      },
      wire: {
        okButton: "Close",
        title: "Wire Settings",
        suggest: "we recommend to use at least a wire diameter of <span class='font-weight-bold'>{d} mm&#178;</span> for the given connection.",
        subtitle: "Calculation of the wire diameter between the affected components"
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
