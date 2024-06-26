import TransitDeparture from "../types/transit-departure.mjs"
import TransitDirection from "../types/transit-direction.mjs"
import BusRoute from "./bus-route.mjs"
import BusRun from "./bus-run.mjs"

export default class BusDeparture extends TransitDeparture {

  #api

  /**
   * Constructs a new Metro departure
   * 
   * @param {PTVAPIInterface} apiInterface An instance of a PTV API Interface
   * @param {BusRoute} routeData The Metro line for this departure
   * @param {BusRun} runData The Metro run data for this departure
   * @param {Date} scheduledDepartureTime The scheduled departure time
   * @param {Date} estimatedDepartureTime The estimated departure time, if available. Null otherwise
   */
  constructor(apiInterface, routeData, runData, scheduledDepartureTime, estimatedDepartureTime) {
    super(routeData, runData, scheduledDepartureTime, estimatedDepartureTime)

    this.#api = apiInterface
  }

  /**
   * Constructs a new BusDeparture instance from the PTV API response 
   * 
   * @param {PTVAPIInterface} apiInterface The PTV API Interface to use
   * @param {dictionary} departure The raw departure data from the PTV API
   * @param {dictionary} route The raw route data from the PTV API
   * @param {dictionary} run The raw run data from the PTV API
   * @param {dictionary} direction The raw direction data from the PTV API
   * @returns {BusDeparture} A BusDeparture instance based on the data provided
   */
  static fromPTVData(apiInterface, departure, route, run, direction) {
    let busRoute = BusRoute.fromPTVData(route)
    let directionData = new TransitDirection(direction.direction_id, direction.direction_name)

    let busRun = BusRun.fromPTVData(run, directionData)

    return new BusDeparture(
      apiInterface,
      busRoute,
      busRun,
      departure.scheduled_departure_utc,
      departure.estimated_departure_utc,
      departure.stop_id,
      departure.platform_number
    )
  }
}