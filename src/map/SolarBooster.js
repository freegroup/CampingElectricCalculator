import LeftNode from './LeftNode'
import $ from "jquery"
import { htmlToElement } from "./utils.js"
const images = require.context("@/assets/", true, /\.png$/)

export default class SolarBooster extends LeftNode {
  constructor() {
    super()
    this.timerBased = true
  }

  getChildCandidates () {
    return ["solarPanel"] 
  }

  getErrorMessages () {
    const result = []

    if ( this.mindmap ) {
      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( !this.model.data.chargeSupport.includes(this.mindmap.model.data.type) ) {
        result.push({ type: "Error", text: `The charger do not support the used accu type <b>${this.mindmap.model.data.type}</b>. Supported accu types are <b>${this.model.data.chargeSupport.join(", ")}</b>` })
      }
    }

    // if more than one child exists, each of them must have the same data.uuid. It is not allowed to 
    // use different kind of SolarPanels if they are configured in "parallel"
    //
    if ( this.children.length > 1 ) {
      // all direct children must have the type
      //
      const firstUUID = this.children[0].model.uuid
      if ( this.children.find( child => child.model.uuid !== firstUUID) ) {
        result.push({ type: "Error", text: "It is only allowd to add panels in 'parallel' mode of the same kind" })
      }

      // all direct children must deliver the same voltage. Voltage can be differe if on panel has an child panel (serial)
      //
      const firstVoltage = this.children[0].calculateOutputData().nennspannung
      if ( this.children.find( child => child.calculateOutputData().nennspannung !== firstVoltage) ) {
        result.push({ type: "Error", text: "Direct child panels delivers different voltages" })
      }
    }
    
    // Calculate if the accumulated voltage and current are out of specification of the charger/booster
    // Berechnung der Parallelschaltung
    // https://www.tigerexped.de/solarladeregler-berechnen
    if ( this.children.length > 0 ) {
      const data = this.calculateInputData()

      // calculate [P] of all pinout sources and check if the booster can handle this
      //
      if ( data.nennstrom > this.model.data.kurzschlussstrom ) {
        result.push({ type: "Error", text: `<b>[${data.nennstrom}A]</b> is bigger than the charger can handle <b>[${this.model.data.kurzschlussstrom}A]</b>` })
      }

      // the "leerlaufspannung" must be smaller than the max input of the charger
      //
      if ( data.leerlaufspannung > this.model.data.eingangsspannung ) {
        result.push({ type: "Error", text: `The voltage <b>[${data.leerlaufspannung}V]</b> of the input sources are bigger than the maximum voltage which the charger can handle <b>[${this.model.data.eingangsspannung}V]</b>` })
      }

      const output = this.calculateOutputData()
      if ( output.ladestrom > this.model.data.nennladestrom ) {
        result.push( { type: "Error", text: `Charge current <b>[${parseInt(output.ladestrom)}A]</b> is bigger than the maximal possible charge current <b>[${this.model.data.nennladestrom}A]</b> of this charger` } )
      }
    }

    return result
  }

  calculateInputData () {
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateOutputData()
      this.children.slice(1).forEach( child => {
        data.nennstrom += child.calculateOutputData().nennstrom 
        data.kurzschlussstrom += child.calculateOutputData().kurzschlussstrom 
        data.watt += child.calculateOutputData().watt 
      })
      return data
    }

    return { nennstrom: 0, watt: 0, nennspannung: 0 }
  }

  calculateOutputData () {
    const result = { spannung: 12, strom: 0, watt: 0, ladespannung: this.mindmap ? this.mindmap.getMaxChargeVoltage() : 12 } 
    // Berechnung der Parallelschaltung aller "parallel" angehängten Panels. 
    if ( this.children.length > 0 ) {
      const data = this.children[0].calculateOutputData()
      this.children.slice(1).forEach( child => {
        data.nennstrom += child.calculateOutputData().nennstrom 
        data.watt += child.calculateOutputData().watt 
      })

      switch ( this.model.data.type ) {
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
    }

    result.ladestrom = result.watt / result.ladespannung
    result.amperestunden = result.strom * this.model.operationHours
    return result
  }

  drawLines(recursive) {
    super.drawLines(recursive)

    // check if we have a seriel configuration (a child has at least one child)
    //
    this.children.forEach( child => {
      $(child.html).find('.serialIcon').remove()
      if ( child.children.length > 0 ) {
        $(child.html).append(htmlToElement(`<img src='${images("./serial.png")}' class='serialIcon'></img>`))
        $(child.html).addClass("serialPanels")
      } else {
        $(child.html).removeClass("serialPanels")
      }
    })

    $(this.childrenContainer).find('.parallelIcon').remove()
    if ( this.children.length > 1 ) {
      $(this.childrenContainer).append(htmlToElement(`<img src='${images("./parallel.png")}' class='parallelIcon'></img>`))
      $(this.childrenTable).addClass("parallelPanels")
    } else {
      $(this.childrenTable).removeClass("parallelPanels")
    }
  }
}
