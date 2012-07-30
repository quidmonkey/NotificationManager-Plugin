ig.module(
    'plugins.notification-manager'
)
.requires(
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
    fadetime: 0.4,                  //how long until note begins to fade
    font: null,            	        //font
    lifetime: 1.2,                  //how long notification should last, set to zero to disable fade
    _kill: false,                   //kill note?
    pos: { x: null, y: null },      //position
    text: '',                       //string to draw
    vel: { x: 0, y: -20 },          //velocity - set to 0 if font doesn't move

        
    init: function( font, text, x, y, settings ) {
        this.font =  font;
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
        //set canvas alpha for fade effect
        var ctx = ig.system.context, alpha = ctx.alpha;
        ctx.globalAlpha = this.alpha;
        
        //draw font
        this.font.draw( text || this.text,
                        ig.system.getDrawPos( this.pos.x - ig.game.screen.x ),
                        ig.system.getDrawPos( this.pos.y - ig.game.screen.y ),
                        align || this.align );
        
        //reset canvas alpha
        ctx.globalAlpha = alpha;
    },
    
    update: function() {
        //update position
        this.pos.x += this.vel.x * ig.system.tick;
        this.pos.y += this.vel.y * ig.system.tick;
        
        //if fading is turned off
        if( !this.fadetime ){
            return;
        }
        
        //fade
        var delta = this.lifetime.delta();
        if( delta > 0 ) {
            this._kill = true;
            return;
        }
        else{
            this.alpha = delta.map( this.fadetime, 0, 1, 0 );
        }
    }
    
});

});