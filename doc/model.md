# Number Pairs - Model Description

@author Marla Schulz (PhET Interactive Simulations)

@author Catherine Carter (PhET Interactive Simulations)

This document is a high-level description of the model used in PhET's *Number Pairs* simulation.

## Overview

The goal of this simulation is to enhance a student's understanding and fluency for decomposing numbers up to 20 into
two addends, and how two numbers can be put together to create a number up to 20. Multiple linked representations update
dynamically as students interact. The decomposition or sum can be represented using either a traditional number bond
or a proportional bar model. This sim contains 4 screens including: Intro, Ten, Twenty, and Sum.

## Total Scenes

All screens save the total number of objects shown as a "scene". Meaning, that each exploration
is contained within that total number and the addend values will not change when exploring a different representation
(e.g., changing from kittens to beads will not impact how the total number is decomposed). It is important to note that
the exact position of items may be different from how a student left it when moving between scenes, but the addends will
be remembered between when returning to a previous scene. The Sum screen changes this paradigm by not fixing a total 
number of objects. On the Sum screen, students add or remove objects dynamically, thereby changing the total number 
of objects that appear in the counting area, but the decomposition will remain constant when changing representations (beads, 
kittens, and number line). Students can still interact with and change the addends.


## Counting Area

The counting area is the main space where students can interact with the decomposition of a number. Actions that students 
take in the counting area directly affect the decomposition therefore visualizations of this decomposition update in real 
time in accordion boxes at the top of the screen. This area can also be partially or fully hidden with the eye toggle 
buttons in the corner.

### Organize and Commutative Buttons

There are various controls outside of the counting area that can affect the objects inside the counting area. Two of these include 
the "organize" and "commutative" buttons located to the left of the counting area. The organize button instantly organizes all objects
inside the counting area(s) into ten-frame pattern, meaning the objects will create rows of (up to) 5. The except is the beads,
which are organized into groups of 5 starting from the outside working inward. The "commutative" button swaps addends instantly, 
mirroring the location of objects for the apples (etc.) and beads, and directly swapping each kitten of one color for the other color, 
allowing students to see the commutative property being modeled in real time by switching the addends.

In both cases the objects will also follow the decomposition or sum, always matching the number bond or bar model.

## Representations

There are four main representations a student can access to interact with a total. Each representation provides different
learning goals and perspectives on decomposition or addition. Students interact with objects in the
counting area, and choose the representation within which to explore the decomposition or sum of numbers.
Representations can be switched using the buttons located below the counting area, and all representations are dynamically
linked. This means that when a student changes the addends in one representation, the others automatically update to maintian
consistency between representations.

### Location

In the location representation students can drag counting objects between the "left" and "right" halves of the counting area.
As the counting object crosses the boundary between the two halves, the addends change accordingly. There are four contexts
from which students can choose (e.g., apple, butterfly) for the location representation, however there is no difference
in behavior between them. The location-based representations allow students the opportunity to explore the decomposition
of a number by noticing that the value of the addend matches the number of objects in each location.

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

* On the Ten and Twenty screens, the kittens will organize in rows (max number of objects is 5) with the left addend creating rows
  of 5 on the left portion of the counting area. The right addend will create rows of 5 in the right portion of the counting area,
  creating two separate organized sets of objects to explictly model how the total number is decomposed into two addends.
* On the Sum screen, the kittens will combine into a single set of objects organized into rows of 5. The left addend will organize
  its objects first until the quantity is exhaused. Immediately filling in any empty rows, the right addend will complete the rows of
  5 until the total number of objects is created in the center of the counting area.

### Beads

The beads combine attribute and location by switching colors when they are moved to either side of the wire. Having the
beads constrained to a wire shows that the total number of beads does not change even though the number of each type of
color (attribute) can vary.

### Number Line

The number line representation allows students to drag a point along the number line to the left or right to break the total
number apart in many different ways very quickly. As the point is moved, the addends update accordingly. Students have the
option to interact with the number line with or without number labels on the tick marks and with or without addend labels.
Students can also change where the second addend begins by using a toggle under the counting area. When toggled to the left,
the first addend is labeled above the tick mark (no jump from zero is shown), and the second addend jumps to the total to
model the 'counting on' strategy. When toggled to the right, the first addend starts at zero and displays the jump to its number,
where the second addend starts and jumps to the total to model the 'start from zero' counting strategy.


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

Each challenge is an arithmetic problem of the form `a + b = y` where one of the three components (a, b, or y) is missing.
Students must identify the missing value by selecting from a grid of number buttons. The challenge automatically checks
the student's answer and provides feedback:

* **Correct on first try**: Student earns a star (contributes to their score)
* **Correct on subsequent tries**: Challenge is solved but no star is awarded
* **Incorrect**: Student can continue attempting until they find the correct answer

Students select answers from a grid of number buttons displayed on the right side of the screen. For levels using numbers
0-10, a single column of buttons is shown. For levels using numbers 0-20, two columns are displayed (0-10 on the left,
11-20 on the right).

#### Level Selection and Progression

The Game screen contains 8 distinct levels, each designed to build upon previously learned concepts:

**Level 1 (0-10): Missing addends – Number Bond**
* Practice finding missing addends in number bond format
* Uses kitten representation in the counting area
* Neither addend can be zero (ensures visual representation works well)
* Example: 3 + ? = 7

**Level 2 (10 only): Missing addends – Number Bond with hidden counting area**
* Identical to Level 1, except the total is always 10
* The counting area can be hidden to encourage mental math
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
* Students drag a point on the number line to indicate their answer
* Example: ? + 7 = 13

#### Scoring and Rewards

Students accumulate a score (stars) for each level by answering challenges correctly on the first try. When a student
reaches a target score threshold (configurable, default is 10 stars), they unlock a reward celebration featuring animated
objects and a reward dialog. This reward can only be earned once per level during a session.

#### Visual Feedback

The game provides clear visual feedback for student answers:
* **Selected state**: Number button highlights when student selects it
* **Incorrect**: A red "X" mark appears next to incorrect guesses, and those numbers become grayed out
* **Correct**: A green checkmark appears, and the correct answer is revealed in the number bond/equation
* After solving correctly, students can proceed to the next challenge or reset to try the same problem again

#### Counting Area Behavior

Most levels include a counting area showing kitten representations (Level 8 uses a number line). The counting area
dynamically updates as students select different answer values, allowing them to visualize the arithmetic relationship.
Students can:
* Toggle visibility of the counting area (to practice mental math)
* Organize objects into ten-frame patterns using the organize button
* Interact directly with counting objects (though the answer must be submitted via the number buttons)
* 