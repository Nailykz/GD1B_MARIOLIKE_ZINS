class shokumotsu extends Phaser.Scene{
    constructor(){
        super("shokumotsu");
    }
    init(data){
    }

create ()
{  
    this.add.image(-500, 0, 'bg').setOrigin(0,-1.08).setScale(0.7);
    this.add.image(903.5,0, 'bg').setOrigin(0,-1.08).setScale(0.7);
    this.add.image(2303.5,0, 'bg').setOrigin(0,-1.08).setScale(0.7);
    
    const map = this.make.tilemap({key : 'map'});
    const tileset = map.addTilesetImage('tiles','tiles');

    ground = map.createDynamicLayer('Ville',tileset);
    ground.setCollisionByExclusion(-1,true);
    background = map.createDynamicLayer('Faux_Murs',tileset);
    this.death_zone = map.createDynamicLayer('Death_Zone',tileset);
    this.death_zone.setCollisionByExclusion(-1,true);
    this.death_zone_2 = map.createDynamicLayer('Death_Zone_2',tileset);
    this.death_zone_2.setCollisionByExclusion(-1,true);

   
    //player = this.physics.add.sprite(200,1450, 'sprite_buta_normal').setScale(0.06);
    player = this.physics.add.sprite(2450,1100, 'sprite_buta_normal').setScale(0.06);

    full_heart_1 = this.add.sprite(50,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_2 = this.add.sprite(100,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_3 = this.add.sprite(150,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_4 = this.add.sprite(200,30, 'full_heart').setScrollFactor(0).setScale(0.1);
    full_heart_5 = this.add.sprite(250,30, 'full_heart').setScrollFactor(0).setScale(0.1);
        
    empty_heart_1 = this.add.sprite(50,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_2 = this.add.sprite(100,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_3 = this.add.sprite(150,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_4 = this.add.sprite(200,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);
    empty_heart_5 = this.add.sprite(250,30, 'empty_heart').setVisible(false).setScrollFactor(0).setScale(0.1);

    jauge2 = this.add.sprite(100,75, 'sprite').setScale(0.4).setScrollFactor(0);
 /*    player = this.add.sprite(200,1550, 'sprite_buta').setScale(0.1); */
    this.cameras.main.startFollow(player, false, 1, 1, 0, 0);
    
    player.setBounce(0.0);
    player.setCollideWorldBounds(false);
    
    cursors = this.input.keyboard.createCursorKeys(); 
    Jump = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);  
    Competence_Speciale = this.input.keyboard.addKey('F');
    Roulade = this.input.keyboard.addKey('E');

    this.physics.add.collider(player, ground);
    this.physics.add.collider(player, this.death_zone, death_Zone_Spawnpoint, null, this);
    this.physics.add.collider(player, this.death_zone_2, death_Zone_Spawnpoint_2, null, this);

//CAISSE
    const CaisseObjects = map.getObjectLayer('Caisse').objects;

    this.caisses = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for (const caisse of CaisseObjects){
            this.caisses.create(caisse.x, caisse.y, 'box')
                .setScale(0.1)
        }

    for (const caisse of this.caisses.children.entries) {
        this.physics.add.collider(caisse, ground);
        this.physics.add.collider(caisse, ennemi);
        this.physics.add.collider(player, caisse, hitByPlayer, null, this);        
    }       
        this.physics.add.collider(this.caisses, this.caisses);


//PIMENT
    const PimentObjects = map.getObjectLayer('Piment').objects;

    this.piments = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });
    
    for (const piment of PimentObjects){
            this.piments.create(piment.x, piment.y, 'chilli_pepper')
                .setScale(0.15)
        }

    for (const piment of this.piments.children.entries) {
        this.physics.add.collider(piment, ground);
        this.physics.add.overlap(player, piment, Recolte_Piment, null, this);
        
    }       
    
//GLACE
    const GlaceObjects = map.getObjectLayer('Glace').objects;

    this.glaces = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const glace of GlaceObjects){
            this.glaces.create(glace.x, glace.y, 'ice_cream')
                .setScale(0.07)
    }

    for (const glace of this.glaces.children.entries){
        this.physics.add.collider(glace, ground);
        this.physics.add.overlap(player, glace, Recolte_Glace, null, this);
    }

//POULET
    const PouletObjects = map.getObjectLayer('Poulet').objects;

    this.poulets = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const poulet of PouletObjects){
            this.poulets.create(poulet.x, poulet.y, 'chicken')
                .setScale(0.1)
    }

    for (const poulet of this.poulets.children.entries){
        this.physics.add.collider(poulet, ground);
        this.physics.add.overlap(player, poulet, Recolte_Poulet, null, this);
    }
    
//ALIMENT 

    const AlimentObjects = map.getObjectLayer('Aliment').objects;

    this.aliments = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const aliment of AlimentObjects){
        this.aliments.create(aliment.x, aliment.y,'food')
            .setScale(0.1)
    }

    for(const aliment of this.aliments.children.entries){
        this.physics.add.collider(aliment,ground);
        this.physics.add.overlap(player, aliment, Recolte_Aliment, null, this);
    }

//ENNEMIS 

    const EnnemiObjects = map.getObjectLayer('Ennemi').objects;

    this.ennemis = this.physics.add.group({
        immovable:false,
        allowGravity:true,
    });

    for(const ennemi of EnnemiObjects){
        this.ennemis.create(ennemi.x, ennemi.y-50,'ennemi')
            .setScale(0.2)
            .setGravityY(300);
    }

    for(const ennemi of this.ennemis.children.entries){
        this.physics.add.collider(ennemi, ground);
        this.physics.add.collider(ennemi, this.caisses);
        this.physics.add.collider(player, ennemi, Fonction_Ennemi, null, this);
        ennemi.direction = 'RIGHT';
    }
    
//RESPAWNING_POULET
    const Respawn_PouletObjects = map.getObjectLayer('Respawn_Poulet').objects;

        this.respawn_poulets = this.physics.add.group({
            immovable:true,
            allowGravity:false,
        });

        for(const respawn_poulet of Respawn_PouletObjects){
                this.respawn_poulets.create(respawn_poulet.x, respawn_poulet.y, 'chicken')
                    .setScale(0.1)
        }

        for (const respawn_poulet of this.respawn_poulets.children.entries){
            this.physics.add.collider(respawn_poulet, ground);
            this.physics.add.overlap(player, respawn_poulet, Recolte_Respawn_Poulet, null, this);
        }

//RESPAWNING_PIMENT
const Respawn_PimentObjects = map.getObjectLayer('Respawn_Piment').objects;

    this.respawn_piments = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const respawn_piment of Respawn_PimentObjects){
            this.respawn_piments.create(respawn_piment.x, respawn_piment.y, 'chilli_pepper')
                .setScale(0.1)
    }

    for (const respawn_piment of this.respawn_piments.children.entries){
        this.physics.add.collider(respawn_piment, ground);
        this.physics.add.overlap(player, respawn_piment, Recolte_Respawn_Piment, null, this);
    }

//RESPAWNING_GLACE
const Respawn_GlaceObjects = map.getObjectLayer('Respawn_Glace').objects;

    this.respawn_glaces = this.physics.add.group({
        immovable:true,
        allowGravity:false,
    });

    for(const respawn_glace of Respawn_GlaceObjects){
            this.respawn_glaces.create(respawn_glace.x, respawn_glace.y, 'ice_cream')
                .setScale(0.07)
    }

    for (const respawn_glace of this.respawn_glaces.children.entries){
        this.physics.add.collider(respawn_glace, ground);
        this.physics.add.overlap(player, respawn_glace, Recolte_Respawn_Glace, null, this);
    }

//BOULE DE FEU
    boules_de_feu = this.physics.add.group({
        allowGravity:true,
    });  

//BOULE DE GLACE 
    boules_de_glace = this.physics.add.group({
        allowGravity:true,
    });

//Anim_JAUGE
    this.anims.create({
            key: 'jauge_0',
            frames: this.anims.generateFrameNumbers('sprite', { start: 0, end: 0 }),
            frameRate: 10,
            repeat: -1
            });
    this.anims.create({
            key: 'jauge_10',
            frames: this.anims.generateFrameNumbers('sprite', { start: 1, end: 1 }),
            frameRate: 10,
            repeat: -1
            });
    this.anims.create({
            key: 'jauge_25',
            frames: this.anims.generateFrameNumbers('sprite', { start: 2, end: 2 }),
            frameRate: 10,
            repeat: -1
            });
    this.anims.create({
            key: 'jauge_40',
            frames: this.anims.generateFrameNumbers('sprite', { start: 3, end: 3 }),
            frameRate: 10,
            repeat: -1
            });      
    this.anims.create({
            key: 'jauge_55',
            frames: this.anims.generateFrameNumbers('sprite', { start: 4, end: 4 }),
            frameRate: 10,
            repeat: -1
            });      
    this.anims.create({
            key: 'jauge_70',
            frames: this.anims.generateFrameNumbers('sprite', { start: 5, end: 5 }),
            frameRate: 10,
            repeat: -1
            });  
    this.anims.create({
            key: 'jauge_85',
            frames: this.anims.generateFrameNumbers('sprite', { start: 6, end: 6 }),
            frameRate: 10,
            repeat: -1
            });     
    this.anims.create({
            key: 'jauge_100',
            frames: this.anims.generateFrameNumbers('sprite', { start: 7, end: 7 }),
            frameRate: 10,
            repeat: -1
            }); 

//SPRITE NORMAL
    this.anims.create({
            key: 'buta_normal_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });    
    this.anims.create({
        key: 'buta_normal_left',
        frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 0, end: 3}),
        frameRate: 10,
        repeat: -1
    }); 
    this.anims.create({
            key: 'buta_normal_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_normal_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    });

//SPRITE FEU
    this.anims.create({
            key: 'buta_feu_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });    
    this.anims.create({
            key: 'buta_feu_left',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_right',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    }); 

//SPRITE GLACE
    this.anims.create({
            key: 'buta_glace_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });    
    this.anims.create({
            key: 'buta_glace_left',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_right',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    }); 

//SPRITE AILE
    this.anims.create({
            key: 'buta_aile_static',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 4, end: 4}),
            frameRate: 10,
            repeat: -1
    });    
    this.anims.create({
            key: 'buta_aile_left',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 0, end: 3}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_right',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 5, end: 8}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_saut_droit',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 6, end: 6}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_saut_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile_vole', {start: 2, end: 2}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_aile_vole_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile_vole', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_aile_vole_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile_vole', {start: 5, end: 5}),
            frameRate: 10,
            repeat: -1
    }); 

//ROULADE
    this.anims.create({
            key: 'buta_normal_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_normal_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_normal_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 9, end: 9}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_normal_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_normal', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    });

    this.anims.create({
            key: 'buta_feu_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    });this.anims.create({
            key: 'buta_feu_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 9, end: 9}),
            frameRate: 60,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_feu_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_feu', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    }); 

    this.anims.create({
            key: 'buta_glace_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_glace_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 9, end: 9}),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_glace_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_glace', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    });

    this.anims.create({
            key: 'buta_aile_roulade_gauche',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 12, end: 12}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_roulade_gauche_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 11, end: 11}),
            frameRate: 10,
            repeat: -1
    }); 
    this.anims.create({
            key: 'buta_aile_roulade_droite',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 9, end: 9 }),
            frameRate: 10,
            repeat: -1
    });
    this.anims.create({
            key: 'buta_aile_roulade_droite_charge',
            frames: this.anims.generateFrameNumbers('sprite_buta_aile', {start: 10, end: 10}),
            frameRate: 10,
            repeat: -1
    });

    this.anims.create({
            key: 'Freeze',
            frames: this.anims.generateFrameNumbers('ennemi_freeze', {start: 0, end: 0}),
            frameRate: 10,
            repeat: -1
    });  

}
//CONTROLE
//GOUPDATE 
update ()
{
    player.update();
    onGround = player.body.blocked.down;
    roulade=false;
    player.setGravityY(300);

    //BUTA_NORMAL
    if(cursors.left.isDown && Roulade.isUp && Buta_normal == true){
            player.anims.play('buta_normal_left', true);
        }
        if(cursors.right.isDown && Roulade.isUp && Buta_normal == true ){
            player.anims.play('buta_normal_right', true);
        }
        if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_normal == true){
            player.anims.play('buta_normal_static', true);
        }
        if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_normal == true|| cursors.right.isDown && onGround==false&& Buta_normal == true){
            player.anims.play('buta_normal_saut_droit', true);
        }
        if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_normal == true|| cursors.left.isDown && onGround==false && Buta_normal == true){
            player.anims.play('buta_normal_saut_gauche', true);
        }
    //BUTA_FEU
    if(cursors.left.isDown && Roulade.isUp && Buta_Feu == true){
            player.anims.play('buta_feu_left', true);
        }
        if(cursors.right.isDown && Roulade.isUp && Buta_Feu == true){
            player.anims.play('buta_feu_right', true);
        }
        if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_Feu == true){
            player.anims.play('buta_feu_static', true);
        }
        if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_Feu == true|| cursors.right.isDown && onGround==false&& Buta_Feu == true){
            player.anims.play('buta_feu_saut_droit', true);
        }
        if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_Feu == true|| cursors.left.isDown && onGround==false && Buta_Feu == true){
            player.anims.play('buta_feu_saut_gauche', true);
        }
    //BUTA_GLACE
    if(cursors.left.isDown && Roulade.isUp && Buta_Glace == true){
            player.anims.play('buta_glace_left', true);
        }
        if(cursors.right.isDown && Roulade.isUp && Buta_Glace == true ){
            player.anims.play('buta_glace_right', true);
        }
        if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_Glace == true){
            player.anims.play('buta_glace_static', true);
        }
        if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_Glace == true|| cursors.right.isDown && onGround==false&& Buta_Glace == true){
            player.anims.play('buta_glace_saut_droit', true);
        }
        if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_Glace == true|| cursors.left.isDown && onGround==false && Buta_Glace == true){
            player.anims.play('buta_glace_saut_gauche', true);
        }
    //BUTA_AILE
    if(cursors.left.isDown && Roulade.isUp && Buta_Aile == true){
            player.anims.play('buta_aile_left', true);
        }
        if(cursors.right.isDown && Roulade.isUp && Buta_Aile == true ){
            player.anims.play('buta_aile_right', true);
        }
        if(cursors.right.isUp && Roulade.isUp && cursors.left.isUp && Buta_Aile == true){
            player.anims.play('buta_aile_static', true);
        }
        if(cursors.right.isDown && Roulade.isUp && cursors.up.isDown && Buta_Aile == true|| cursors.right.isDown && onGround==false&& Buta_Aile == true){
            player.anims.play('buta_aile_saut_droit', true);
        }
        if(cursors.left.isDown && Roulade.isUp && cursors.up.isDown && Buta_Aile == true|| cursors.left.isDown && onGround==false && Buta_Aile == true){
            player.anims.play('buta_aile_saut_gauche', true);
        }
        if(cursors.right.isDown && Buta_Aile == true && Competence_Speciale.isDown || cursors.right.isDown && cursors.up.isDown && Buta_Aile == true && Competence_Speciale.isDown){
            player.anims.play('buta_aile_vole_droite', true);
        }
        if(cursors.left.isDown && Buta_Aile == true && Competence_Speciale.isDown|| cursors.left.isDown && cursors.up.isDown && Buta_Aile == true && Competence_Speciale.isDown){
            player.anims.play('buta_aile_vole_gauche', true);
        }

    //ROULADE BUTA NORMAL
    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_normal == true)
    {
        player.anims.play('buta_normal_roulade_gauche', true);
        player.anims.play('buta_normal_roulade_gauche', false)
        player.anims.play('buta_normal_roulade_gauche_charge', true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_normal == true)
    {
        player.anims.play('buta_normal_roulade_droite', true);
        player.anims.play('buta_normal_roulade_droite', false);
        player.anims.play('buta_normal_roulade_droite_charge', true);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }

    //ROULADE BUTA FEU

    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_Feu == true)
    {
        player.anims.play('buta_feu_roulade_gauche', true);
        player.anims.play('buta_feu_roulade_gauche', false);
        player.anims.play('buta_feu_roulade_gauche_charge', true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_Feu == true)
    {
        player.anims.play('buta_feu_roulade_droite', true);
        player.anims.play('buta_feu_roulade_droite', false);
        player.anims.play('buta_feu_roulade_droite_charge', true);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }
    //ROULADE BUTA GLACE

    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_Glace == true)
    {
        player.anims.play('buta_glace_roulade_gauche', true);
        player.anims.play('buta_glace_roulade_gauche', false);
        player.anims.play('buta_glace_roulade_gauche_charge', true);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_Glace == true)
    {
        player.anims.play('buta_glace_roulade_droite', true);
        player.anims.play('buta_glace_roulade_droite', false);
        player.anims.play('buta_glace_roulade_droite_charge', true);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }
    //ROULADE BUTA AILE

    if (cursors.left.isDown && Roulade.isDown && jauge>0 && Buta_Aile == true)
    {
        player.anims.play('buta_aile_roulade_gauche', true);
        player.anims.play('buta_aile_roulade_gauche', false);
        player.anims.play('buta_aile_roulade_gauche_charge', true);
        //this.time.delayedCall(1000, AnimRoulade, null, this);
        roulade=true;
        player.setVelocityX(-500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(-170);
        }    
    }
    if(cursors.right.isDown && Roulade.isDown && jauge>0 && Buta_Aile == true)
    {
        player.anims.play('buta_aile_roulade_droite', true);
        player.anims.play('buta_aile_roulade_droite', false);
        player.anims.play('buta_aile_roulade_droite_charge', true);
        roulade=true;
        player.setVelocityX(500);
        jauge-=1;
        if(jauge<1){
            player.setVelocityX(170);
        }
    }

