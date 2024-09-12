export default class Interval {
    minutes: number = $state(0)
    color: string = $state('black')

    constructor(minutes: number, color: string) {
        this.minutes = minutes;
        this.color = color
    }
}