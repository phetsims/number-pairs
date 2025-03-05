# Number Pairs - Model Description

@author Marla Schulz (PhET Interactive Simulations) Catherine Carter (PhET Interactive Simulations)

This document is a high-level description of the model used in PhET's *Number Pairs* simulation.

## Overview

The goal of this simulation is to enhance a student's understanding and fluency for decomposing numbers up to 20 into
two addends, and how two numbers can be put together to create a number up to 20. Multiple linked representations update
dynamically as students interact. The decomposition or sum can be represented using either a traditional number bond
or a proportional bar model. This sim contains 4 screens including: Intro, Ten, Twenty, and Sum.

## Total Scenes

All screens except for the sum screen save the total number of objects shown as a "scene". Meaning, that each exploration
is contained within that total number and the addend values will not change when exploring a different representation
(e.g., changing from kittens to beads will not impact how the total number is decomposed). It is important to note that
the exact position of items may be different from how a student left it when moving between scenes, but the addends will
be remembered between scenes. The Sum screen changes this paradigm by not fixing a total number of objects. On the Sum screen, students add or remove objects dynamically, thereby changing the total number of objects that appear in the counting area. Students can still interact with and change the addends.


## Counting Area

The counting area is the main space where students can interact with the decomposition of a number. Actions that students take in the counting area directly affect the decomposition therefore visualizations of this decomposition update in real time in accordion boxes at the top of the screen. This area can also be partially or fully hidden with the eye toggle buttons in the corner.

### Organize and Commutative Buttons

There are various controls outside of the counting area that can affect, or decorate the objects inside the counting area. One such control is the "organize button." This button will organize objects into rows five (or groups of five where appropriate).

Additionally, students can also "swap" the addends by using the Commutative Button. This allows students to see the commutative property being modeled in real time by switching the addends.

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
