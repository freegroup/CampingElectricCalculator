export default {
  en: {
    units: {
      ampere: "A",
      ampereFull: "Ampere",
      volt: "V",
      voltFull: "Volt",
      watt: "W",
      wattFull: "Watt",
      millimeter: "mm",
      millimeterFull: "Millimeter",
      meter: "m",
      meterFull: "Meter",
      percent: "%",
      percentFull: "Percent",
      squareMillimeter: "mm²",
      squareMillimeterFull: "Square Millimeter"
    },
    wireCalculator: {
      title: "Wire Cross-Section Calculator",
      backButton: "Back",
      powerSource: "Power Source",
      consumer: "Consumer",
      systemVoltage: "System Voltage",
      cableLength: "Cable Length",
      current: "Current",
      power: "Power",
      powerConsumption: "Power Consumption",
      selectedCrossSection: "Selected Cross-Section",
      voltageDrop: "Voltage Drop",
      loss: "Loss",
      powerLoss: "Power Loss",
      calculatedCrossSection: "Calculated Cross-Section",
      recommendedCrossSection: "Recommended Cross-Section",
      quickSelection: "Quick Selection: Typical Applications",
      apply: "Apply",
      recommendations: {
        danger: "DANGER: Cable too thin!",
        barelyOk: "Just Barely OK",
        optimal: "Optimal Configuration!",
        good: "Good Configuration",
        acceptable: "Acceptable for Camping",
        critical: "Critical: High Voltage Drop!",
        dangerText: "WARNING: The selected cross-section ({selected} mm²) is too thin! The cable can overheat and poses a fire hazard. At least {minimum} mm² required!",
        barelyOkText: "The selected cross-section ({selected} mm²) is above the calculated minimum ({minimum} mm²), but thinner than recommended. For optimal performance, {recommended} mm² is recommended.",
        optimalText: "The voltage drop is {drop}% - optimal for camping applications. The cable is safely dimensioned.",
        goodText: "The voltage drop is {drop}% - good for most camping applications. The cable is safe, but a thicker cross-section would improve efficiency.",
        acceptableText: "The voltage drop is {drop}% - still acceptable for non-critical consumers. The cable is safe, but efficiency is not optimal. A thicker cable is recommended.",
        criticalText: "The voltage drop is {drop}% - critically high! Although the cable is thermally safe, too much energy is lost. Use a thicker cable or shorten the distance."
      },
      examples: {
        ledStrip: "LED Strip",
        usb: "USB",
        cooler: "Cooler Box",
        inverter: "Inverter",
        waterPump: "Water Pump"
      },
      info: {
        title: "How does the calculation work?",
        description: "This tool helps you find the optimal wire cross-section for your camping installation. The cross-section determines how efficiently current flows from the consumer to the source. The longer the cable and the higher the current, the thicker the cable should be to keep energy losses low.",
        formulaTitle: "Calculation Formula",
        formulaDescription: "The minimum wire cross-section is calculated using the following formula:",
        variables: {
          crossSection: "Cross-section",
          length: "Cable length",
          current: "Current",
          voltage: "Voltage",
          voltageDrop: "Max. voltage drop (2%)",
          conductivity: "Copper conductivity (56 m/Ω·mm²)"
        },
        factor2Title: "Factor 2",
        factor2Description: "Accounts for both forward and return lines (both cables together)"
      }
    },
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
        nennladestrom: "Rated Charge Current",
        ladestrom: "Charge Current", // berechenter Ladestrom eines Charger in Abhängigkeit von input Watt
        ladespannung: "Charge Voltage",
        nennstrom: "Rated Current",
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
        nennspannung: "Nominal Voltage",
        heizleistung: "Heating Power",
        watt: "Power"
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
        watt: "W",
        anschluesse: "",
        buchsen: "",
        type: "",
        gewicht: "Gramm",
        zellen: "",
        laenge: "m",
        leerlaufspannung: "V",
        kurzschlussstrom: "A",
        eingangsspannung: "V",
        eingangsspannung_min: "V",
        eingangsspannung_max: "V",
        eingangsstrom: "A",
        eingangswatt: "W",
        spannung: "V",
        spannung_in: "V",
        spannung_out: "V",
        spannung_min: "V",
        spannung_max: "V",
        nennspannung: "V",
        operationHours: "hours",
        heizleistung: "W",
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
        carSocketCharger: "Car Socket Charger",
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
        cooler: "Cooler Box",
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
        heater: "Diesel or gasoline air heaters draw their fuel from the vehicle tank or a separate tank and blow warm air into the living area. They need very little electrical power in continuous operation, but noticeably more during the glow phase at start-up.",
        dcdcBooster: "A DC-to-DC converter is an electronic circuit or electromechanical device that converts a source of direct current (DC) from one voltage level to another. ",
        carSocketCharger: "USB chargers that plug into the car socket (cigarette lighter) to charge phones, tablets, laptops and other USB devices. These adapters convert 12V DC to 5V USB power.",
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
        cooler: "Mobile cooler boxes that can be connected to a 12V cigarette lighter. Usually with a slightly smaller volume than built-in devices.",
        fuse: "One of the common problems with the electrical system is the flow of excess current. The excess current can wreak havoc and to save yourself from that, there are fuses and circuit breakers",
        fuseBox: "Fuse boxes are used to individually fuse small end devices. This prevents that in the event of minor damage, the lines to the end loads are damaged or even the entire electrical system in the camper fails. You must add a fuse box for security reasons before you can add any consumer.",
        pressurePump: "The water pump pressurizes water lines in an RV to force water out. When you open a water fixture, it releases pressure and activates the water pump. The water pump repressurizes the water lines, and water continues to flow until you close the fixture",
        usb: "A USB plug socket is ideal for charging portable devices such as a smartphone or tablet",
        usbConsumer: "You can add your laptop, smart phone and other devices which can be charged via USB. This helps to calculate your overall power consumption",
        light: "Different light sources of LED strips, LED bulbs or spotlights in the outdoor area of the vehicle"
      }
    },
    dialog: {
      common: {
        close: "Close",
        ok: "OK",
        cancel: "Cancel",
        apply: "Apply",
        copy: "Copy",
        moreDetails: "More details…",
        provider: "Provider",
        consumer: "Consumer"
      },
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
        subtitle: "Displays the total energy consumption flowing through or consumed by this component"
      },
      balance: {
        title: "Energy Balance",
        subtitle: "An overview of the energy flowing into and out of the component"
      },
      accuBalance: {
        title: "Energy Balance",
        subtitle: "An overview of the energy flowing into and out of the component",
        provider: "Provider",
        consumer: "Consumer"
      },
      inOutBalance: {
        input: "Input",
        output: "Output",
        providing: "Providing"
      },
      addComponent: {
        okButton: "Close",
        title: "Add Component",
        shopLabel: "Shops",
        suggestComponent: "Suggest new Component",
        subtitle: "Add a new component to the diagram which will be included in the total calculation.",
        lastKnownPrice: "Last known price",
        safetyInfo: "Only components that are technically suitable for this position are shown. Consumers require a fuse or fuse box between the battery. Battery management systems (BMS) or battery protection devices connect directly to the battery or fuse."
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
      loadProblem: {
        title: "Setup not fully restored",
        subtitle: "Some parts of your setup could not be loaded. Everything else is ready and you can simply carry on.",
        hint: "This usually happens when a component has been replaced or removed from our component database.",
        storageCorrupt: "Your last saved setup could not be read any more. We have loaded the standard setup for you instead.",
        configInvalid: "This setup could not be read. We have loaded the standard setup for you instead.",
        unknownBattery: "The battery of your setup is not available any more. We have inserted a standard battery instead.",
        unknownComponent: "\"{component}\" is not available any more and has been removed from your setup — together with everything that was connected to it."
      },
      info: {
        okButton: "Close",
        title: "Component Information",
        subtitle: "Technical details about the component",
        shoppingLinks: "Shopping Links",
        lastKnownPrice: "Last known price",
        suggestShop: "Suggest new shop"
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
    },
    toolbar: {
      title: "Camper Electric Configuration",
      open: "Open",
      save: "Save",
      parts: "Shopping Parts",
      help: "Help",
      coffee: "Send Me a Coffee",
      blog: "Blog",
      estimatedCost: "Estimated Cost"
    },
    footer: {
      visitors: "visitors",
      loading: "Loading...",
      madeWith: "Made with",
      forCampers: "for campers",
      analytics: "Analytics",
      imprint: "Imprint",
      privacy: "Privacy"
    },
    share: {
      button: "Share",
      title: "Camping Electric Calculator - Plan Your Camper Van Electrical System",
      text: "Calculate solar panels, batteries, and electrical components for your camper van!",
      native: "Share...",
      email: "Email",
      copyLink: "Copy Link",
      copied: "Copied!"
    },
    login: {
      title: "GitHub Login",
      login: "Login",
      logout: "Logout",
      explanation: "You only need to log in if you want to contribute change proposals or suggest new components. Otherwise, the software can be used anonymously without any restrictions. As it should be for good open source software... 😊",
      loginWithGitHub: "Login with GitHub"
    },
    overview: {
      appTitle: "Camper Electric Designer",
      hero: {
        title: "Freedom, Powered.",
        subtitle: "Design the perfect electrical system for your van life adventures. Simple, accurate, and completely free.",
        startButton: "Start Planning",
        calculateButton: "Calculate Yourself"
      },
      setupSection: {
        title: "Configurator",
        subtitle: "Select a template or start from scratch",
        weekender: {
          title: "The Weekender",
          description: "Lightweight setup for phones, lights & a small cooler. Ideal for short trips.",
          action: "Start Basic"
        },
        explorer: {
          title: "The Explorer",
          description: "Reliable power for laptops, fridge & off-grid capability.",
          action: "Start Comfort"
        },
        nomad: {
          title: "The Nomad",
          description: "Full amenities: Induction, AC & long-term autonomy.",
          action: "Start Pro"
        },
        custom: {
          title: "Custom Build",
          description: "Start with a blank canvas"
        }
      },
      howItWorks: {
        title: "Three Steps to Freedom",
        step1: {
          title: "1. Connect",
          description: "Drag & drop components. Simulate your real-world wiring easily."
        },
        step2: {
          title: "2. Calculate",
          description: "Instant feedback on capacity, power usage, and potential issues."
        },
        step3: {
          title: "3. Build",
          description: "Export your parts list and diagram to start your build with confidence."
        }
      },
      tools: {
        title: "Tools & Utilities",
        subtitle: "Useful tools for your camper conversion",
        wireCalculator: {
          title: "Wire Cross-Section Calculator",
          subtitle: "Calculate the optimal wire cross-section for your installation",
          description: "If you prefer to calculate everything yourself, use the wire calculator to quickly find the right wire cross-section. Enter cable length, current, and voltage to instantly get the recommended wire cross-section including voltage drop and power loss. Perfect for individual connections!",
          action: "Calculate Now"
        }
      },
      blog: {
        title: "Blog",
        subtitle: "Knowledge about 12 V camper electrics",
        description: "Background articles on cables, fuses, batteries, solar and charging technology — explained in plain language and linked to the matching calculator. New posts are added regularly.",
        action: "Read Now"
      },
      footer: {
        disclaimer: "This tool provides estimates. Always consult a professional electrician.",
        openSource: "Open Source Project",
        reportBug: "Report a Bug"
      }
    },
    tooltip: {
      energyBalance: "Energy Balance",
      exchangeComponent: "Exchange Component",
      removeComponent: "Remove Component"
    }
  },
  de: {
    units: {
      ampere: "A",
      ampereFull: "Ampere",
      volt: "V",
      voltFull: "Volt",
      watt: "W",
      wattFull: "Watt",
      millimeter: "mm",
      millimeterFull: "Millimeter",
      meter: "m",
      meterFull: "Meter",
      percent: "%",
      percentFull: "Prozent",
      squareMillimeter: "mm²",
      squareMillimeterFull: "Quadratmillimeter"
    },
    wireCalculator: {
      title: "Kabelquerschnitt Rechner",
      backButton: "Zurück",
      powerSource: "Spannungsquelle",
      consumer: "Verbraucher",
      systemVoltage: "Systemspannung",
      cableLength: "Kabellänge",
      current: "Stromstärke",
      power: "Leistung",
      powerConsumption: "Leistungsaufnahme",
      selectedCrossSection: "Gewählter Querschnitt",
      voltageDrop: "Spannungsabfall",
      loss: "Verlust",
      powerLoss: "Leistungsverlust",
      calculatedCrossSection: "Berechneter Querschnitt",
      recommendedCrossSection: "Empfohlener Querschnitt",
      quickSelection: "Schnellauswahl: Typische Anwendungen",
      apply: "Übernehmen",
      recommendations: {
        danger: "GEFAHR: Kabel zu dünn!",
        barelyOk: "Gerade noch OK",
        optimal: "Optimale Konfiguration!",
        good: "Gute Konfiguration",
        acceptable: "Akzeptabel für Camping",
        critical: "Kritisch: Hoher Spannungsabfall!",
        dangerText: "WARNUNG: Der gewählte Querschnitt ({selected} mm²) ist zu dünn! Das Kabel kann überhitzen und stellt eine Brandgefahr dar. Mindestens {minimum} mm² erforderlich!",
        barelyOkText: "Der gewählte Querschnitt ({selected} mm²) liegt über dem berechneten Minimum ({minimum} mm²), ist aber dünner als empfohlen. Für optimale Leistung wird {recommended} mm² empfohlen.",
        optimalText: "Der Spannungsabfall liegt bei {drop}% - optimal für Camping-Anwendungen. Das Kabel ist sicher dimensioniert.",
        goodText: "Der Spannungsabfall liegt bei {drop}% - gut für die meisten Camping-Anwendungen. Das Kabel ist sicher, aber ein dickerer Querschnitt würde die Effizienz verbessern.",
        acceptableText: "Der Spannungsabfall liegt bei {drop}% - noch akzeptabel für unkritische Verbraucher. Das Kabel ist sicher, aber die Effizienz ist nicht optimal. Ein dickeres Kabel wird empfohlen.",
        criticalText: "Der Spannungsabfall liegt bei {drop}% - kritisch hoch! Obwohl das Kabel thermisch sicher ist, geht zu viel Energie verloren. Verwenden Sie ein dickeres Kabel oder verkürzen Sie die Strecke."
      },
      examples: {
        ledStrip: "LED Strip",
        usb: "USB",
        cooler: "Kühlbox",
        inverter: "Wechselrichter",
        waterPump: "Wasserpumpe"
      },
      info: {
        title: "Wie funktioniert die Berechnung?",
        description: "Dieses Tool hilft Ihnen, den optimalen Kabelquerschnitt für Ihre Camping-Installation zu finden. Der Querschnitt bestimmt, wie effizient Strom vom Verbraucher zur Quelle fließt. Je länger das Kabel und je höher der Strom, desto dicker sollte das Kabel sein, um Energieverluste gering zu halten.",
        formulaTitle: "Berechnungsformel",
        formulaDescription: "Der minimale Kabelquerschnitt wird nach folgender Formel berechnet:",
        variables: {
          crossSection: "Querschnitt",
          length: "Kabellänge",
          current: "Stromstärke",
          voltage: "Spannung",
          voltageDrop: "Max. Spannungsabfall (2%)",
          conductivity: "Leitfähigkeit Kupfer (56 m/Ω·mm²)"
        },
        factor2Title: "Faktor 2",
        factor2Description: "Berücksichtigt Hin- und Rückleitung (beide Kabel zusammen)"
      }
    },
    message: {
      hello: 'Hallo Welt'
    },
    profile: {
      low: {
        name: "Der Purist",
        description: "Du reist meist in den warmen Monaten, fährst täglich zu neuen Zielen, übernachtest ab und zu auf Plätzen mit Stromanschluss und lädst hin und wieder z.B. Handy, Tablet oder Laptop. Die verbaute Standardbatterie (meist 90 Ah AGM) und ein 100 Wp Solarpanel reichen dir meistens."
      },
      standard: {
        name: "Standard Camper",
        description: "Reist du gerne das ganze Jahr über und bist völlig frei? Fährst du (fast) jeden Tag neue Ziele an und lädst ab und zu Handy, Tablet oder Laptop? Ein 100 Wp Solarpanel sollte hier normalerweise ausreichen."
      },
      aboveaverage: {
        name: "Vielnutzer",
        description: "Reist du gerne das ganze Jahr über und bist völlig frei? Du fährst nicht jeden Tag neue Ziele an, lädst Handy, Tablet, Laptop und andere Geräte wie Kamera, Drohne u.ä. und möchtest Kaffeemaschine oder Föhn nutzen? Hier empfehle ich dir mindestens 200 Wp Solar sowie eine Lithium-Batterie mit mind. 100Ah Kapazität."
      },
      power: {
        name: "Van Lifer",
        description: "Wenn du deinen Camper zum Beispiel mehrere Tage als mobiles Büro nutzt, solltest du deinen Bedarf wie oben beschrieben berechnen. Denn ganz ohne Strom mit dem Laptop arbeiten ist nicht möglich 🙂. Hier gibt es keine Obergrenzen."
      }
    },
    data: { 
      label: {
        amperestunden: "Amperestunden",
        effective_amperestunden: "Nutzbare Amperestunden",
        strom: "Stromaufnahme",
        durchfluss: "Durchflussrate",
        liter: "Volumen",
        druck: "Druck",
        nennladestrom: "Nennladestrom",
        ladestrom: "Ladestrom", 
        ladespannung: "Ladespannung",
        nennstrom: "Nennstrom",
        spannung_je_buchse: "Ausgangsspannung",
        strom_je_buchse: "Ausgangsstrom",
        strom_je_anschluss: "Strom/Anschluss",
        strom_out: "Strom (aus)",
        strom_in: "Strom (ein)",
        anschluesse: "Anschlüsse",
        buchsen: "Buchsen",
        bms: "Entladeschutz (BMS)",
        type: "Typ",
        gewicht: "Gewicht",
        zellen: "Zellen",
        controller: "Regler",
        panel: "Panel",
        laenge: "Länge",
        leerlaufspannung: "Leerlaufspannung",
        kurzschlussstrom: "Kurzschlussstrom",
        eingangsspannung: "Eingangsspannung",
        eingangsspannung_min: "Eingangsspannung (min)",
        eingangsspannung_max: "Eingangsspannung (max)",
        eingangsstrom: "Eingangsstrom",
        eingangswatt: "Eingangsleistung (Watt)",
        chargeSupport: "Batterietypen",
        spannung: "Spannung",
        spannung_in: "Spannung (ein)",
        spannung_out: "Spannung (aus)",
        spannung_min: "Spannung (min)",
        spannung_max: "Spannung (max)",
        operationHours: "Betriebsstunden",
        nennspannung: "Nennspannung",
        heizleistung: "Heizleistung",
        watt: "Leistung"
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
        watt: "W",
        anschluesse: "",
        buchsen: "",
        type: "",
        gewicht: "Gramm",
        zellen: "",
        laenge: "m",
        leerlaufspannung: "V",
        kurzschlussstrom: "A",
        eingangsspannung: "V",
        eingangsspannung_min: "V",
        eingangsspannung_max: "V",
        eingangsstrom: "A",
        eingangswatt: "W",
        spannung: "V",
        spannung_in: "V",
        spannung_out: "V",
        spannung_min: "V",
        spannung_max: "V",
        nennspannung: "V",
        operationHours: "Stunden",
        heizleistung: "W",
        chargeSupport: ""
      }
    },
    view: {
      shopping: {
        battery: "Batterie",
        charge: "Ladeseite",
        factsheet: "Datenblatt",
        shops: "Online Shops",
        consumer: "Verbraucherseite"
      }
    },
    component: {
      name: {
        solarBooster: "Solar-Laderegler",
        dcdcBooster: "DC/DC Wandler",
        solarSet: "Solar Set",
        carSocket: "KFZ Steckdose",
        carSocketCharger: "KFZ Steckdosen-Ladegerät",
        killSwitch: "Trennschalter",
        switchPanel: "Schaltpanel",
        solarPanel: "Solarpanel",
        shoreBooster: "Landstrom-Ladegerät",
        batteryProtect: "Batterieschutz",
        starterBooster: "Ladebooster",
        starterAccu: "Starterbatterie",
        alternator: "Lichtmaschine",
        accu: "Versorgungsbatterie",
        fridge: "Kühlschrank",
        cooler: "Kühlbox",
        heater: "Standheizung",
        fuse: "Sicherung",
        fuseBox: "Sicherungskasten",
        pressurePump: "Druckwasserpumpe",
        usb: "USB Steckdose",
        usbConsumer: "USB Verbraucher",
        light: "Licht"
      },
      description: {
        switchPanel: "Installiere ein Schaltpanel, um mehrere Geräte von einem Ort in deinem Camper aus zu bedienen.",
        heater: "Diesel- oder Benzin-Standheizungen beziehen ihren Brennstoff aus dem Fahrzeugtank oder einem separaten Tank und blasen warme Luft in den Wohnraum. Im Dauerbetrieb brauchen sie sehr wenig Strom, beim Start während der Glühphase dagegen deutlich mehr.",
        dcdcBooster: "Ein Gleichspannungswandler (DC-DC-Wandler) ist eine elektrische Schaltung, die eine am Eingang zugeführte Gleichspannung in eine Gleichspannung mit höherem, niedrigerem oder invertiertem Spannungsniveau umwandelt.",
        carSocketCharger: "USB-Ladegeräte, die in die KFZ-Steckdose (Zigarettenanzünder) gesteckt werden, um Handys, Tablets, Laptops und andere USB-Geräte zu laden. Diese Adapter wandeln 12V DC in 5V USB-Strom um.",
        solarBooster: "Solar-Laderegler sitzen zwischen den Solarmodulen und der Batterie. Sie wandeln die schwankende Spannung der Solarzellen um, um Batterien verschiedener Typen (Blei, LiFePo4,..) optimal zu laden.",
        solarSet: "Dies ist der einfachste und schnellste Weg, dein Solar-Setup zu vervollständigen, aber nicht unbedingt der günstigste. Wenn du dich nicht zu sehr mit der Verkabelung und der Suche nach dem richtigen Regler beschäftigen willst, ist ein Solar-Kit das Richtige für dich.",
        carSocket: "Eine KFZ-Bordspannungssteckdose (Zigarettenanzünder) ist ein Standard-Gleichstromanschluss zur Versorgung tragbarer Geräte, die im oder am Fahrzeug verwendet werden, direkt aus dem Bordnetz.",
        killSwitch: "Trennschalter dienen dazu, den Stromfluss zu unterbrechen und helfen, Kabelbrände zu vermeiden, wenn die Ausrüstung nicht in Gebrauch ist. Sie bieten auch eine zuverlässige Möglichkeit, den Strom während Wartungsarbeiten abzuschalten und schützen Batterien vor übermäßiger Entladung.",
        solarPanel: "Ein Solarmodul ist eine Ansammlung von Solarzellen (Photovoltaikzellen), die zur Stromerzeugung durch den photovoltaischen Effekt genutzt werden können.",
        shoreBooster: "Ein Landstrom-Ladegerät ist eine weitere Möglichkeit, die Batterie des Solarsystems zu laden. Du kannst das Ladegerät an eine normale 230V-Steckdose anschließen und deine Batterie schnell aufladen.",
        batteryProtect: "Wenn die Batterie unter die empfohlene Entladeschlussspannung entladen wird, verschlechtert sich die Gesamtleistung, die Lebensdauer verkürzt sich und die Batterie kann vorzeitig ausfallen. Wenn die Batterie diese Funktion nicht integriert hat, solltest du diesen Schutz hinzufügen.",
        starterBooster: "Ein Ladebooster ist ein intelligentes Ladegerät, das mit 12 Volt betrieben wird. Es nutzt die Leistung der Lichtmaschine und erzeugt eine Ausgangsspannung und einen Strom, der ideal zum Laden und/oder Erhalten deiner Zusatzbatterie geeignet ist.",
        starterAccu: "Die Starterbatterie (bei Kraftfahrzeugen: Autobatterie) ist ein Akkumulator, der den elektrischen Strom für den Anlasser eines Verbrennungsmotors liefert.",
        alternator: "Eine Lichtmaschine ist ein Generator, der insbesondere in Autos verwendet wird, um elektrischen Strom zu erzeugen. Diese Software benötigt die Daten der Lichtmaschine, um sicherzustellen, dass der Stromfluss perfekt zu deinem Ladebooster passt.",
        accu: "Eine Zusatzbatterie im Camper dient dazu, die Starterbatterie zu isolieren, wenn der Motor nicht läuft – so wird verhindert, dass sie entladen wird und das Fahrzeug nicht mehr startet. Bei abgestelltem Motor versorgt die Zusatzbatterie alle Verbraucher im Innenraum (Licht, Radio, 12V-Kühlschrank usw.).",
        fridge: "Ein Camping-Kühlschrank kühlt deine Lebensmittel auf eine sichere Lagertemperatur, genau wie zu Hause. Oft ist er kleiner, um in den Camper zu passen, und hat spezielle Funktionen wie verriegelbare Türen und die Möglichkeit, mit verschiedenen Energiequellen betrieben zu werden.",
        cooler: "Mobile Kühlboxen, die an einen 12V Zigarettenanzünder angeschlossen werden können. Meist mit einem etwas geringeren Volumen als die Einbaugeräte.",
        fuse: "Ein häufiges Problem in elektrischen Systemen ist ein zu hoher Stromfluss. Dieser kann Schäden verursachen. Um dich und dein System davor zu schützen, gibt es Sicherungen und Schutzschalter.",
        fuseBox: "Sicherungskästen werden verwendet, um kleine Endgeräte einzeln abzusichern. Dies verhindert, dass bei einem kleinen Schaden die Leitungen zu den Endverbrauchern beschädigt werden oder gar das gesamte Bordnetz ausfällt. Aus Sicherheitsgründen musst du einen Sicherungskasten hinzufügen, bevor du Verbraucher anschließen kannst.",
        pressurePump: "Die Wasserpumpe setzt die Wasserleitungen im Wohnmobil unter Druck. Wenn du einen Wasserhahn öffnest, entweicht der Druck und die Pumpe springt an. Sie hält den Druck aufrecht, solange Wasser fließt, bis du den Hahn wieder schließt.",
        usb: "Eine USB-Steckdose ist ideal zum Laden tragbarer Geräte wie Smartphone oder Tablet.",
        usbConsumer: "Du kannst deinen Laptop, dein Smartphone und andere Geräte hinzufügen, die über USB geladen werden. Dies hilft, deinen Gesamtstromverbrauch zu berechnen.",
        light: "Verschiedene Lichtquellen wie LED-Streifen, LED-Birnen oder Strahler im Außenbereich des Fahrzeugs."
      }
    },
    dialog: {
      common: {
        close: "Schließen",
        ok: "OK",
        cancel: "Abbrechen",
        apply: "Übernehmen",
        copy: "Kopieren",
        moreDetails: "Mehr Details…",
        provider: "Erzeuger",
        consumer: "Verbraucher"
      },
      fileOpen: {
        title: "Beispielkonfiguration öffnen",
        subtitle: "Standardvorschläge für die Auslegung der Elektrik in einem Camper basierend auf Nutzerprofilen"
      },
      serial: {
        title: "Reihenschaltung",
        subtitle: "Verbindung von Solarmodulen in Reihe"
      },
      parallel: {
        title: "Parallelschaltung",
        subtitle: "Verbindung von Solarmodulen parallel"
      },
      selectComponent: {
        title: "Komponente austauschen",
        subtitle: "Ersetze die Komponente durch eine des gleichen Typs, aber mit anderen Eigenschaften",
        header: "Bauteil auswählen"
      },
      consumer: {
        title: "Energieverbrauch",
        subtitle: "Zeigt den gesamten Energieverbrauch an, der durch diese Komponente fließt oder von dieser verbraucht wird"
      },
      balance: {
        title: "Energiebilanz",
        subtitle: "Eine Übersicht über die Energie, die in und aus der Komponente fließt"
      },
      accuBalance: {
        title: "Energiebilanz",
        subtitle: "Eine Übersicht über die Energie, die in und aus der Komponente fließt",
        provider: "Erzeuger",
        consumer: "Verbraucher"
      },
      inOutBalance: {
        input: "Eingang",
        output: "Ausgang",
        providing: "Bereitstellung"
      },
      addComponent: {
        okButton: "Schließen",
        title: "Komponente hinzufügen",
        shopLabel: "Shops",
        suggestComponent: "Neue Komponente vorschlagen",
        subtitle: "Füge eine neue Komponente zum Diagramm hinzu, die in die Gesamtberechnung einbezogen wird.",
        lastKnownPrice: "Letzter bekannter Preis",
        safetyInfo: "Es werden nur Komponenten angezeigt, die an dieser Stelle technisch sinnvoll sind. Verbraucher benötigen eine Sicherung oder einen Sicherungskasten zwischen der Batterie. Batteriemanagementsysteme (BMS) oder Batterieschutzgeräte werden direkt an die Batterie oder Sicherung angeschlossen."
      },
      wire: {
        okButton: "Schließen",
        title: "Kabel-Einstellungen",
        suggest: "Wir empfehlen, einen Kabelquerschnitt von mindestens <span class='font-weight-bold'>{d} mm&#178;</span> für die gewählte Verbindung zu verwenden.",
        subtitle: "Berechnung des Kabelquerschnitts zwischen den betroffenen Komponenten"
      },
      error: {
        okButton: "Schließen",
        title: "Komponenten-Fehler",
        subtitle: "Zeigt Fehler in der Konfiguration der Komponenten oder ihrer untergeordneten Elemente an"
      },
      loadProblem: {
        title: "Aufbau nicht vollständig geladen",
        subtitle: "Ein paar Teile deines Aufbaus konnten nicht geladen werden. Alles andere steht bereit und du kannst ganz normal weiterarbeiten.",
        hint: "Das passiert meistens dann, wenn eine Komponente in unserer Komponenten-Datenbank ersetzt oder entfernt wurde.",
        storageCorrupt: "Dein zuletzt gespeicherter Aufbau war leider nicht mehr lesbar. Wir haben stattdessen den Standard-Aufbau für dich geladen.",
        configInvalid: "Dieser Aufbau konnte nicht gelesen werden. Wir haben stattdessen den Standard-Aufbau für dich geladen.",
        unknownBattery: "Die Batterie deines Aufbaus gibt es nicht mehr. Wir haben stattdessen eine Standard-Batterie eingesetzt.",
        unknownComponent: "„{component}“ gibt es nicht mehr und wurde aus deinem Aufbau entfernt — zusammen mit allem, was daran hing."
      },
      info: {
        okButton: "Schließen",
        title: "Komponenten-Information",
        subtitle: "Technische Details zur Komponente",
        shoppingLinks: "Einkaufslinks",
        lastKnownPrice: "Letzter bekannter Preis",
        suggestShop: "Shop vorschlagen"
      },
      timer: {
        okButton: "Übernehmen",
        title: "Timer-Einstellungen",
        subtitle: "Stelle die durchschnittliche Zeit pro Tag ein, die das Gerät in Betrieb ist oder geladen wird.",
        sliderLabel: "Stunden/Tag",
        sliderDescription: "Betriebsstunden pro Tag",
        description: "Nicht alle Geräte sind 24 Stunden am Tag angeschlossen und verbrauchen oder liefern Strom. <b>Hier kannst du einstellen, wie lange das betroffene Gerät deiner Meinung nach durchschnittlich pro Tag in Betrieb ist.</b> Das betrifft Dinge wie Handys, Akkus, Wasserpumpen usw. Im Grunde alles, was man lädt oder einschaltet und dann wieder trennt/ausschaltet."
      },
      help: {
        okButton: "Schließen",
        title: "Was macht das Tool?",
        subtitle: "Vereinfacht die Berechnung deiner Ströme und des Verbrauchs deiner Elektrik"
      }
    },
    toolbar: {
      title: "Camper Elektrik Konfigurator",
      open: "Öffnen",
      save: "Speichern",
      parts: "Einkaufsliste",
      help: "Hilfe",
      coffee: "Spendiere mir einen Kaffee",
      blog: "Blog",
      estimatedCost: "Geschätzte Kosten"
    },
    footer: {
      visitors: "Besucher",
      loading: "Lädt...",
      madeWith: "Gemacht mit",
      forCampers: "für Camper",
      analytics: "Statistiken",
      imprint: "Impressum",
      privacy: "Datenschutz"
    },
    share: {
      button: "Teilen",
      title: "Camping Elektrik Konfigurator - Plane deine Camper Van Elektrik",
      text: "Berechne Solaranlagen, Batterien und elektrische Komponenten für deinen Camper!",
      native: "Teilen...",
      email: "E-Mail",
      copyLink: "Link kopieren",
      copied: "Kopiert!"
    },
    login: {
      title: "GitHub Login",
      login: "Anmelden",
      logout: "Abmelden",
      explanation: "Es ist nur notwendig sich anzumelden, wenn Sie Änderungsvorschläge oder neue Komponenten beitragen wollen. Ansonsten kann die Software ohne Einschränkungen natürlich auch anonym verwendet werden. Wie es sich für gute Open Source Software gehört... 😊",
      loginWithGitHub: "Mit GitHub anmelden"
    },
    overview: {
      appTitle: "Camper Elektrik Designer",
      hero: {
        title: "Unabhängig unterwegs, Individuell.",
        subtitle: "Entwerfe das perfekte Elektriksystem für deine Van-Life-Abenteuer. Einfach, präzise und komplett kostenlos.",
        startButton: "Planung Starten",
        calculateButton: "Selber Berechnen"
      },
      setupSection: {
        title: "Konfigurator",
        subtitle: "Wähle eine Vorlage oder starte von Grund auf",
        weekender: {
          title: "Der Wochenendler",
          description: "Leichtes Setup für Handys, Licht & kleine Kühlbox. Ideal für Kurztrips.",
          action: "Basis Starten"
        },
        explorer: {
          title: "Der Entdecker",
          description: "Zuverlässige Stromversorgung für Laptop, Kühlschrank & Autarkie.",
          action: "Komfort Starten"
        },
        nomad: {
          title: "Der Nomade",
          description: "Volle Ausstattung: Induktion, Klimaanlage & Langzeit-Autarkie.",
          action: "Profi Starten"
        },
        custom: {
          title: "Individueller Aufbau",
          description: "Mit leerer Leinwand starten"
        }
      },
      howItWorks: {
        title: "Drei Schritte zur Freiheit",
        step1: {
          title: "1. Verbinden",
          description: "Drag & Drop Komponenten. Simuliere deine reale Verkabelung einfach."
        },
        step2: {
          title: "2. Berechnen",
          description: "Sofortiges Feedback zu Kapazität, Stromverbrauch und möglichen Problemen."
        },
        step3: {
          title: "3. Bauen",
          description: "Exportiere deine Teileliste und Diagramm, um selbstbewusst mit dem Bau zu beginnen."
        }
      },
      tools: {
        title: "Tools & Hilfsmittel",
        subtitle: "Nützliche Werkzeuge für deinen Camperausbau",
        wireCalculator: {
          title: "Kabelquerschnitt Rechner",
          subtitle: "Berechne den optimalen Kabelquerschnitt für deine Installation",
          description: "Wenn du lieber alles selbst ausrechnen willst, nutze den Kabelrechner, um schnell den richtigen Kabelquerschnitt zu finden. Gib Kabellänge, Stromstärke und Spannung ein und erhalte sofort den empfohlenen Kabelquerschnitt inklusive Spannungsabfall und Leistungsverlust. Perfekt für einzelne Verbindungen!",
          action: "Jetzt Berechnen"
        }
      },
      blog: {
        title: "Blog",
        subtitle: "Wissen rund um die 12-V-Elektrik im Camper",
        description: "Hintergrundartikel zu Kabeln, Sicherungen, Batterie, Solar und Ladetechnik — verständlich erklärt und mit dem passenden Rechner verlinkt. Neue Beiträge kommen regelmäßig dazu.",
        action: "Jetzt Lesen"
      },
      footer: {
        disclaimer: "Dieses Tool liefert Schätzwerte. Konsultiere immer einen professionellen Elektriker.",
        openSource: "Open Source Projekt",
        reportBug: "Fehler Melden"
      }
    },
    tooltip: {
      energyBalance: "Energiebilanz",
      exchangeComponent: "Komponente austauschen",
      removeComponent: "Entfernen"
    }
  }
}
