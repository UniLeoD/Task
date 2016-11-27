interface Observer {
    onChange(task: Task): void;
}

class NPC extends egret.DisplayObjectContainer implements Observer {
    public _emoji: egret.Bitmap;
    public _body: egret.Bitmap;
    private id: string;
    public dialoguePanel: DialoguePanel;

    constructor(id: string, ad: string, x: number, y: number, dp: DialoguePanel) {
        super();
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

    onChange(task: Task) {
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
    }

    onNPCClick() {

        this.dialoguePanel.showDpanel();
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);

    }
}

class TaskPanel extends egret.DisplayObjectContainer implements Observer {

    textField: egret.TextField;
    textField2: egret.TextField;
 
    constructor(x: number, y: number) {
        super();
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

    onChange(task: Task): void {

        this.textField2.text = task.name + " :" + task.status.toString();
    }

}


class DialoguePanel extends egret.DisplayObjectContainer {
    panel_1: Panel;
    button_1: Button;
    textfield_1: egret.TextField;


    constructor(talk: string) {
        super();


        this.panel = new Panel("Panel_png");
        this.panel.x = 120;
        this.panel.y = 420;
        this.textfield = new egret.TextField();
        this.textfield.text = talk;
        this.button = new Button("OK_png");
        this.textfield.x = 150;
        this.textfield.y = 450;
        this.button.x = 330;
        this.button.y = 460;
        this.button.touchEnabled = true;
        this.button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);


    }

    showDpanel() {
        this.addChild(this.panel);
        this.addChild(this.button);
        this.addChild(this.textfield);
      
    }

    disshowDpanel() {
        this.removeChild(this.panel);
        this.removeChild(this.button);
        this.removeChild(this.textfield);

    }


    onButtonClick() {
        this.disshowDpanel();
        switch (TaskService.getInstance().taskList["000"].status) {
            case TaskStatus.ACCEPTABLE:

                TaskService.getInstance().accept("000");

                break;
            case TaskStatus.CAN_SUBMIT:
                TaskService.getInstance().finish("000");

                break;
            default:
                return

        }
        TaskService.getInstance().notify(TaskService.getInstance().taskList["000"]);
    }
}

class Panel extends egret.DisplayObjectContainer {

    panel: egret.Bitmap;
    constructor(ad: string) {
        super();
        this.panel = new egret.Bitmap();
        this.panel.texture = RES.getRes(ad);
        this.addChild(this.panel);


    }
}

class Button extends egret.DisplayObjectContainer {
    body: egret.Bitmap;
    constructor(ad: string) {
        super();
        this.body = new egret.Bitmap();
        this.body.texture = RES.getRes(ad);
        this.addChild(this.body);
        this.touchEnabled = true;
    }
}
