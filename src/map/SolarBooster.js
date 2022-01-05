import Node from './Node'

export default class SolarBooster extends Node {
  constructor() {
    super()
  }

  getChildCandidates () {
    return ["solarPanel"] 
  }

  getErrors () {
    const result = []

    // if more than one child exists, each of them must have the same data.uuid. It is not allowed to 
    // use different kind of SolarPanels if they are configured in "parallel"
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the type
      //
      const firstUUID = this.children[0].model.uuid
      if ( this.children.find( child => child.model.uuid !== firstUUID) ) {
        result.push("It is only allowd to add panels in 'parallel' mode of the same kind")
      }

      // all direct children must deliver the same voltage. Voltage can be differe if on panel has an child panel (serial)
      //
      const firstVoltage = this.children[0].calculateCircuitData().spannung
      if ( this.children.find( child => child.calculateCircuitData().spannung !== firstVoltage) ) {
        result.push("Direct child panels delivers different voltages")
      }
    }
    
    // Calculate if the accumulated voltage and current are out of specification of the charger/booster
    // Berechnung der Parallelschaltung
    // https://www.tigerexped.de/solarladeregler-berechnen
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateCircuitData()
      this.children.slice(1).forEach( child => {
        data.strom += child.calculateCircuitData().strom 
        data.watt += child.calculateCircuitData().watt 
      })

      // calculate [P] of all pinout sources and check if the booster can handle this
      //
      if ( data.strom > this.model.data.nennladestrom ) {
        result.push(`[I = ${data.strom} Ampere] is bigger than the charger can handle [I = ${this.model.data.nennladestrom} Amper]`)
      }

      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.leerlaufspannung > this.model.data.eingangsspannung ) {
        result.push(`The voltage [U = ${data.leerlaufspannung} Volt] of the input sources are bigger than the maximum voltage which the charger can handle [U = ${this.calculateCircuitData().eingangsspannung} Volt]`)
      }
    }

    return result
  }

  calculateCircuitData () {
    // Berechnung der Parallelschaltung aller "parallel" angehängten Panels. 
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateCircuitData()
      this.children.slice(1).forEach( child => {
        data.nennstrom += child.calculateCircuitData().nennstrom 
        data.watt += child.calculateCircuitData().watt 
      })

      switch ( this.model.data.typ ) {
        case "MPPT":
          // Im Inneren des MPPT-Laderegler passiert folgendes: Am Solar-Eingang 
          // kommen z.B. P=100W Solarpower an, nämlich 18,5V x 5,14A. 
          // Die 18,5V sind aber viel zu viel für deinen Akku. Der benötigt zum Laden 
          // lediglich 14,8V (wenn es ein AGM Akku ist). Also macht der DC-DC Wandler 
          // im Inneren des MPPT-Reglers aus den 18,5 Volt einfach 14,8 Volt, bei 
          // gleicher Leistung (P=100W). Dabei ändert sich der Ladestrom – er steigt an! 
          // Die Formel dazu liefert den Beweis: I=100W/14.4V . Das ergibt einen neuen 
          // Ladestrom von 6,75A.
          return { data: { spannung: 14.8, strom: data.watt / 14.8, watt: data.watt } }
        case "PWM":
          // Der Kollege PWM mag es unkompliziert, und passt deswegen die Modulspannung 
          // an deine Ladespannung des Akkus an – in dem Fall 14,8V (AGM Akku).
          // Wenn du nun nochmal einen Blick auf die Spannung “Vm” des Moduls wirfst, wirst 
          // du feststellen, dass diese bei 18,5V liegt. Der Regler “verschenkt” sozusagen 
          // 3,7V, weil dein Akku ja lediglich 14,8 benötigt, während der Strom (Im) gleich 
          // bleibt
          return { data: { spannung: 14.8, strom: data.nennstrom, watt: data.nennstrom * 14.8 } }
        default:
          return { data: { spannung: 14.8, strom: 0, watt: 0 } }
      }
    }

    return { data: { spannung: 14.8, strom: 0, watt: 0 } }
  }
}
