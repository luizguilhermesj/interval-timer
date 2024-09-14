import type Interval from "./Interval.svelte";

export default class Timer {
    color: string = $state('')
    display: string = $state('')
    elapsedSeconds: number = $state(0)
    intervals: Interval[] = $state([])

    private currentIntervalIndex: number = 0
    private totalSeconds: number = $state(0)

    constructor() {
        $effect(() => {
            this.totalSeconds = this.intervals.reduce((p, c) => p + c.getTotalSeconds(), 0)
            this.elapsedSeconds = this.intervals.reduce((p, c) => p + c.elapsedSeconds, 0)
            let { minutes, seconds } = this.convertSecondsToTime(this.totalSeconds - this.elapsedSeconds)
            this.display = `${this.pad(minutes)}:${this.pad(Math.floor(seconds))}`

            if (this.getCurrentInterval().isFinished()) {
                this.currentIntervalIndex++
                const current = this.getCurrentInterval()
                if (!current) return
                current.start()
                this.color = current.color
            }
        })
    }

    addInterval(interval : Interval) {
        this.intervals.push(interval)
    }

    startOrPause() {
        if (this.getCurrentInterval().running) return this.pause()
        this.start()
    }

    start() {
        this.getCurrentInterval().start()
        this.color = this.getCurrentInterval().color
    }

    pause() {
        this.getCurrentInterval().pause()
    }

    reset() {
        this.currentIntervalIndex = 0
        this.intervals.map(el => el.reset())
        if (this.getCurrentInterval().running) return this.start()
    }

    getCurrentInterval() {
        return this.intervals[this.currentIntervalIndex]
    }

    // private setNextInterval() {
    //     this.elapsedSeconds = 0
    //     this.currentInterval = this.intervals[++this.currentIntervalIndex]
    // }

    // private intervalFn() {
    //     if (!this.currentInterval) return this.pause()
    //     const increment = this.tickRate / 1000
    //     if (this.seconds <= 0) {
    //         if (this.minutes <= 0 && this.interval) {
    //             this.display = "Overtime!";
    //             clearInterval(this.interval);
    //             return;
    //         }
    //         this.seconds = 60;
    //         this.minutes -= increment;
    //     }

    //     this.seconds -= increment;
    //     this.elapsedSeconds += increment
    //     if (this.currentInterval) this.currentInterval.elapsedTime += increment

    //     this.display = `${this.pad(this.minutes)}:${this.pad(Math.ceil(this.seconds))}`
    //     if (this.currentInterval) {
    //         let totalSecs = this.currentInterval.getTotalSeconds() - this.currentInterval.elapsedTime
    //         this.displayInterval = `${this.pad(Math.floor(totalSecs / 60))}:${this.pad(Math.floor(totalSecs % 60))}`
    //     }
    //     if (this.elapsedSeconds >= this.currentInterval.getTotalSeconds()) {
    //         this.setNextInterval()
    //     }
    // }


    private pad(el: number): string {
        return el.toString().padStart(2, "0")
    }

    private convertSecondsToTime(number: number): { minutes: number, seconds: number } {
        const minutes = Math.floor(number / 60)
        const seconds = number % 60;
        return { minutes, seconds };
    }
}