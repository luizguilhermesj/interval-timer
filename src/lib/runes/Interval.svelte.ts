export default class Interval {
    minutes: number = $state(0)
    seconds: number = $state(0)
    color: string = $state('black')
    elapsedTime: number = $state(0)

    constructor(color: string, minutes: number = 0, seconds: number = 0) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.color = color
    }
}