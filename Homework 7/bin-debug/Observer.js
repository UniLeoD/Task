var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id, ad, x, y, dp) {
        _super.call(this);
        this._body = new egret.Bitmap();
        this._emoji = new egret.Bitmap();
        this.dialoguePanel = dp;
        this._body.texture = RES.getRes(ad);
        this._emoji.texture = RES.getRes("Exclamation_png");
        this.id = id;
        this.x = x;
        this.y = y;
        this._body.width = this._body.width;
        this._body.height = this._body.height;
        this._emoji.width = this._emoji.width;
        this._emoji.height = this._emoji.height;
        this._emoji.x = 60;
        this._emoji.y = 0;
        this._emoji.alpha = 0;
        this.addChild(this._body);
        this.addChild(this._emoji);
        this.touchEnabled = true;
        this.addEventListener(egret.TouchEvent.TOUCH_BEGIN, this.onNPCClick, this);
    }
    var d = __define,c=NPC,p=c.prototype;
    p.onChange = function (task) {
        if (task.status == TaskStatus.ACCEPTABLE && this.id == task.fromNpcId) {
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.fromNpcId) {
            this._emoji.alpha = 0;
        }
        if (task.status == TaskStatus.CAN_SUBMIT && this.id == task.toNpcId) {
            this._emoji.texture = RES.getRes("Question_png");
            this._emoji.alpha = 1;
        }
        if (task.status == TaskStatus.SUBMITED && this.id == task.toNpcId) {
            this._emoji.alpha = 0;
        }
    };
    p.onNPCClick = function () {
        this.dialoguePanel.showDpanel();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    return NPC;
}(egret.DisplayObjectContainer));
egret.registerClass(NPC,'NPC',["Observer"]);
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel(x, y) {
        _super.call(this);
        this.x = x;
        this.y = y;
        this.textField = new egret.TextField();
        this.textField.x = 10;
        this.textField.x = 1000;
        this.textField2 = new egret.TextField();
        this.textField2.x = 30;
        this.textField2.y = 1030;
        this.addChild(this.textField);
        this.addChild(this.textField2);
    }
    var d = __define,c=TaskPanel,p=c.prototype;
    p.onChange = function (task) {
        this.textField2.text = task.name + " :" + task.status.toString();
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
egret.registerClass(TaskPanel,'TaskPanel',["Observer"]);
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(talk) {
        _super.call(this);
        this.panel_1 = new Panel("Panel_png");
        this.panel_1.x = 120;
        this.panel_1.y = 420;
        this.textfield_1 = new egret.TextField();
        this.textfield_1.text = talk;
        this.button_1 = new Button("OK_png");
        this.textfield_1.x = 150;
        this.textfield_1.y = 450;
        this.button_1.x = 330;
        this.button_1.y = 460;
        this.button_1.touchEnabled = true;
        this.button_1.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.showDpanel = function () {
        this.addChild(this.panel_1);
        this.addChild(this.button_1);
        this.addChild(this.textfield_1);
    };
    p.disshowDpanel = function () {
        this.removeChild(this.panel_1);
        this.removeChild(this.button_1);
        this.removeChild(this.textfield_1);
        //this.alpha=0;
    };
    p.onButtonClick = function () {
        this.disshowDpanel();
        switch (TaskService.getInstance().taskList["000"].status) {
            case TaskStatus.ACCEPTABLE:
                TaskService.getInstance().accept("000");
                break;
            case TaskStatus.CAN_SUBMIT:
                //console.log(TaskService.getInstance().finish("000"));
                TaskService.getInstance().finish("000");
                break;
            default:
                return;
        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
egret.registerClass(DialoguePanel,'DialoguePanel');
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel(ad) {
        _super.call(this);
        this.panel = new egret.Bitmap();
        this.panel.texture = RES.getRes(ad);
        this.addChild(this.panel);
    }
    var d = __define,c=Panel,p=c.prototype;
    return Panel;
}(egret.DisplayObjectContainer));
egret.registerClass(Panel,'Panel');
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(ad) {
        _super.call(this);
        this.body = new egret.Bitmap();
        this.body.texture = RES.getRes(ad);
        this.addChild(this.body);
        this.touchEnabled = true;
    }
    var d = __define,c=Button,p=c.prototype;
    return Button;
}(egret.DisplayObjectContainer));
egret.registerClass(Button,'Button');
