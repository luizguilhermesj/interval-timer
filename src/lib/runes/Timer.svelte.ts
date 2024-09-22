import Interval from "./Interval.svelte";
import { browser } from "$app/environment"

class IntervalStoreItem {
    constructor(
        public label: string,
        public color: string,
        public minutes: number,
        public seconds: number,
        public id: number,
    ) { }
}

export default class Timer {
    color: string = $state('')
    display: string = $state('')
    elapsedSeconds: number = $state(0)
    intervals: Interval[] = $state([])
    totalSeconds: number = $state(0)

    private currentIntervalIndex: number = 0
    private callbacks: Function[] = []
    private store: IntervalStoreItem[] = []

    constructor(defaultIntervals: Interval[] = []) {
        if (browser) {
            this.store = JSON.parse(localStorage.getItem('intervals') || '[]')
            if (this.store.length) {
                for (let value of this.store) {
                    this.addInterval(new Interval(value.label || 'Interval', value.color, value.minutes, value.seconds, value.id))
                }
            } else {
                defaultIntervals.map(this.addInterval.bind(this))
                this.syncLocalStorage()
            }
        }

        $effect(() => {
            this.intervals;
            this.syncLocalStorage()
        })

        $effect(() => {
            if (!this.intervals.every(this.isInterval)) return
            this.updateTime()

            if (this.getCurrentInterval()?.isFinished()) {
                this.triggerIntervalFinished(this.getCurrentInterval())
                this.currentIntervalIndex++
                const current = this.getCurrentInterval()
                if (!current) return 
                current.start()
                this.color = current.color
            }
        })
    }

    isInterval(interval: Interval): interval is Interval {
        return (interval as Interval).isFinished !== undefined;
    }

    intervalFinished(callback: Function) {
        this.callbacks.push(callback)
    }

    triggerIntervalFinished(interval: Interval) {
        this.callbacks.map(callback => callback(interval));
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


    private syncLocalStorage() {
        if (!browser) return

        this.store = []
        for (let interval of this.intervals) {
            this.store.push(new IntervalStoreItem(interval.label, interval.color, interval.minutes, interval.seconds, interval.id))
        }

        localStorage.setItem('intervals', JSON.stringify(this.store))
    }

    private updateTime() {
        this.totalSeconds = this.intervals.reduce((p, c) => p + c.totalSeconds, 0)
        this.elapsedSeconds = this.intervals.reduce((p, c) => p + c.elapsedSeconds, 0)

        if (!this.getCurrentInterval()) return
        let { minutes, seconds } = this.getCurrentInterval().convertSecondsToTime(this.totalSeconds - this.elapsedSeconds)
        this.display = `${this.pad(minutes)}:${this.pad(Math.floor(seconds))}`
    }

    private pad(el: number): string {
        return el.toString().padStart(2, "0")
    }
}