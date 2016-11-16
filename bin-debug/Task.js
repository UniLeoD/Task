var Task = (function () {
    function Task(npcId, npcName) {
        this.npcId = npcId;
        this.npcName = npcName;
    }
    var d = __define,c=Task,p=c.prototype;
    d(p, "status"
        ,function () {
            return this.currentStatus;
        }
        ,function (value) {
            this.currentStatus = value;
        }
    );
    d(p, "id"
        ,function () {
            return this.npcId;
        }
        ,function (id) {
            this.npcId = id;
        }
    );
    d(p, "name"
        ,function () {
            return this.npcName;
        }
        ,function (name) {
            this.npcName = name;
        }
    );
    return Task;
}());
egret.registerClass(Task,'Task');
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUBMIT"] = 3] = "CAN_SUBMIT";
    TaskStatus[TaskStatus["SUBMITED"] = 4] = "SUBMITED";
})(TaskStatus || (TaskStatus = {}));
