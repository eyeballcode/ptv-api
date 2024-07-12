import TransitInterface from "../types/transit-interface.mjs"
import { VLineAPIInterface } from "../vline-api-interface.mjs"
import { GetLiveDisruptionsAPI, GetPlannedDisruptionsAPI, VLineDisruptions } from "./get-disruptions.mjs"
import { GetJourneyStopsAPI } from "./get-journey-stops.mjs"
import { GetJourneysAPI } from "./get-journeys.mjs"
import { GetLocationsAPI, VLineLocations } from "./get-locations.mjs"

export default class VLineInterface extends TransitInterface {

  #api

  /**
   * Constructs a new V/Line API interface
   * 
   * @param {VLineAPIInterface} apiInterface An interface to the V/Line API
   */
  constructor(apiInterface) {
    super(apiInterface)
    this.#api = apiInterface
  }

 /**
  * Gets all V/Line locations available from V/Net
  * 
  * @returns {VLineLocations} A list of V/Line locations
  */
 async getAllLocations() {
    let locations = new GetLocationsAPI()
    return await locations.fetch(this.#api)
  }

  /**
   * Gets planned disruption data for a given line
   * 
   * @param {string} line The line code to retrieve disruptions for
   * @param {int} days The number of days worth of disruptions to retrieve
   * @param {boolean} includeProposed If proposed disruptions should be included
   * @returns {VLineDisruptions} A list of planned V/Line disruptions
   */
 async getPlannedDisruptions(line, days, includeProposed) {
    let disruptions = new GetPlannedDisruptionsAPI(line, days, includeProposed)
    return await disruptions.fetch(this.#api)
  }

  /**
   * Gets live disruption data for a given line
   * 
   * @param {string} line The line code to retrieve disruptions for
   * @returns {VLineDisruptions} A list of planned V/Line disruptions
   */
  async getLiveDisruptions(line) {
    let disruptions = new GetLiveDisruptionsAPI(line)
    return await disruptions.fetch(this.#api)
  }

  /**
   * Gets the next (or previous) 5 journeys between an origin and a destination
   * 
   * @param {string} origin The V/Net origin location name
   * @param {string} destination The V/Net destination location name
   * @param {boolean} lookBackwards If departures in the past should be returned
   * @returns 
   */
  async getJourneys(origin, destination, lookBackwards) {
    let journeys = new GetJourneysAPI(origin, destination, lookBackwards)
    return await journeys.fetch(this.#api)
  }

  /**
   * Gets the stopping pattern of a trip.
   * 
   * @param {string} origin The service origin
   * @param {string} destination The service destination
   * @param {string} departureTime The departure time in HH:MM format
   * @param {string} runID The train TDN or coach run ID
   */
  async getJourneyStops(origin, destination, departureTime, runID) {
    let journeyStops = new GetJourneyStopsAPI(origin, destination, departureTime, runID)
    return await journeyStops.fetch(this.#api)
  }
}