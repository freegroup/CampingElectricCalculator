import LeftNode from './LeftNode'

export default class SolarSet extends LeftNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return [] 
  }

  getErrorMessages () {
    const result = []

    if ( this.mindmap ) {
      if ( !this.model.data.controller.chargeSupport.includes(this.mindmap.model.data.type) ) {
        result.push({ type: "Error", text: `The charger do not support the used accu type (${this.mindmap.model.data.type}). Supported accu types are [${this.model.data.controller.chargeSupport}]` })
      }
    }
    
    return result
  }
  
  calculateInputData () {
    return null
  }

  calculateOutputData () {
    const result = { spannung: 12, strom: 0, watt: 0, ladespannung: this.mindmap ? this.mindmap.getMaxChargeVoltage() : 12 } 
    const data = JSON.parse(JSON.stringify(this.model.data.panel)) // deep copy

    switch ( this.model.data.controller.type ) {
      case "MPPT":
        // Im Inneren des MPPT-Laderegler passiert folgendes: Am Solar-Eingang 
        // kommen z.B. P=100W Solarpower an, nämlich 18,5V x 5,14A. 
        // Die 18,5V sind aber viel zu viel für deinen Akku. Der benötigt zum Laden 
        // lediglich 14,8V (wenn es ein AGM Akku ist). Also macht der DC-DC Wandler 
        // im Inneren des MPPT-Reglers aus den 18,5 Volt einfach 14,8 Volt, bei 
        // gleicher Leistung (P=100W). Dabei ändert sich der Ladestrom – er steigt an! 
        // Die Formel dazu liefert den Beweis: I=100W/14.4V . Das ergibt einen neuen 
        // Ladestrom von 6,75A.
        result.strom = data.watt / result.ladespannung
        result.watt = data.watt
        break
      case "PWM":
        // Der Kollege PWM mag es unkompliziert, und passt deswegen die Modulspannung 
        // an deine Ladespannung des Akkus an – in dem Fall 14,8V (AGM Akku).
        // Wenn du nun nochmal einen Blick auf die Spannung “Vm” des Moduls wirfst, wirst 
        // du feststellen, dass diese bei 18,5V liegt. Der Regler “verschenkt” sozusagen 
        // 3,7V, weil dein Akku ja lediglich 14,8 benötigt, während der Strom (Im) gleich 
        // bleibt
        result.strom = data.nennstrom
        result.watt = data.nennstrom * result.ladespannung
        break
    }

    result.ladestrom = result.watt / result.ladespannung
    result.amperestunden = result.strom * this.model.operationHours
    return result
  }
}
