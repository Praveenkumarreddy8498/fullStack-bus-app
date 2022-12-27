export class Bus {
  constructor(
    public busId: number,
    public busServiceNum: number,
    public busPlateNum: string,
    public busType: string,
    public busServiceType: string,
    public busCapacity: number,
    public startingPoint: string,
    public destination: string,
    public busStops:number,
    public busDuration: string,
    public scheduleDepartureDateTime: Date,
    public scheduleArrivalDateTime: Date,
    public estimatedArrivalDateTime: Date,
    public fareAmount: number,
    public fareTax: number,
    public totalFare: number,
    public flexiTicket: boolean,
    public movieEnabled: boolean,
    public rating: number,
    public runningStatus: boolean
  ) {}
}
