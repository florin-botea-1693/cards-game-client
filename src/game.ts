import * as Phaser from 'phaser';

// import PhaserGame from "./phaser.game.ts";
import io from 'socket.io-client';
import CardTestScene from './../tests/CardTestScene';
import GameTableScene from "./scenes/GameTableScene";
import EventsDispatcher from './EventsDispatcher';
import GameTableTestScene from '../tests/GameTableTestScene';

declare global {
    interface Window {
        game: Phaser.Game; 
        GAME_SCALE: number;
        scene: any;
        $socket: SocketIOClient.Socket;
        EventsDispatcher: EventsDispatcher;
        AnimationDispatcher: any;
    }
}

// window.$socket = io('/', {
//     query: {token: window.navigator.productSub}
// });

window.$socket = io.connect(window.location.href/*, {
    query: {token: window.navigator.productSub, namespace: "/dev"},
}*/);

console.log(window.location.href)
window.$socket.on("bar", function() {
    console.log(123);
})

function getScene(): any {
    let urlParams = new URLSearchParams(window.location.search);
    let test: any = urlParams.get('test');
    let scene:any = GameTableScene;
    switch (test) {
        case "CardTestScene":
            scene = CardTestScene;
            break;
        case "GameTableTestScene":
            scene = GameTableTestScene;
            break;
    }
    return scene;
}

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    //gameScale: 1,
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
        width: 800,
        height: 600
    },
    dom: {
        createContainer: true
    },
    scene: getScene(),
};

window.GAME_SCALE = window.devicePixelRatio / 3;
window.EventsDispatcher = new EventsDispatcher();
window.$socket.on("gameEvent", function(event:any) {
    let events = Array.isArray(event) ? event : [event];
    events.forEach((ev:any) => window.EventsDispatcher.dispatch(ev));
});

window.game = new Phaser.Game(config);