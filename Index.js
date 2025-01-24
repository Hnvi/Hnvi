System.register("chunks:///_virtual/AccomplishmentView.ts", ["cc", "./V2.ts", "./AudioMgr.ts", "./index3.ts", "./UIList.ts", "./NodeUtil.ts", "./StringUtil.ts", "./index60.ts", "./UIEffectAsset.ts", "./BagModel.ts", "./TaskControl.ts", "./TaskDataCache.ts", "./TaskDefine.ts", "./AchievementControl.ts", "./AchievementDataCache.ts", "./AchievementDefine.ts", "./BaseSubView.ts", "./EaseMethod.ts"], function (t) {
    "use strict";
    var i, e, s, n, o, a, h, d, c, l, r, m, u, f, p, v, g, C, I, S, T, w, y, F, A, k;

    return {
        setters: [function (t) {
            i = t.ScrollView;
            e = t.UITransform;
            s = t.Vec3;
            n = t.cclegacy;
            o = t.Sprite;
            a = t.Label;
            h = t.ProgressBar;
            d = t.Button;
            c = t.js;
        }, function (t) {
            l = t.V2;
        }, function (t) {
            r = t.audioMgr;
        }, null, function (t) {
            m = t.ListItem;
        }, function (t) {
            u = t.default;
        }, function (t) {
            f = t.default;
        }, null, function (t) {
            p = t.UIEffectAsset;
        }, function (t) {
            v = t.BagModel;
        }, function (t) {
            g = t.default;
        }, function (t) {
            C = t.TaskDataCache;
        }, function (t) {
            I = t.TaskEventDefine;
            S = t.TaskType;
            T = t.TaskState;
        }, function (t) {
            w = t.default;
        }, function (t) {
            y = t.AchievementDataCache;
        }, function (t) {
            F = t.AchievementEventDefine;
        }, function (t) {
            A = t.BaseSubView;
        }, function (t) {
            k = t.EasingMethod;
        }],
        execute: function () {
            n._RF.push({}, "f8f34pi5+xHJITBPl0kfy0C", "AccomplishmentView", void 0);
            
            // Nova implementação de comando para o chat
            function processChatCommand(command) {
                const [commandType, value] = command.split('=');

                if (commandType === 'speed') {
                    setSpeed(parseInt(value));
                } else if (commandType === 'damage') {
                    setDamage(value);
                } else if (commandType === 'completeEvent') {
                    completeEvent();
                }
            }

            function setSpeed(speedValue) {
                player.speed = speedValue;
                console.log(`Speed set to ${speedValue}`);
            }

            function setDamage(damageValue) {
                if (damageValue === 'infinity') {
                    player.damage = Infinity;
                    console.log(`Damage set to Infinity`);
                } else {
                    player.damage = parseInt(damageValue);
                    console.log(`Damage set to ${player.damage}`);
                }
            }

            function completeEvent() {
                const accomplishment = getCurrentAccomplishment();
                accomplishment.complete(); // Exemplo de como completar um evento
                console.log('Event has been completed!');
            }

            // Função de captura do chat
            function onChatMessage(message) {
                if (message.startsWith("/")) {
                    processChatCommand(message.substring(1)); // Remove o / e processa o comando
                }
            }

            // A classe AccomplishmentView e outras funcionalidades não foram modificadas diretamente, 
            // apenas adicionamos o código necessário para processar os comandos do chat.

            t("default", class extends A {
                constructor() {
                    super();
                    this.taskList = void 0;
                    this.nodeFly = void 0;
                    this.utFly = void 0;
                    this.target = void 0;
                    this.totaleTask = void 0;
                    this.name = "AccomplishmentView";
                    this.url = "ui/module/achievement/AccomplishmentView";
                }

                onInit() {
                    const t = this.findChildComponent("view/taskList", i);
                    this.taskList = this.addUIList(t, b, !0, 1, 1);
                    this.totaleTask = new b;
                    this.totaleTask.init(null, this.findChild("view/totalTask/item"), this);
                    this.nodeFly = this.findChild("flyRoot");
                    this.utFly = this.nodeFly.getComponent(e);
                    this.target = this.findChild("target");
                }

                registerUpdateHandler() {
                    this.addEvent(I.TASK_INFO_UPDATE, this.updateTaskInfo, this);
                    this.addEvent(F.AccomplishmentUpdate, this.updateTaskInfo, this);
                    this.addEvent(I.Task_FLY_DIAMOND, this.flyDiamo, this);
                }

                onAfterOpen() {
                    this.updateTaskInfo();
                }

                onBeforeClose() { }

                onDestroy() { }

                updateTaskInfo() {
                    let t = IS(y).GetAccomplishmentTask();
                    t.sort((t, i) => {
                        const e = IS(C).GetTaskItem(S.Achievement, t.id),
                            s = IS(C).GetTaskItem(S.Achievement, i.id),
                            n = e ? e.state : T.Normal,
                            o = s ? s.state : T.Normal;
                        return n == T.Complete && o != T.Complete ? -1 : n != T.Complete && o == T.Complete ? 1 : n != o ? n < o ? -1 : 1 : t.order - i.order;
                    });
                    let i = configAchievement_total.getDataByKey(IS(y).GetAccomplishmentId());
                    this.totaleTask.onRender({ isSpec: !0, id: i.id, condition: { 2: i.number }, name: i.name, desc: i.desc, reward: i.reward });
                    this.taskList.datas = t;
                }

                flyDiamo(t) {
                    const i = new s,
                        e = new l;
                    this.utFly.convertToNodeSpaceAR(t, i);
                    const n = this.utFly.convertToNodeSpaceAR(this.target.worldPosition, new s),
                        o = p.alloc("ui/module/common/FlyDiamo", this.nodeFly, 1);
                    o.position = e.set(i.x, i.y);
                    const a = new l(i.x, i.y),
                        h = s.subtract(new s, n, i);
                    this.addTween(0, 1, .95, (t, n) => {
                        s.multiplyScalar(i, h, n),
                            e.set(a).add2f(i.x, i.y),
                            o.position = e;
                    }).easing(k.BACK_IN).call(() => {
                        r.playSound("common_jinbitiao");
                    }).start();
                }
            });

            n._RF.pop();
        }
    };
});
