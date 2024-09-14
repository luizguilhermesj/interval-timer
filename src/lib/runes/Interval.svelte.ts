export default class Interval {
    minutes: number = $state(0)
    seconds: number = $state(0)
    color: string = $state('black')

    elapsedSeconds: number = $state(0)
    display: string = $state('')
    running: boolean = $state(false)
    id: number

    private tickRate: number = 1000
    private interval: number = 0
    private totalSeconds: number = 0

    constructor(color: string, minutes: number = 0, seconds: number = 0) {
        this.color = color
        
        this.id = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(10).toString().replace(".", ""))

        this.normalizeTime(minutes, seconds)

        this.display = `${this.pad(this.minutes)}:${this.pad(Math.round(this.seconds))}`
    }

    getTotalSeconds() {
        if (this.totalSeconds) return this.totalSeconds
        this.totalSeconds = this.minutes * 60 + this.seconds
        return this.totalSeconds
    }

    getTotalMinutes() {
        return this.minutes + this.seconds / 60
    }

    start() {
        this.pause()
        this.running = true
        this.interval = setInterval(this.intervalFn.bind(this), this.tickRate);
    }

    pause() {
        clearInterval(this.interval)
        this.running = false
    }

    reset() {
        this.pause()
        this.elapsedSeconds = 0
    }

    isFinished() {
        return this.elapsedSeconds >= this.getTotalSeconds()
    }

    private normalizeTime(minutes: number, seconds:number) {
        this.minutes = Math.floor(minutes + seconds / 60)
        this.seconds = this.minutes % 60 + (seconds % 60)
    }

    private pad(el: number): string {
        return el.toString().padStart(2, "0")
    }

    private intervalFn() {
        const increment = this.tickRate / 1000
        console.log(this.elapsedSeconds)
        if (this.elapsedSeconds >= this.getTotalSeconds()) {
            this.display = "Overtime!";
            this.pause()
            return;
        }

        this.elapsedSeconds += increment
        const {minutes, seconds} = this.convertSecondsToTime(this.getTotalSeconds() - this.elapsedSeconds)
        this.display = `${this.pad(minutes)}:${this.pad(seconds)}`
        console.log(minutes, seconds)
    }

    private convertSecondsToTime(number: number): { minutes: number, seconds: number } {
        const minutes = Math.floor(number / 60)
        const seconds = number % 60;
        return {minutes, seconds};
    }
}