////////////////////

    if(player.body.blocked.down==true || inContactCaisse == true){
        playerBlockedDown=true;
        jumpCount=0;
    }

    if (gameOver)
    {
        return;
    }

    if (cursors.left.isUp && cursors.right.isUp && cursors.up.isUp && cursors.down.isUp)
    {
        player.setVelocityX(0);
    }
    
    if (cursors.left.isDown && Roulade.isUp)
    {
        player.setVelocityX(-170);
    }
    if(cursors.right.isDown && Roulade.isUp)
    {
        player.setVelocityX(170);
    }
    if (cursors.up.isDown && onGround==true || Jump.isDown && onGround==true)
    {
        player.setVelocityY(-170);
        inContactCaisse = false;
    }
    if (cursors.up.isDown && Touche_Caisse==true || Jump.isDown && Touche_Caisse==true)
    {
        Touche_Caisse=false;
        player.setVelocityY(-170);
        inContactCaisse = false;
    }

    if(cursors.down.isDown)
    {
        player.setVelocityY(170);  
        inContactCaisse = false;
  
    }

    if (Competence_Speciale.isDown)
    {
        if(Buta_Feu==true && BDF_reload==true)
        {
            lancer_boule_de_feu(player);
            this.physics.add.collider(boules_de_feu, ground, destroyFireball, null, this);
            this.physics.add.overlap(boules_de_feu, this.ennemis, Kill_Ennemi, null, this);
            this.physics.add.overlap(boules_de_feu, this.caisses, destroyBox, null, this);  
        }       
    }

    if (Competence_Speciale.isDown)
    {
        if(Buta_Glace==true && BDG_reload==true)
        {
            lancer_boule_de_glace(player);
            this.physics.add.collider(boules_de_glace, ground, destroyIceball, null, this);
            this.physics.add.overlap(boules_de_glace, this.ennemis, Gele_Ennemi, null, this);
        }       
    }
    if (Competence_Speciale.isDown)
    {
        if(Buta_Aile==true && undefined_jauge>0)
        {
            player.setGravity(0);
            if(cursors.down.isDown)
            {
                player.setVelocityY(170);
                undefined_jauge-=1;   
            }
            if (cursors.up.isDown)
            {
                player.setVelocityY(-170);
                undefined_jauge-=1; 
            }
        }       
    }
    if (player_hp == 4){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
            }
            else if (player_hp == 3){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
            }
            else if (player_hp == 2){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
            }
            else if (player_hp == 1){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
            }
            else if (player_hp == 0){
                full_heart_5.setVisible(false);
                empty_heart_5.setVisible(true);
                full_heart_4.setVisible(false);
                empty_heart_4.setVisible(true);
                full_heart_3.setVisible(false);
                empty_heart_3.setVisible(true);
                full_heart_2.setVisible(false);
                empty_heart_2.setVisible(true);
                full_heart_1.setVisible(false);
                empty_heart_1.setVisible(true);
            }    
            
            for (const ennemi of this.ennemis.children.entries) {
            if(ennemi.direction=='Stop'){
                ennemi.setVelocityX(0);
                
            }
            else if(ennemi.direction!=='Stop'){
                if (ennemi.body.blocked.right || ennemi.body.touching.right) {
                    ennemi.direction = 'LEFT';
                }

                if (ennemi.body.blocked.left || ennemi.body.touching.left) {
                    ennemi.direction = 'RIGHT';
                }

                if (ennemi.direction === 'RIGHT') {
                    ennemi.setVelocityX(0);
                } 
                else if(ennemi.direction === 'LEFT') {
                    ennemi.setVelocityX(-0);
                }  
            }
                    
        }   

        if(doublesaut===true)
        {
        const isJumpJustDownup = Phaser.Input.Keyboard.JustDown(cursors.up)         
        //DOUBLE SAUT SI HAUT DE CAISSE
        if (isJumpJustDownup && (onGround || jumpCount < 2 || onEnnemis==true && jumpCount < 2)) 
        {
            player.setVelocityY(-170);
            jumpCount++;
        }

        if (onGround && !isJumpJustDownup)
        {
            jumpCount = 0;
        }     
    }
        if(jauge>=0 && jauge < 1)
        {
            jauge2.anims.play('jauge_0',true);        
        }
        if(jauge>=1 && jauge < 25)
        {
            jauge2.anims.play('jauge_10',true);   
        }
        if(jauge>=25 && jauge < 40)
        {
            jauge2.anims.play('jauge_25',true);  
        }
        if(jauge>=40 && jauge < 55)
        {
            jauge2.anims.play('jauge_40',true); 
        }
        if(jauge>=55 && jauge < 70)
        {
            jauge2.anims.play('jauge_55',true); 
        }
        if(jauge>=70 && jauge < 85)
        {
            jauge2.anims.play('jauge_70',true); 
        }
        if(jauge>=85 && jauge < 100)
        {
            jauge2.anims.play('jauge_85',true); 
        }
        if(jauge >= 100)
        {
            jauge2.anims.play('jauge_100',true); 
        }
}
}
///////////////////////////////////////
///////FONCTIONS SPECIALS SKILLS///////
///////////////////////////////////////
    function lancer_boule_de_feu(player){ 
        var boule_de_feu_gauche = boules_de_feu.create(player.x, player.y-15, 'boule_de_feu_gauche')
        .setGravityY(0)
        .setScale(0.1)
        var boule_de_feu_droit = boules_de_feu.create(player.x, player.y-15, 'boule_de_feu_droit')
        .setGravityY(0)
        .setScale(0.1)

        var directionFireballPlayer = Math.round(Phaser.Math.Between(0,1))

        if(cursors.left.isDown){
            directionFireballPlayer=-400;
            playerDirection="left";
        }
        else if(cursors.right.isDown){
            directionFireballPlayer=400;
            playerDirection="right";
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionFireballPlayer==1){
            directionFireballPlayer=400;
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionFireballPlayer==0){
            directionFireballPlayer=-400;
        }

        if(playerDirection=="right"){
            boule_de_feu_gauche.destroy();
            boule_de_feu_droit.setVelocity(400, 0);   
        }

        else if(playerDirection=="left"){
            boule_de_feu_droit.destroy();
            boule_de_feu_gauche.setVelocity(-400, 0);
        }  
        Competence_Speciale.reset();
        BDF_reload=false;   
    }

    function lancer_boule_de_glace(player){
        var boule_de_glace_gauche = boules_de_glace.create(player.x, player.y-15, 'boule_de_glace_gauche')
        .setGravityY(0)
        .setScale(0.1)
        var boule_de_glace_droit = boules_de_glace.create(player.x, player.y-15, 'boule_de_glace_droit')
        .setGravityY(0)
        .setScale(0.1)

        var directionIceBallPlayer = Math.round(Phaser.Math.Between(0,1))
        
        if(cursors.left.isDown){
            directionIceBallPlayer=-400;
            playerDirection="left";
            
        }
        else if(cursors.right.isDown){
            directionIceBallPlayer=400;
            playerDirection="right";
            
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionIceBallPlayer==1){
            directionIceBallPlayer=400;
        }
        else if(cursors.right.isUp && cursors.left.isUp && cursors.up.isUp && directionIceBallPlayer==0){
            directionIceBallPlayer=-400;
        }

        if(playerDirection=="right"){
            boule_de_glace_gauche.destroy();
            boule_de_glace_droit.setVelocity(400, 0);
        }

        else if(playerDirection=="left"){
            boule_de_glace_droit.destroy();
            boule_de_glace_gauche.setVelocity(-400, 0);
        }
        BDG_reload=false;
    }

    function destroyFireball(boules_de_feu, ground){
        boules_de_feu.destroy();
        BDF_reload=true;
        } 

    function destroyIceball(boules_de_glace, ground){
        boules_de_glace.destroy();
        BDG_reload=true;
        }
