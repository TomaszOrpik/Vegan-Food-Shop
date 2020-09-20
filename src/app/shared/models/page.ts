
export class Page {
    name: string;
    timeOn: number;

    constructor(name = '', timeOn = 0) {
        this.name = name;
        this.timeOn = timeOn;
    }
}
