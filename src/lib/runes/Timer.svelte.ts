import type Interval from "./Interval.svelte";

export default class Timer {
    minutes: number = $state(0)
    seconds: number = $state(0)
    display: string = $state('')
    elapsedSeconds: number = $state(0)
    intervals: Interval[] = $state([])
    currentInterval: Interval | null = $state(null)

    private interval: number = $state(0);
    private currentIntervalIndex = 0

    constructor(intervals: Interval[]) {
        this.currentInterval = intervals[this.currentIntervalIndex]
        this.intervals = intervals;
        let sum = this.convertNumToTime(intervals.reduce((p, c) => p + c.minutes, 0))
        this.minutes = Math.floor(sum / 60)
        this.seconds = Math.floor(sum % 60)
        this.display = `${this.pad(this.minutes)}:${this.pad(this.seconds)}`
    }
    start() {
        this.stop()
        this.interval = setInterval(this.intervalFn.bind(this), 1000);
    }

    stop() {
        if (!this.interval) return
        clearInterval(this.interval)
        this.interval = 0
        this.elapsedSeconds = 0
    }

    intervalFn() {
        if (this.seconds <= 0) {
            if (this.minutes <= 0 && this.interval) {
                this.display = "Overtime!";
                clearInterval(this.interval);
                return;
            }
            this.seconds = 60;
            this.minutes--;
        }
        this.seconds--;
        this.elapsedSeconds++

        this.display = `${this.pad(this.minutes)}:${this.pad(this.seconds)}`
        if (this.currentInterval && this.elapsedSeconds >= this.currentInterval.minutes * 60) {
            this.stop()
            this.currentInterval = this.intervals[++this.currentIntervalIndex]
            this.start()
        }
    }


    private pad(el: number): string {
        return el.toString().padStart(2, "0")
    }

    private convertNumToTime(number: number): number {
        var hour = Math.floor(number);
        var decpart = number - hour;
        var min = 1 / 60;
        decpart = min * Math.round(decpart / min);
        var minute = Math.floor(decpart * 60);
        return hour * 60 +  minute;
    }
}