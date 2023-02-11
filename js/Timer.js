export default class Timer {
    constructor(root) {
        root.innerHTML = Timer.getHTML();

        this.elements = {
            minutes: root.querySelector(".timer__part--minutes"),
            seconds: root.querySelector(".timer__part--seconds"),
            control: root.querySelector(".timer__part--control"),
            reset: root.querySelector(".timer__btn--reset"),
            set: root.querySelector(".timer__btn--set-time")
        }

        this.interval = null;
        this.running = false;
        this.originalSeconds = 0;
        this.remainingSeconds = this.originalSeconds

        this.updateInterfaceTime();


        this.elements.control.addEventListener("click", () => {
            if (this.interval === null){
                this.start()
            } else {
                this.stop()
            }
        });
        this.elements.reset.addEventListener("click", () => {
            if (this.interval !== null){
                this.stop()
            }
            this.reset()
        });
        this.elements.set.addEventListener("click", () => {
            // TODO
            this.select()
        });
    }

    updateInterfaceTime() {
        const minutes = Math.floor(this.remainingSeconds / 60);
        const seconds = this.remainingSeconds % 60;
    
        this.elements.minutes.textContent = minutes.toString().padStart(2,"0")
        this.elements.seconds.textContent = seconds.toString().padStart(2,"0")
    }

    updateInterfaceControls() {
        if (this.interval === null) {
            this.elements.control.innerHTML = `<span class="material-icons">play_arrow</span>`;
            this.elements.control.classList.add("timer__btn--start");
            this.elements.control.classList.remove("timer__btn--stop");
            
        } else {
            this.elements.control.innerHTML = `<span class="material-icons">pause</span>`;
            this.elements.control.classList.add("timer__btn--stop")
            this.elements.control.classList.remove("timer__btn--start")
        }
    }

    start() {
        if (this.remainingSeconds === 0) return;
        this.interval = setInterval( () => {
            this.remainingSeconds--;
            this.updateInterfaceTime();
            
            if (this.remainingSeconds === 0) {
                this.stop();
            }
        }, 1000);
        this.updateInterfaceControls();
    }

    stop() {
        clearInterval(this.interval);
        this.interval = null;
        this.updateInterfaceControls();
    }

    select() {
        this.stop();
        const workMinutes = prompt("Please, enter number of minutes:");
        this.originalSeconds = workMinutes * 60;
        this.reset();
    }

    reset() {
        this.remainingSeconds = this.originalSeconds;
        this.updateInterfaceTime();
    }

    static getHTML() {
        return `
        <span class="timer__part timer__part--minutes">00</span>
        <span class="timer__part">:</span>
        <span class="timer__part timer__part--seconds">00</span>
        <button type="button" class="timer__btn timer__part--control timer__btn--start">
            <span class="material-icons">play_arrow</span>
        </button>
        <button type="button" class="timer__btn timer__btn--reset">
            <span class="material-icons">refresh</span>
        </button>
        <button type="button" class="timer__btn timer__btn--set-time">
            <span class="material-icons">timer</span>
        </button>
        <div class="timer__options hidden">
            <input type="text">Hola</input>
            <input type="text">Como ta</input>
        </div>
        `;
    }
}