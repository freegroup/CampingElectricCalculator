import Node from './Node'

export default class SolarBooster extends Node {
  constructor() {
    super()
  }

  getErrors () {
    console.log("BOOOOOOOOOSTER", this.children)
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
      const firstVoltage = this.children[0].calculateCircuitData().nennspannung
      if ( this.children.find( child => child.calculateCircuitData().nennspannung !== firstVoltage) ) {
        result.push("Direct child panels delivers different voltages")
      }
    }
    
    // Calculate if the accumulated voltage and current are out of specification of the charger/booster
    // Berechnung der Parallelschaltung
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateCircuitData()
      // skip the first element, because we have already the data of the first element in charge
      // ( slice(1) )
      this.children.slice(1).forEach( child => {
        data.nennstrom += child.calculateCircuitData().nennstrom 
      })

      // calculate [P] of all pinput sources and check if the booster can handle this
      //
      const eingangswatt = data.nennstrom * data.nennspannung
      if ( eingangswatt > this.calculateCircuitData().eingangswatt ) {
        result.push(`[P= ${eingangswatt} Watt] of all input sources are bigger than the charger can handle (${this.calculateCircuitData().eingangswatt} )`)
      }

      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.leerlaufspannung > this.calculateCircuitData().eingangsspannung ) {
        result.push(`The voltage [U= ${data.leerlaufspannung} Volt] of the input sources are bigger than the maximum voltage which the charger can handle (${this.calculateCircuitData().eingangsspannung} )`)
      }
    }

    return result
  }

  calculateCircuitData () {
    // It is only allowed, that this element has ONE direct child element
    //
    const result = JSON.parse(JSON.stringify(this.model.data)) // deep copy

    return result
  }
}
