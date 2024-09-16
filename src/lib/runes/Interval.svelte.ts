export default class Interval {
    minutes: number = $state(0)
    seconds: number = $state(0)
    color: string = $state('black')

    elapsedSeconds: number = $state(0)
    totalSeconds: number = $state(0)
    display: string = $state('')
    running: boolean = $state(false)
    id: number
    tickRate: number = 100

    private timeStarted = 0;
    private interval: number = 0

    constructor(color: string, minutes: number = 0, seconds: number = 0) {
        this.color = color
        
        this.id = parseInt(Math.ceil(Math.random() * Date.now()).toPrecision(10).toString().replace(".", ""))

        this.normalizeTime(minutes, seconds)
        this.totalSeconds = this.minutes * 60 + this.seconds

        this.updateDisplay(this.minutes, this.seconds)
    }

    start() {
        this.timeStarted = Date.now()
        this.pause()
        this.running = true
        this.interval = setInterval(this.updateTime.bind(this), this.tickRate);
    }

    pause() {
        clearInterval(this.interval)
        this.running = false
    }

    reset() {
        this.pause()
        this.elapsedSeconds = 0
        this.updateDisplay(this.minutes, this.seconds)
    }

    isFinished() {
        return this.elapsedSeconds >= this.totalSeconds
    }

    private updateDisplay(minutes:number, seconds:number) {
        this.display = `${this.pad(minutes)}:${this.pad(Math.round(seconds))}`
    }

    private normalizeTime(minutes: number, seconds:number) {
        this.minutes = Math.floor(minutes + seconds / 60)
        this.seconds = minutes * 60 % 60 + (seconds % 60)
    }

    private pad(el: number): string {
        return el.toString().padStart(2, "0")
    }

    private updateTime() {
        if (this.elapsedSeconds >= this.totalSeconds) {
            this.display = "Finished!";
            this.pause()
            return;
        }

        this.elapsedSeconds = Math.min((Date.now() - this.timeStarted) / 1000, this.totalSeconds)
        const {minutes, seconds} = this.convertSecondsToTime(this.totalSeconds - this.elapsedSeconds)
        this.updateDisplay(minutes, seconds)
    }

    convertSecondsToTime(number: number): { minutes: number, seconds: number } {
        if (number < 0) return { minutes: 0, seconds: 0 }
        const minutes = Math.floor(number / 60)
        const seconds = number % 60;
        return {minutes, seconds};
    }
}