// Error messages for native JS components in src/map
// These components don't have access to Vue's $t() function

const messages = {
  en: {
    voltageNotSupported: "The {component} requires supply voltage of <b>[{required} V]</b>. Input voltage of <b>[{actual} V]</b> is not supported.",
    voltageRangeNotSupported: "The {component} operates with a supply voltage of <b>[{min}-{max} V]</b>. Input voltage of <b>[{actual} V]</b> is not supported.",
    currentTooHigh: "The current <b>[{actual} A]</b> of the input sources are bigger than the maximum power which the {component} can handle <b>[{max} A]</b>",
    batteryTypeNotSupported: "The charger do not support the used battery type <b>{actual}</b>. Supported battery types are <b>[{supported}]</b>",
    inputVoltageOutOfRange: "The charger requires input voltage of <b>[{min}..{max} V]</b> and do not support input of <b>[{actual} V]</b> from alternator.",
    panelsSameKindSerial: "It is only allowd to add panels in 'serial' mode of the same kind",
    panelsSameKindParallel: "It is only allowd to add panels in 'parallel' mode of the same kind",
    panelsDifferentVoltages: "Direct child panels delivers different voltages",
    maxOnePanelChild: "Maximnal one child panel is allowed.",
    voltageTooBig: "The voltage <b>[{actual} V]</b> of the input sources are bigger than the maximum voltage which the charger can handle <b>[{max} V]</b>",
    socketOccupiedTooLong: "The {component} is occupied more than 24 hours a day. Install an additional socket.",
    socketsOccupiedTooLong: "The {component} are occupied more than 24 hours a day. Install an additional socket.",
    mixedVoltagesNotAllowed: "It is not allowed to mix different voltages on the {component}",
    mixedVoltagesOnFuse: "It is not allowed to mix different voltages <b>[{voltage1}V, {voltage2}V]</b> on the consumer side of the fuse.",
    fuseVoltageNotSupported: "The fuse operates with a supply voltage of <b>[{required} V]</b>. Input voltage of <b>[{actual} V]</b> is not supported.",
    chargerVoltageNotSupported: "The charger with <b>[{chargerVoltage} V]</b> do not support the used battery voltage of <b>[{batteryVoltage} V]</b>.",
    currentBiggerThanCharger: "<b>[{actual} A]</b> is bigger than the charger can handle <b>[{max} A]</b>",
    chargeCurrentTooHigh: "Charge current <b>[{actual} A]</b> is bigger than the maximal possible charge current <b>[{max} A]</b> of this charger",
    consumerCurrentTooHigh: "Consumer draws more current ({actual} A) than the maximal allowed ({max} A)",
    fuseBoxMixedVoltagesWarning: "Wiring differnet voltages [{voltage1}, {voltage2}] in the fuse box can be run in problems with the common ground within the box.",
    switchBreaksBeforeFuse: "Switch with a maximum currents of <b>[{switchCurrent} A]</b> is breaking before the used fuse with <b>[{fuseCurrent} A]</b> can protect the circuit. Choose a fuse with a lower amperage value.",
    consumerCurrentWarning: "All theoretically possible currents <b>[{actual} A]</b> of all consumers are bigger than the maximum power which the battery protection can handle <b>[{max} A]</b>. Ensure that you have a correct fuse in place to avoid a burnout of this device.",
    batteryProtectBreaksBeforeFuse: "Battery Protection with a maximum currents of <b>[{protectCurrent} A]</b> is breaking before the used fuse with <b>[{fuseCurrent} A]</b> can protect the circuit. Choose a fuse with a lower amperage value.",
    batteryProtectCurrentWarning: "All theoretically possible currents <b>[{actual} A]</b> of all consumers are bigger than the maximum power which the battery protection can handle <b>[{max} A]</b>. Ensure that the used fuse amp is lower than <b>[{max} A]</b>",
    dcdcConverterBreaksBeforeFuse: "DC-DC converter with a maximum currents of <b>[{converterCurrent} A]</b> can break before the used fuse with <b>[{fuseCurrent} A]</b> can protect the circuit. Choose a fuse with a lower amperage value to avoid a damage by accident of this component.",
    childVoltageNotSupported: "Child delivers power of <b>[{actual} V]</b> but switch can handle only up to <b>[{max} V]</b>",
    batteryTypeRequiresProtection: "Battery type <b>{batteryType}</b> requires a battery protection between all consumers to avoid deep discharge and damage of the battery.",
    batteryDirectConnectionNotAllowed: "Battery of type <b>'{batteryType}'</b> do not allow a direct connection to a device of type <b>'{deviceType}'</b>",
    solarControllerVoltageNotSupported: "The solar controller with <b>[{controllerVoltage} V]</b> do not support the used battery with <b>[{batteryVoltage} V]</b>."
  },
  de: {
    voltageNotSupported: "Die {component} benötigt eine Versorgungsspannung von <b>[{required} V]</b>. Eingangsspannung von <b>[{actual} V]</b> wird nicht unterstützt.",
    voltageRangeNotSupported: "Die {component} arbeitet mit einer Versorgungsspannung von <b>[{min}-{max} V]</b>. Eingangsspannung von <b>[{actual} V]</b> wird nicht unterstützt.",
    currentTooHigh: "Der Strom <b>[{actual} A]</b> der Eingangsquellen ist größer als die maximale Leistung, die die {component} verarbeiten kann <b>[{max} A]</b>",
    batteryTypeNotSupported: "Das Ladegerät unterstützt den verwendeten Batterietyp <b>{actual}</b> nicht. Unterstützte Batterietypen sind <b>[{supported}]</b>",
    inputVoltageOutOfRange: "Das Ladegerät benötigt eine Eingangsspannung von <b>[{min}..{max} V]</b> und unterstützt keine Eingangsspannung von <b>[{actual} V]</b> von der Lichtmaschine.",
    panelsSameKindSerial: "Es dürfen nur Panels der gleichen Art im 'Reihen'-Modus hinzugefügt werden",
    panelsSameKindParallel: "Es dürfen nur Panels der gleichen Art im 'Parallel'-Modus hinzugefügt werden",
    panelsDifferentVoltages: "Direkt untergeordnete Panels liefern unterschiedliche Spannungen",
    maxOnePanelChild: "Maximal ein untergeordnetes Panel ist erlaubt.",
    voltageTooBig: "Die Spannung <b>[{actual} V]</b> der Eingangsquellen ist größer als die maximale Spannung, die das Ladegerät verarbeiten kann <b>[{max} V]</b>",
    socketOccupiedTooLong: "Die {component} ist mehr als 24 Stunden am Tag belegt. Installiere eine zusätzliche Steckdose.",
    socketsOccupiedTooLong: "Die {component} sind mehr als 24 Stunden am Tag belegt. Installiere eine zusätzliche Steckdose.",
    mixedVoltagesNotAllowed: "Es ist nicht erlaubt, verschiedene Spannungen an der {component} zu mischen",
    mixedVoltagesOnFuse: "Es ist nicht erlaubt, verschiedene Spannungen <b>[{voltage1}V, {voltage2}V]</b> auf der Verbraucherseite der Sicherung zu mischen.",
    fuseVoltageNotSupported: "Die Sicherung arbeitet mit einer Versorgungsspannung von <b>[{required} V]</b>. Eingangsspannung von <b>[{actual} V]</b> wird nicht unterstützt.",
    chargerVoltageNotSupported: "Das Ladegerät mit <b>[{chargerVoltage} V]</b> unterstützt die verwendete Batteriespannung von <b>[{batteryVoltage} V]</b> nicht.",
    currentBiggerThanCharger: "<b>[{actual} A]</b> ist größer als das Ladegerät verarbeiten kann <b>[{max} A]</b>",
    chargeCurrentTooHigh: "Ladestrom <b>[{actual} A]</b> ist größer als der maximal mögliche Ladestrom <b>[{max} A]</b> dieses Ladegeräts",
    consumerCurrentTooHigh: "Verbraucher zieht mehr Strom ({actual} A) als maximal erlaubt ({max} A)",
    fuseBoxMixedVoltagesWarning: "Die Verkabelung unterschiedlicher Spannungen [{voltage1}, {voltage2}] im Sicherungskasten kann zu Problemen mit der gemeinsamen Masse im Kasten führen.",
    switchBreaksBeforeFuse: "Schalter mit einem maximalen Strom von <b>[{switchCurrent} A]</b> bricht, bevor die verwendete Sicherung mit <b>[{fuseCurrent} A]</b> den Stromkreis schützen kann. Wähle eine Sicherung mit einem niedrigeren Amperewert.",
    consumerCurrentWarning: "Alle theoretisch möglichen Ströme <b>[{actual} A]</b> aller Verbraucher sind größer als die maximale Leistung, die der Batterieschutz verarbeiten kann <b>[{max} A]</b>. Stelle sicher, dass du eine korrekte Sicherung hast, um einen Ausfall dieses Geräts zu vermeiden.",
    batteryProtectBreaksBeforeFuse: "Batterieschutz mit einem maximalen Strom von <b>[{protectCurrent} A]</b> bricht, bevor die verwendete Sicherung mit <b>[{fuseCurrent} A]</b> den Stromkreis schützen kann. Wähle eine Sicherung mit einem niedrigeren Amperewert.",
    batteryProtectCurrentWarning: "Alle theoretisch möglichen Ströme <b>[{actual} A]</b> aller Verbraucher sind größer als die maximale Leistung, die der Batterieschutz verarbeiten kann <b>[{max} A]</b>. Stelle sicher, dass die verwendete Sicherung niedriger als <b>[{max} A]</b> ist",
    dcdcConverterBreaksBeforeFuse: "DC-DC-Wandler mit einem maximalen Strom von <b>[{converterCurrent} A]</b> kann brechen, bevor die verwendete Sicherung mit <b>[{fuseCurrent} A]</b> den Stromkreis schützen kann. Wähle eine Sicherung mit einem niedrigeren Amperewert, um eine versehentliche Beschädigung dieser Komponente zu vermeiden.",
    childVoltageNotSupported: "Kind liefert Leistung von <b>[{actual} V]</b>, aber Schalter kann nur bis zu <b>[{max} V]</b> verarbeiten",
    batteryTypeRequiresProtection: "Batterietyp <b>{batteryType}</b> erfordert einen Batterieschutz zwischen allen Verbrauchern, um Tiefentladung und Beschädigung der Batterie zu vermeiden.",
    batteryDirectConnectionNotAllowed: "Batterie vom Typ <b>'{batteryType}'</b> erlaubt keine direkte Verbindung zu einem Gerät vom Typ <b>'{deviceType}'</b>",
    solarControllerVoltageNotSupported: "Der Solarregler mit <b>[{controllerVoltage} V]</b> unterstützt die verwendete Batterie mit <b>[{batteryVoltage} V]</b> nicht."
  }
}

class ErrorMessages {
  constructor() {
    this.locale = this.getLocale()
  }

  getLocale() {
    // Get language from localStorage (set by Vue app)
    const saved = localStorage.getItem('userLanguage')
    if (saved) return saved
    
    // Fallback to browser language
    const userLang = navigator.language || navigator.userLanguage
    return userLang.startsWith('de') ? 'de' : 'en'
  }

  /**
   * Get translated error message with parameter substitution
   * @param {string} key - Message key
   * @param {object} params - Parameters to substitute in the message
   * @returns {string} Translated and formatted message
   */
  t(key, params = {}) {
    // Always get fresh locale from localStorage to support dynamic language switching
    this.locale = this.getLocale()
    
    const message = messages[this.locale]?.[key] || messages.en[key] || key
    
    // Replace all {param} placeholders with actual values
    return message.replace(/\{(\w+)\}/g, (match, param) => {
      return params[param] !== undefined ? params[param] : match
    })
  }

  /**
   * Update locale (called when user changes language)
   * @param {string} newLocale - New locale ('de' or 'en')
   */
  setLocale(newLocale) {
    this.locale = newLocale
  }
}

// Export singleton instance
export default new ErrorMessages()
