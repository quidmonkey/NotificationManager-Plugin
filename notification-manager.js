ig.module(
    'plugins.notification-manager'
)
.requires(
    'impact.font',
    'impact.impact'
)
.defines(function(){

ig.NotificationManager = ig.Class.extend({
        
    notes: [],              //notification queue
    
    init: function(){},
    
    //adds a note to the queue
    add: function ( note ){
        this.notes.push( note );
    },

    //draw all notes in queue
    draw: function() {
        for( var i = 0; i < this.notes.length; i++ ) {
            this.notes[i].draw();
        }
    },

    //finds and returns a note by a specified text
    //if note doesn't exist, returns undefined
    find: function( text ){
        for( var i = 0; i < this.notes.length; i++ ){
            if( this.notes[i].text === text ){
                return this.notes[i];
            }
        }
        return undefined;
    },

    //remove note from queue
    remove: function( note ){
        this.notes.erase( note );
    },
    
    //creates a new note and adds it to the queue
    spawn: function( font, text, x, y, settings) {
        this.add( new ig.Notification( font, text, x, y, settings ) );
    },
    
    //update all notes in queue
    update: function() {
        for( var i = this.notes.length ; i--; i ) {
            this.notes[i].update();
            
            //if note is dead, erase it
            if( this.notes[i]._kill ) {
                this.notes.splice(i, 1);
            }
        }
    }
    
});

ig.Notification = ig.Class.extend({
    
    align: ig.Font.ALIGN.LEFT,      //font alignment, defaults to left
    alpha: 1,                       //opacity, 0 = translucent, 1 = opaque
    entity: null,                   //attached entity
    fadetime: 0.4,                  //how long until note begins to fade
    font: null,                     //font
    lifetime: 1.2,                  //how long notification should last, set to zero to disable fade
    _kill: false,                   //kill note?
    pos: { x: null, y: null },      //position
    text: '',                       //string to draw
    vel: { x: 0, y: -20 },          //velocity - set to 0 if font doesn't move
    entityOffset: {                       //notification is centered over entity's top center, this offsets the notifications position 
        x: 0,
        y: 10
    },
        
    init: function( font, text, x, y, settings ) {
        if( font instanceof ig.Font ){
            this.font = font;
        }
        else{
            this.font = new ig.Font( font );
        }
        this.text = text;
        this.pos.x = x;
        this.pos.y = y;
        ig.merge( this, settings );
        if( this.lifetime === 0 ){
            this.fadetime = false;
        }
        else{
            this.fadetime -= this.lifetime;
        }
        this.lifetime = new ig.Timer( this.lifetime );
    },
    
    //takes two optional parameters
    //align is the font alignment
    //text is the string to draw
    //both are useful if the note is being drawn
    //without the use of the NotificationManager
    draw: function( align, text ){
        //cache alpha
        var alpha = this.font.alpha;
        this.font.alpha = this.alpha;

        //draw font
        this.font.draw( text || this.text,
                        //ig.system.getDrawPos( this.pos.x - ig.game.screen.x ),
                        //ig.system.getDrawPos( this.pos.y - ig.game.screen.y ),
                        this.pos.x,
                        this.pos.y,
                        align || this.align );
        
        //restore alpha
        this.font.alpha = alpha;
    },

    //sets an entity to follow
    //takes entity as parameter
    follow: function( ent ){
        this.entity = ent;
    },

    //stops following an entity & sets new vel
    //takes two optional parameters
    //x specifies a new x vel
    //y specifies a new y vel
    setVel: function( x, y ){
        this.entity = null;
        this.vel.x = x || 0;
        this.vel.y = y || 0;
    },
    
    update: function() {
        //if following an entity, update vel
        if( this.entity !== null ){
            this.pos.x = this.entity.pos.x + this.entity.size.x / 2 - this.font.widthForString(this.text) / 2 + this.entityOffset.x;
            this.pos.y = this.entity.pos.y + this.entity.size.y / 2 - this.font.heightForString(this.text) - this.entityOffset.y;
        }
        else{
            this.pos.x += this.vel.x * ig.system.tick;
            this.pos.y += this.vel.y * ig.system.tick;
        }

        //if fading is turned off
        if( !this.fadetime ){
            return;
        }
        
        //fade
        var delta = this.lifetime.delta();
        if( delta > 0 ) {
            this._kill = true;
        }
        else{
            this.alpha = delta.map( this.fadetime, 0, 1, 0 );
        }
    }
    
});

});