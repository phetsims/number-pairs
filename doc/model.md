# Number Pairs - Model Description

@author Marla Schulz (PhET Interactive Simulations)

@author Catherine Carter (PhET Interactive Simulations)

This document is a high-level description of the model used in PhET's *Number Pairs* simulation.

## Overview

The goals of this simulation are to enhance a student's understanding of and fluency in decomposing numbers up to 20 into
two addends, and how two numbers can be put together to create a number up to 20. Multiple linked representations update
dynamically as students interact. The decomposition or sum can be represented using either a traditional number bond
or a proportional bar model. This sim contains 5 screens including: Intro, Ten, Twenty, Sum, and Game.

## Total Scenes

Screens 1-3 contain "scenes," which are the numbers number stack on the right side of sim. The sim saves the total and decomposition 
of each scene when changing representations, which means that changing from kittens to beads, for example, will not change how 
a total number is decomposed. The sim also saves the decomposition when switching between scenes, but does not save the 
location of objects when returning to a scene. This means the exact position of items may be different from how a student 
left it when moving between scenes, but the addends will be remembered between when returning to a previous scene. 
The Sum screen changes this paradigm by not fixing a total number of objects. On the Sum screen, students can continue to explore
different ways to break apart a total, but rather than using a number stack, students add or remove objects 
dynamically, thereby changing the total number of objects that appear in the counting area. Like screens 1-3, the decomposition 
will remain constant when changing representations (beads, kittens, and number line). 


## Counting Area

The counting area is the main space where students can interact with the decomposition of a number. Actions that students 
take in the counting area directly affect the decomposition. Therefore, visualizations of this decomposition update in real 
time in accordion boxes at the top of the screen. This area can also be partially or fully hidden with the eye toggle 
buttons in the corner.

### Organize and Commutative Buttons

There are various controls outside of the counting area that can affect the objects inside the counting area. Two of these include 
the "organize" and "commutative" buttons located to the left of the counting area. The organize button instantly organizes all objects
inside the counting area(s) into ten-frame pattern, meaning the objects will create rows of (up to) 5. The except is the beads,
which are organized into groups of 5 starting from the outside working inward. The "commutative" button swaps addends instantly, 
mirroring the location of objects for the apples (etc.) and beads, and directly swapping each kitten of one color for the other color, 
allowing students to see the commutative property being modeled in real time. The phrase, number bond or bar model, and equation update
dynamically to also reflect changes in decomposition when addends are switched. 

## Representations

There are four main representations a student can access to interact with a total. Each representation provides different
learning goals and perspectives on decomposition or addition. Students interact with objects in the
counting area, and choose the representation within which to explore the decomposition or sum of numbers.
Representations can be switched using the buttons located below the counting area, and all representations are dynamically
linked. This means that when a student changes the addends in one representation, the others automatically update to maintian
consistency between representations.

### Location

In the location representation students can drag counting objects between "left" and "right" halves of the counting area.
As the counting object crosses the boundary between the two halves, the addends change accordingly. There are four contexts
from which students can choose (e.g., apple, butterfly) for the location representation, however there is no difference
in behavior between them. The location-based representations allow students the opportunity to explore the decomposition
of a number by noticing that the value of the addend matches the number of objects in each half of the counting area (i.e. location).

### Attribute

In the attribute representation students can drag blue and yellow kittens throughout the entire counting area. The color of
each kitten can be changed with a toggle that appears when a kitten is selected. In this representation students have
the freedom to organize their kittens in any way they choose since the location of the kitten does not affect the
decomposition of the total. The attribute-based representation allows students the opportunity to explore the decomposition
of a total or how the sum of two numbers can be modeled, by how many objects have the same attribute. For example, using the attribute of
color, the left addend will match the number of yellow kittens while the right addend will match the number of blue kittens,
regardless of their location in the counting area.

When the organize button is pressed (the ten-frame button to the left of the counting area), the behavior is different for the
Ten/Twenty screens and the Sum screen.

* On the Ten and Twenty screens, the kittens will organize into rows of (up to) 5 with the left addend creating rows
  of 5 on the left portion of the counting area. The right addend will create rows of (up to) 5 in the right portion of the counting area,
  creating two separate organized arrays of kittens to explictly model how the total number is decomposed into two addends.
* On the Sum screen, the kittens will combine into a single array of kittens organized into rows of (up to) 5. The left addend will organize
  its yellow kittens first until the quantity is exhaused. Immediately continuing to fill rows, the right addend will complete the rows of
  5 until the total number of blue kittens is exhausted, created a single array in the center of the counting area.

### Beads

The beads act as a transition between location- and attribute- based representations. This combination of attribute and location is done 
by constraining beads to a wire with a divider that creates left and right sections (location). The beads are yellow and blue (attribute), 
and change color when dragged across the divider into the opposite left or right section. Having the beads constrained to a wire shows 
that the total number of beads does not change even though the number of each of color (attribute) can vary.

### Number Line

The number line representation allows students to drag a point along the number line to the left or right to break the total
number apart in many different ways very quickly. As the point is moved, the addends update accordingly. Students have the
option to interact with the number line with or without number labels on the tick marks, with or without addend labels, and with or without 
a jump below the number line that starts at zero and ending at the total. 

