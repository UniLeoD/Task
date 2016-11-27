class Task {

    private npcId: string;
    private npcName: string;
    private currentStatus: TaskStatus;

    public fromNpcId: string;
    public toNpcId: string;


    constructor(npcId: string, npcName: string) {
        this.npcId = npcId;
        this.npcName = npcName;

    }
    public get status(): TaskStatus {

        return this.currentStatus;
    }

    public get id(): string {
        return this.npcId;
    }

    public get name(): string {
        return this.npcName;
    }

    public set status(value: TaskStatus) {
        this.currentStatus = value;

    }
    public set name(name: string) {
        this.npcName = name;
    }

    public set id(id: string) {
        this.npcId = id;
    }

}

enum TaskStatus {

    UNACCEPTABLE,
    ACCEPTABLE,
    DURING,
    CAN_SUBMIT,
    SUBMITED

}