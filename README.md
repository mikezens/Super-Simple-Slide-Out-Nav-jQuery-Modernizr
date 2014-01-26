## Super Simple Slide Out Nav

The Slide Out Nav is a micro library, compressed it is only 2kb. I have included my SASS files and examples of the Slide Out Nav.

*Note: Much of what's found here is probably highly-pointed to my needs, fell free to fork and customize away.*

#### Install Instructions
1. Move <code>jquery.slideNav-1.0.js</code> and add script tag to your template.

2. Move <code>/required-libraries/*</code> and add script tags to your template.
	* [jQuery](http://jquery.com/)
	* [Modernizr](http://www.modernizr.com/)
		* Need CSS3 Class Options:
			* CSS 2D Transforms
			* CSS 3D Transforms
			* CSS Transitions

3. Move <code>/css/</code> and add stylesheet tags to your template.

4. Add example HTML to your template.

#### Live Demo

* [My Portfolio Site](http://mikezens-developer.com/)

***

<br />

## Settings

<pre>
'menuButton': '.slide-nav-menu'
// The clickable button to open the slide out nav. Class or ID only.

'menuButtonActive': '-active'
// A specific active class for the clickable button.

'menuClose': '.slide-nav-close'
// The close menu button hidden within the slide out nav. Class or ID only.

'menuOpened': 'slide-nav-opened'
// The CSS3 transform class. You can adjust speed and other settings in the SASS files.

'menuTrasition': 'nav-trasitioned'
// This class is added during transition. It stops users from being able to click twice during transition.

'menuWrapper': '.slide-nav-wrapper'
// The class that wraps the page content. Class or ID only.

'menuWrapperOther': '.slide-nav-bg, .other-class, #other-id' 
// Extra classes that need to transition and clickable when nav is open.  Classes or IDs only.

'removeBodyScrollOnOpen': false 
// This will disable vertical scrolling when the slide out nav is open.
</pre>

***

<br />

## Public Methods

<pre>
loadNav 
// Must be run to load slide out nav

openNav 
// Only opens the slide out nav

toggleNav 
// Toggles the slide out nav open and closed

closeNav 
// Only closes the slide out nav
</pre>

***

## Usage

<pre>
(function($, window) {
    var slideNavRight = $.slideNav();
    slideNavRight.loadNav();
    
    $('.slide-nav ul a').click(function(e) {
        e.preventDefault();
        
        slideNavRight.closeNav();
    });
    
    $('.open-nav').click(function(e) {
        e.preventDefault();
        
        slideNavRight.toggleNav();
    });
})(jQuery, window);
</pre>

***

<br />

## Examples

I have included several examples, please check them out.

***

<br />

## Compatibility

I have done testing with Chrome, Safari, Firefox and IE8+.

The library also works really well in responsive websites.