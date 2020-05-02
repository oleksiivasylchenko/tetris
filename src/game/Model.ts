const enum MODE {
    idle = 'IDLE',
    moveToMainLayer = 'moveToMainLayer',
}

export default class {

    protected mode:MODE = MODE.idle;

    setMode(newMode:MODE) {
        this.mode = newMode;
    }

    isMode(mode:MODE) {
        return this.mode === mode;
    }
}
