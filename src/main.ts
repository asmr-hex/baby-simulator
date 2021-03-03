import * as Phaser from 'phaser';

const gameConfig: Phaser.Types.Core.GameConfig = {
  title: 'Sample',
  
  type: Phaser.AUTO,
  
  scale: {
    width: window.innerWidth,
    height: window.innerHeight,
  },
  
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
    },
  },
  
  parent: 'game',
  backgroundColor: '#000000',

  input: {
    gamepad: true,
  },
  
  scene: {
    preload: preload,
    create: create,
    update: update,
  }
};

export const game = new Phaser.Game(gameConfig);

let text

function preload() {
  this.load.image('ron', 'assets/ronald.png')
}

function create() {
  this.add.image(0, 0, 'ron').setOrigin(0)
  text = this.add.text(300, 50, 'ronald', { font: '16px Courier', fill: '#fca7fa'})

  this.input.gamepad.once('connected', pad => {
    console.log(`Connected to Pad ${pad.index}`)
  })
}

function update() {
  if (this.input.gamepad.total === 0) return

  let debug = []
  const pads = this.input.gamepad.gamepads

  let buttons = ''
  for (const pad of pads) {
    for (const button of pad.buttons) {
      buttons = buttons.concat(`B${button.index}: ${button.value}`)
    }
    debug.push(buttons)

    let axes = ''
    for (const axis of pad.axes) {
      axes = axes.concat(`A${axis.index}: ${axis.getValue()}`)
    }
    debug.push(axes)
    debug.push('')
  }
  text.setText(debug)
}
