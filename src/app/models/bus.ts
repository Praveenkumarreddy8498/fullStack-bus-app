export class Bus {
  constructor(
    public busId: number|null,
    public busServiceNum: number|null,
    public busPlateNum: string,
    public busType: string,
    public busServiceType: string,
    public busCapacity: number|null,
    public startingPoint: string,
    public destination: string,
    public busStops:number|null,
    public busDuration: string,
    public scheduleDepartureDateTime: string,
    public scheduleArrivalDateTime: string,
    public estimatedArrivalDateTime: string,
    public fareAmount: number|null,
    public fareTax: number|null,
    public totalFare: number|null,
    public flexiTicket: boolean|null,
    public movieEnabled: boolean|null,
    public rating: number|null,
    public runningStatus: boolean|null
  ) {}
}
