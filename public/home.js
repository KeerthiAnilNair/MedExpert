const navToggler = document.querySelector('.nav-toggler');
const navMenu = document.querySelector('.site-navbar ul');
const navLinks = document.querySelectorAll('.site-navbar a');

// load all event listners
allEventListners();

// functions of all event listners
function allEventListners() {
  // toggler icon click event
  navToggler.addEventListener('click', togglerClick);
  // nav links click event
  navLinks.forEach( elem => elem.addEventListener('click', navLinkClick));
}

// togglerClick function
function togglerClick() {
  navToggler.classList.toggle('toggler-open');
  navMenu.classList.toggle('open');
}

// navLinkClick function
function navLinkClick() {
  if(navMenu.classList.contains('open')) {
    navToggler.click();
  }
}

;(function($) {

  $.fn.letterDrop = function() {
    // Chainability
    return this.each( function() { 
    
    var obj = $( this );
    
    var drop = {
      arr : obj.text().split( '' ),
      
      range : {
        min : 1,
        max : 9
      },
      
      styles : function() {
        var dropDelays = '\n', addCSS;
        
         for ( i = this.range.min; i <= this.range.max; i++ ) {
           dropDelays += '.ld' + i + ' { animation-delay: 1.' + i + 's; }\n';  
         }
        
          addCSS = $( '<style>' + dropDelays + '</style>' );
          $( 'head' ).append( addCSS );
      },
      
      main : function() {
        var dp = 0;
        obj.text( '' );
        
        $.each( this.arr, function( index, value ) {
  
          dp = dp.randomInt( drop.range.min, drop.range.max );
          
          if ( value === ' ' )
            value = '&nbsp'; //Add spaces
          
            obj.append( '<span class="letterDrop ld' + dp + '">' + value + '</span>' );
          
        });
            
      }
    };
     
    Number.prototype.randomInt = function ( min, max ) {
      return Math.floor( Math.random() * ( max - min + 1 ) + min );
    };
    
    
    // Create styles
    drop.styles();
  
  
      // Initialise
      drop.main();
    });
  
  };
  
  }(jQuery));
  
  
  // USAGE
  $( 'h1' ).letterDrop();
  