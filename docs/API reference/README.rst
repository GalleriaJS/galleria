Slide show
..........
- play( [delay] )
- pause()
- next()
- prev()


Manipulation
............
- load( source )
- addElement( element1 [, ..., elementN] )
- remove( element1 [, ..., elementN] )
- append( elemObject )
- appendChild( parentID, childID )
- prependChild( parentID, childID )
- setIndex( index )
- setOptions( key [, value] )
- setCounter( index )
- setInfo( index )


Event methods
.............
- bind( type, fn )
- unbind( type )
- trigger( type )


Retrieving
..........
- get( elemIDs )
- getActiveImage()
- getActiveThumb()
- getMousePosition( event )
- getData( [index] )
- getDataLength()
- getStageHeight()
- getStageWidth()
- getOptions( [key] )


Display extras
..............
- addIdleState( element, styles )
- removeIdleState( element )
- enterIdleMode()
- exitIdleMode()
- enterFullscreen( callback )
- exitFullscreen( callback )
- bindTooltip( elems [, string] )
- defineTooltip( elem, value )
- refreshTooltip( element1 [, ..., elementN] )


Utilities
.........
- hasInfo()
- rescale( width, height, callback )
- $( elemIDs )
- updateCarousel()
- proxy( fn [, scope] )
- attachKeyboard( mapObject )
- detachKeyboard()
