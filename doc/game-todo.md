**General description for all levels**  
Randomly generated settings ([type D.2 game](https://docs.google.com/document/d/14BNBrokYt1OI2Y7lzjhkAP2aSnEfBh7xBW868ss2spg/edit#heading=h.cnlkqzqciwrv) → means an infinite number of randomly-generated challenges)

* For all levels
  * Infinite challenges randomly generated
  * \+1 star on first try correct only
  * Total number of stars are remembered and displayed on game selection screen (like [Number Play](https://phet.colorado.edu/sims/html/number-play/latest/number-play_all.html?screens=3))
  * The randomly chosen numbers follow: a ≤ y and  b ≤ y, a+b=y, and y ≤ 10 or 20
    * Note: it’s possible for the user to choose an illogical number. For example, if y is randomly chosen to be 5 and a is 2, the user can select a value for b greater than 3\. That’s ok if it’s the user’s choice.
  * All game levels except the number line have an interactive area and a ten frame (organize) button

* Number bonds
  * Form:
  * y is the top
  * a and b are the addends, which are also the numbers the sum decomposes into
  * y, a, and b are positive integers taking on values 0, 1, …, 20
  * First challenge will not have y=0, a=0, or b=0
  * y will be randomly assigned a number, and its decomposition randomly chosen. Either a or b will be randomly chosen to be displayed while the other addend is the number users will choose
    * Example:  y is randomly assigned 9\. The decomposition is randomly chosen to be 7 and 2\. b is chosen to be displayed (2), so the number bond will look like:



* Decomposition equations
  * Form: y=a+b
  * a and b are the addends, which are also the numbers *y* decomposes into
  * y, a, and b are positive integers taking on values 0, 1, …, 20
  * First challenge will not have y=0, a=0, or b=0
  * y will be randomly assigned a number, and its decomposition randomly chosen. Either a or b will be randomly chosen to be displayed while the other addend is the number users will choose
    * Example:  y is randomly assigned 9\. The decomposition is randomly chosen to be 7 and 2\. b is chosen to be displayed (2), so the equation will look like: 9=?+2



* Sum equations
  * Will be in the form of a+b=y
  * y, a, and b are positive integers taking on values 0, 1, …, 20
  * First challenge will not have y=0, a=0, or b=0
  * y, a or  will be randomly assigned a number, and its decomposition randomly chosen. One of the remaining letters will have a value while the other will be solved by the user.
    * Example:  y is randomly assigned 9\. The decomposition is randomly chosen to be 7 and 2\. a and b are chosen to be displayed, so the equation will look like: 7 \+ 2= ?

## Game – Outstanding Questions or Changes to Description Below

* Eye toggle was designed to be on all levels except level 1
  * Ok to add eye toggle to level 1 if it’s easier in code
* Number bond in mockups shows missing addend with solid border
  * Should be dotted and a grey color (pending color contrast checking)
  * ![][image166]
* Incorrect outline in number bond shows solid in mockups, but should be dotted
  * ![][image167]
* Assuming preferences choice of bar model versus number bond will also apply to game?
  * If so, the missing addend border will match description below of dotted
  * ![][image168]![][image169]

## Mockups & Description of each level:

* Game screen
  * Set up logic in game so the very first challenge on any given screen never has an addend of zero, and the total is never zero (first challenge only)


### Level 1 (0-10) Missing addends – fluency facts

* See [number bonds logic](#heading=h.oxvb2sjy8v23) above
* The user has as many chances as there are buttons at the bottom (numbers)
* Kittens can be moved and organized, but not change color
* User chooses a number to replace the “?” in the number bond
* If correct on the first try, user gets a \+1 star and can move to the next level
* Otherwise, the following pattern is used (see example below)  
  ![][image170]


**Example**:

* Challenge: Total of 8 shown, left addend of 3 shown, right addend unknown and shows “?” (challenge is for user to find the correct missing addend)
* The user selects 6
  * 6 blue kittens appear on the screen in random locations
  * Right addend is replaced with the number 6
  * Line remains dotted from total to missing addend
* The selected number button (6 in this case) changes color (matches the color of the addend but with a slightly different hue – hex code tbd after color contrast checking happens) to indicate it has been depressed, but the user can organize the kittens, change the number of them, or move them prior to pressing “Check”  
  ![][image171]


* The user presses “Check” to find the choice was incorrect
* Visual changes (see image below)
  * A red “x” appears near the number bond to indicate an incorrect choice near the incorrect addend in the number bond
  * in the number bond, the incorrect addend has a red outline to visually indicate what the red “x” is referring to (\*\* should remain dotted)
  * The “Check” button is disabled, and the chosen number button (6) turns grey (disabled) to indicate it is no longer an option to choose for the number bond game
  * The ten frame is always enabled and interactive with feedback
  * Kittens are always interactive	![][image172]

* The user chooses another number (8). At that moment:
  * The red outline on the number bond returns to a normal outline (dotted)
  * The line from the total number (8) to the addend being chosen remains dotted
  * The “Check” button becomes enabled to indicate you can check your work again
  * The right addend in the number bond matches the choice (8)
  * Eight blue kittens are now in the counting area
  * The number “8” button has changed color (matching the missing addend) to indicate what has been chosen, but is still enabled if a different number is chosen prior to pressing “check.” If the user does press a different number, the “8” button will return to a choose-able color/look
* Kittens are always interactive, as is ten-frame button  
  ![][image173]

* In the image below, the user has pressed “Check” and the ten-frame button (in either order – the result shown below will be the same)
* The follow visual changes occur:
  * a red “x” appears near the number in the number bond
  * the outline around the incorrect right addend is red and has a thicker stroke
  * the “Check” button greys out as the user decides what number to choose next
  * the “8” button changes to disabled to indicate 8 is no longer a choice
  * **Note**: since this is a decomposition challenge level, the ten-frame button organizes the kittens into rows of 5 on the left and right (rather than a single ten frame formation in the center)

  ![][image174]


* The user chooses “5”   
  ![][image175]
* The visual changes made:
  * outline around the right addend changes back to “normal” (grey and dotted)
  * the “check” button is enabled
  * the “5” button indicates it has been pressed but still changeable
  * three kittens have been removed
  * The user presses “check”

* Visual changes (see image below)
  * a green checkmark appears near the number bond
  * the line from 8 to 5 turns to a thicker stroke and changes to a solid line
  * the outline around the addend turns black (\*\* should be thicker as well)
  * the “check” button turns to an arrow to indicate “next problem”
  * \*\* the correct number button at the bottom turns a color to indicate correctness. Below shows green, but this might be confusing since the “total” circle is green. Probably should match the missing addend color.
  * all other numbers at the bottom all grey out

  ![][image176]


### Level 2 (total is 10 only): missing addend \- 10 only – counting area can be hidden

* Identical to level 1 with the following exceptions
  * The value of y is always 10
  * The counting area can be hidden
* Starting state is the counting area visible  
  ![][image177]
* Shown with counting area hidden  
  ![][image178]


### Level 3 (10 only): Missing addends: Equation (10 only)

* Identical to level 2, except the representation of the decomposition is an equation
* See logic for [decomposition equations](#heading=h.ukjqs5rtjvn8)
* Note: Missing addend should have a dotted border (the mockups do not have this)
* ![][image179]  
  ![][image180]  
  ![][image181]


### Level 4 (10 only): missing addend, sum equation

* Identical to Level 3, except the equation is flipped to represent a sum rather than a decomposition
* See logic for [sum equations](#heading=h.o9d55p201mw3)  
  ![][image182]  
  ![][image183]


### Level 5 (11-20): missing addend with number bond, promotes fact fluency

* Uses game logic for [number bond](#heading=h.oxvb2sjy8v23), where y is any number between 11-20
* Ten frame (organize) button organizes into separate locations since this is a decomposition screen  
  ![][image184]


### Level 6 (11-20): missing addend with decomposition equation

* See logic for [decomposition equation](https://docs.google.com/document/d/1flSZAAlRbpN9OdGkYBMQ6HYyCsp31ruLrAm52y-_m1w/edit?pli=1#heading=h.ukjqs5rtjvn8)
* Ten frame (organize) button organizes into two separate ten frames on left/right since this is decomposition  
  ![][image185]


### Level 7 (11-20): missing addend or total, sum equation only, fact fluency

* See logic for [sum equations](https://docs.google.com/document/d/1flSZAAlRbpN9OdGkYBMQ6HYyCsp31ruLrAm52y-_m1w/edit?pli=1#heading=h.o9d55p201mw3)
* Ten frame (organize) button arranges into a single ten frame in the center of the field since this is a “combine” or sum skill
* The missing component could be either addend or the total (i.e. any of a, b, or y could be missing)
* Value range for y is from 11-20
* Example of the left addend missing  
  ![][image186]


* Example of the right addend missing  
  ![][image187]


* Example of the total missing  
  ![][image188]


* Example of the ten frame button being pressed  
  ![][image189]

### Level 8 (0-20): missing both addends, fact fluency,

* See logic for [sum equations](#heading=h.o9d55p201mw3)
* First challenge: left addend known, right addend unknown
* Subsequent challenges could be the left or the right addend (not the total)
* **Example** of starting state when left addend is chosen to be missing (not the first challenge)  
  ![][image190]
  * The user choses 6, presses the Tick Numbers checkbox, and sees the following:
    * The jump arrow for the left addend is dotted
    * The distance of the 11 arrow never changes and is solid

    ![][image191]

  * The user presses “Check”  
    ![][image192]
  * The user chooses 5 and unchecks the tick numbers checkbox  
    ![][image193]
  * The user presses “check”
    * The dotted jump turns to solid and has a thicker stroke
    * The correct number turns green while the others turn grey (disabled)

    ![][image194]



* **Example** of when the right addend is missing

  ![][image195]

  * The user presses 9  
    ![][image196]
  * Then presses “Check”  
    ![][image197]
  * The user presses the correct number (11)  
    ![][image198]
  * The presses “Check”  
    ![][image199]



[image166]: ./images/image166.png

[image167]: ./images/image167.png

[image168]: ./images/image168.png

[image169]: ./images/image169.png

[image170]: ./images/image170.png

[image171]: ./images/image171.png

[image172]: ./images/image172.png

[image173]: ./images/image173.png

[image174]: ./images/image174.png

[image175]: ./images/image175.png

[image176]: ./images/image176.png

[image177]: ./images/image177.png

[image178]: ./images/image178.png

[image179]: ./images/image179.png

[image180]: ./images/image180.png

[image181]: ./images/image181.png

[image182]: ./images/image182.png

[image183]: ./images/image183.png

[image184]: ./images/image184.png

[image185]: ./images/image185.png

[image186]: ./images/image186.png

[image187]: ./images/image187.png

[image188]: ./images/image188.png

[image189]: ./images/image189.png

[image190]: ./images/image190.png

[image191]: ./images/image191.png

[image192]: ./images/image192.png

[image193]: ./images/image193.png

[image194]: ./images/image194.png

[image195]: ./images/image195.png

[image196]: ./images/image196.png

[image197]: ./images/image197.png

[image198]: ./images/image198.png

[image199]: ./images/image199.png
