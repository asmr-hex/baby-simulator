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
let player

function preload() {
  this.load.image('ron', 'assets/ronald.png')
  this.load.spritesheet('baby', 
                        'assets/baby.png',
                        { frameWidth: 320, frameHeight: 160 }
                       )
}

function create() {
  this.add.image(0, 0, 'ron').setOrigin(0)
  text = this.add.text(300, 50, 'ronald', { font: '16px Courier', fill: '#fca7fa'})

  this.input.gamepad.once('connected', pad => {
    console.log(`Connected to Pad ${pad.index}`)
  })


  player = this.physics.add.sprite(100, 450, 'baby')
  player.setCollideWorldBounds(true)

  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('baby', { start: 0, end: 2 }),
    frameRate: 10,
    repeat: -1
  })

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('baby', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  })
}

function update() {
  let cursors = this.input.keyboard.createCursorKeys()

  if (cursors.left.isDown)
  {
    player.setVelocityX(-160);

    player.anims.play('left', true);
  }
  else if (cursors.right.isDown)
  {
    player.setVelocityX(160);

    player.anims.play('right', true);
  }
  
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

  console.log(pads[0].axes)
  
  if (pads[0].axes[3].getValue() === -1) {
    player.setVelocityX(-160);

    player.anims.play('left', true);    
  } else if (pads[0].axes[3].getValue() === 1) {
    player.setVelocityX(160);

    player.anims.play('right', true);    
  }

  
  text.setText(debug)
}