///////////////////////////////////////
/////FIN FONCTIONS SPECIALS SKILLS/////
///////////////////////////////////////

    function hitByPlayer(player, caisse)
{
    if(playerBlockedDown==true)
    {
        inContactCaisse = true;
        playerBlockedDown=false;
        Touche_Caisse=true;
    }
    if(roulade==true){
        caisse.destroy();
    }
}

    function destroyBox(boules_de_feu, caisse)
{
    caisse.destroy();
    boules_de_feu.destroy();
    BDF_reload=true;
}
///////////////////////////////////////
//////FONCTIONS RECOLTES ELEMENTS//////
///////////////////////////////////////

function Recolte_Piment(player, piment)
{
    piment.destroy();
    Buta_normal=false;
    Buta_Feu=true;
    Buta_Glace=false;
    Buta_Aile=false;
}

function Recolte_Glace(player, glace)
{
    glace.destroy();
    Buta_normal=false;
    Buta_Glace=true;
    Buta_Feu=false;
    Buta_Aile=false;
}

function Recolte_Poulet(player,poulet)
{
    poulet.destroy();
    Buta_normal=false;
    Buta_Aile=true;
    Buta_Feu=false;
    Buta_Glace=false;
    undefined_jauge=1000;
}

function Recolte_Aliment(player,aliment)
{
    aliment.destroy();
    jauge += 10;
}