Students can also change counting strategies by using a toggle under the counting area, modeling either a "counting on" 
or a "count from zero" strategy. When toggled to the left ("counting on"), one jump is shown. The first addend is labeled above its tick mark 
and the second addend is shown with a jump from the first addend's tick mark to the total. When toggled to the right ("count from zero"), two jumps are shown. 
The first jump starts at zero and ends at the tick mark of the first addend, and the second starting immediately after and ending at the total, showing
the second addend.


## Screen Details

### Intro

The Intro screen allows students to explore a total (less than or equal to 10) by describing the decomposition of that
number based on the location of the counting objects. All representations here are location-based where the context can change
(e.g., apples or butterflies) but the interaction remains constant.

### Ten

The Ten screen allows students to explore a total (less than or equal to 10) by describing the decomposition of that
number based on the unique attributes of a counting object (e.g., color). This screen includes Attribute, Bead, and Number Line
representations.

### Twenty

The Twenty screen combines representations found in the Intro and Ten screens, but changes the total number to explore to be
between 11 and 20. This is the only screen that contains all possible representations in the sim on a single screen.

### Sum

The Sum screen builds upon the previous three screens by providing students the opportunity to determine an unknown
whole number in an implied or explicit addition or subtraction problem relating two whole numbers. In this screen the
number bond and bar model are flipped upside down to model putting two numbers together to create a total. The phrase is also
adjusted to mimic the flip in the number bond (or bar model) to also highlight putting two numbers together. The available representations
on the sum screen are Bead, Kitten, and Number Line.

### Game

The Game screen provides an interactive challenge-based learning experience where students answer arithmetic questions to
test and strengthen their number sense fluency. Unlike the exploration screens (Intro, Ten, Twenty, Sum), the Game screen
presents specific problems that students must solve, tracking their progress with a scoring system and providing immediate
feedback.

#### Challenge Structure

Each challenge is an arithmetic problem of the form `a + b = y` or `y = a + b` where one of the three components (a, b, or y) is missing.
Students must identify the missing value by selecting from a grid of number buttons. The challenge automatically checks
the student's answer and provides feedback:

* **Correct on first try**: Student earns a star (contributes to their score)
* **Correct on subsequent tries**: Challenge is solved but no star is awarded
* **Incorrect**: Student continues with unlimited attempts until they find the correct answer

Students select answers from a grid of number buttons displayed on the right side of the screen. For levels using numbers
0-10, a single column of buttons is shown. For levels using numbers 0-20, two columns are displayed (0-10 on the left,
11-20 on the right).

The color of the number grid changes to match the missing component: yellow for the left addend, blue for the right addend, and 
green for the total. 

#### Level Selection and Progression

The Game screen contains 8 distinct levels, each designed to build upon previously learned concepts. For all levels, 
the counting area can be hidden to encourage mental math. Note that in levels 1, 2, and 5, users can change the 
number bond to be a proportional bar model in the Preferences dialog.

**Level 1 (0-10): Missing addends – Number Bond**
* Practice finding missing addends in number bond format
* Uses kitten representation in the counting area
* Neither addend can be zero (ensures visual representation works well)
* Example: 3 + ? = 7

**Level 2 (10 only): Missing addends – Number Bond with hidden counting area**
* Identical to Level 1, except the total is always 10
* Example: 4 + ? = 10

**Level 3 (10 only): Missing addends – Decomposition Equation**
* Same as Level 2, but shows the decomposition as an equation instead of a number bond
* Example: 10 = 6 + ?

**Level 4 (10 only): Missing addends – Sum Equation**
* Same as Level 3, but the equation is written as a sum rather than decomposition
* Example: 3 + ? = 10

**Level 5 (11-20): Missing addends – Number Bond**
* Extends Level 1 concepts to larger numbers (11-20)
* Example: 7 + ? = 15

**Level 6 (11-20): Missing addends – Decomposition Equation**
* Extends Level 3 concepts to larger numbers (11-20)
* Example: 18 = 12 + ?

**Level 7 (11-20): Missing addend OR total – Sum Equation**
* Increases difficulty by sometimes hiding the total instead of an addend
* Example: 8 + 9 = ? or 8 + ? = 17

**Level 8 (0-20): Missing addends – Number Line**
* Uses number line representation instead of counting objects
* First challenge shows the left addend, subsequent challenges can hide either addend
* Example: ? + 7 = 13

#### Scoring and Rewards

Students accumulate a score (stars) for each level by answering challenges correctly on the first try. When a student
reaches a target score threshold (configurable, default is 10 stars), they unlock a reward celebration featuring animated
objects and a reward dialog. This reward can only be earned once per level during a session.

#### Visual Feedback

The game provides clear visual feedback for student answers:
* **Selected state**: Number button highlights when student selects it
* **Incorrect**: A red "X" mark appears next to incorrect guesses, and those numbers become grayed out (i.e. no longer selectable)
* **Correct**: A green checkmark appears, and the correct answer is revealed in the number bond/equation
* After solving correctly, students can proceed to the next challenge or return to the level selection screen

#### Counting Area Behavior

All levels except Level 8 include a counting area showing kitten representations (Level 8 uses a number line). The counting area
dynamically updates as students select different answer values, allowing them to visualize the arithmetic relationship.
Students can:
* Toggle visibility of the counting area (to practice mental math)
* Organize objects into ten-frame patterns using the organize button
* Interact directly with counting objects (though the answer must be submitted by choosing a number and then pressing "Check")
