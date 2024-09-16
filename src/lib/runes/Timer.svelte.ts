import type Interval from "./Interval.svelte";

export default class Timer {
    color: string = $state('')
    display: string = $state('')
    elapsedSeconds: number = $state(0)
    intervals: Interval[] = $state([])
    totalSeconds: number = $state(0)

    private currentIntervalIndex: number = 0

    constructor() {
        $effect(() => {
            this.updateTime()

            if (this.getCurrentInterval()?.isFinished()) {
                this.currentIntervalIndex++
                const current = this.getCurrentInterval()
                if (!current) return 
                current.start()
                this.color = current.color
            }
        })
    }

    addInterval(interval: Interval) {
        this.reset()
        this.intervals.push(interval)
    }

    removeInterval(interval: Interval) {
        this.pause()
        this.reset()
        this.intervals = this.intervals.filter(el => interval != el)
    }

    startOrPause() {
        if (this.getCurrentInterval().running) return this.pause()
        this.start()
    }

    start() {
        this.updateTime()
        this.getCurrentInterval().start()
        this.color = this.getCurrentInterval().color
    }

    pause() {
        this.getCurrentInterval()?.pause()
    }

    reset() {
        this.currentIntervalIndex = 0
        for (const interval of this.intervals) {
            interval.pause()
            interval.reset()
        }
    }

    getCurrentInterval() {
        return this.intervals[this.currentIntervalIndex]
    }

    private updateTime() {
        this.totalSeconds = this.intervals.reduce((p, c) => p + c.getTotalSeconds(), 0)
        this.elapsedSeconds = this.intervals.reduce((p, c) => p + c.elapsedSeconds, 0)

        let { minutes, seconds } = this.getCurrentInterval().convertSecondsToTime(this.totalSeconds - this.elapsedSeconds)
        this.display = `${this.pad(minutes)}:${this.pad(Math.floor(seconds))}`
    }

    // private setNextInterval() {
    //     this.elapsedSeconds = 0
    //     this.currentInterval = this.intervals[++this.currentIntervalIndex]
    // }

    private pad(el: number): string {
        return el.toString().padStart(2, "0")
    }
}