function Recolte_Respawn_Poulet(player,respawn_poulet)
{
    Buta_normal=false;
    Buta_Aile=true;
    Buta_Feu=false;
    Buta_Glace=false;
    undefined_jauge=100;
}

function Recolte_Respawn_Glace(player, respawn_glace)
{
    Buta_normal=false;
    Buta_Glace=true;
    Buta_Feu=false;
    Buta_Aile=false;
}
function Recolte_Respawn_Piment(player, respawn_piment)
{
    Buta_normal=false;
    Buta_Feu=true;
    Buta_Glace=false;
    Buta_Aile=false;
}

///////////////////////////////////////
////FIN FONCTIONS RECOLTES ELEMENTS////
///////////////////////////////////////

function Fonction_Ennemi(player,ennemi)
{
    if(ennemi.direction=='Stop')
    {
        doublesaut=true;
        onEnnemis=true;
        jumpCount=0;
        
    }
    else if (invincible == false){
        player_hp = player_hp - 1;
        invincible = true;
        if (player_hp<=0){
            player_hp=0;
            this.physics.pause();
        }   
        setTimeout(function(){invincible = false}, 1000);
    }
    //REGROUPER JumpReset ET FONCTION_ENNEMI

}

function Kill_Ennemi(boules_de_feu,ennemi)
{
    ennemi.destroy();
    boules_de_feu.destroy();
    BDF_reload=true;
}

function Gele_Ennemi(boules_de_glace,ennemi)
{
    boules_de_glace.destroy();
    BDG_reload=true;
    BDG_Touch=true;  
    if(ennemi.movement!== 'Stop' && BDG_Touch==true){
        ennemi.direction='Stop';
        movement=false;
        damageOff=true;
        //ennemi.anims.play('Freeze',false);
        this.physics.add.collider(ennemi, ground);
        this.physics.add.collider(ennemi, caisses);
        this.time.delayedCall(timeoutDelayMovementEnnemi, endStopMovement, [ennemi], this);
    }
}

function endStopMovement(ennemi){ 
    ennemi.direction='RIGHT';
    damageOff=false;
    //ennemi.anims.play('buta_normal_left');
}

function death_Zone_Spawnpoint(){
    console.log("death")
        //player.setPosition(1850, 1350);
            player.x=1850;
            player.y=1350;  
}

function death_Zone_Spawnpoint_2(){
    console.log("death")
        //player.setPosition(1850, 1350);
            player.x=2700;
            player.y=1000;  
}
/* function AnimRoulade(){
    console.log("11")
    player.anims.play('buta_aile_roulade_gauche_charge', true)
} */