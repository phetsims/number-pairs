# Number Pairs - Model Description

@author Marla Schulz (PhET Interactive Simulations)

This document is a high-level description of the model used in PhET's *Number Pairs* simulation.

## Overview

The goal of this simulation is to enhance a student's understanding and fluency for decomposing numbers up to 20 into 
two addends and how two numbers can be put together to create a number up to 20. Multiple linked representations update 
dynamically as students interact. This sim contains 4 screens including: Intro, Ten, Twenty, and Sum.

## Total Scenes

All screens except for the sum screen save the total number of objects shown as a "scene," meaning that each exploration
is contained within that total number and the addend values will not change when exploring a different representation 
(e.g., changing from kittens to beads will not impact how the total number is decomposed). It is important to note that 
the exact position of items may be different from how a student left it when moving between scenes, but the addends will 
be remembered when moving between scenes. The sum screen changes this paradigm by allowing students to add and 
subtract objects to and from the counting area, thereby changing the total number of objects on the screen. Therefore, the sum 
screen does not have any "scenes" or features that preserves the addends as the total changes.

## Representations

There are four main representations a student has to interact with a total. Each representation provides different
learning goals and perspective on decomposition or addition. Students interact with the representation type in the 
"counting area". Representations can be switched using the radio button group located below the counting area, and 
all representations are dynamically linked. This means that when a student changes the addends in one representation,
the others automatically update to maintian consistency between representations.

### Location

In the location representation students can drag counting objects to the "left" or "right" halves of the counting area. As
the counting object crosses the boundary between the two halves, the addends change accordingly. There are four contexts
from which students can choose (e.g., apple, butterfly) for the location representation, however there is no difference 
in behavior between them.

### Attribute

In the attribute representation students can drag blue and yellow kittens throughout the entire counting area. The color of
each kitten can be changed with a toggle that appears when a kitten is selected. In this representation students have
the freedom to organize their kittens in any way they choose since the location of the kitten does not affect the
decomposition of the total.

### Beads

The beads combine attribute and location by switching colors when they are moved to either side of the wire. Having the
beads constrained to a wire shows that the total number of beads does not change even though the number of each type of
color (attribute) can vary.

### Number Line

The number line representation allows students to drag a point along the number line to the left or right. As the point
moves the addends update accordingly. Students have the option to interact with the number line with or without number
labels on the tick marks and with or without addend labels. Students can also change where the second addend begins using a 
toggle under the counting area. When toggled to the left, the first addend is labeled above the tick mark and the second addend
jumps to the total, modeling the 'counting on' strategy. When toggled to the right, the first addend starts and zero 
and jumps to its number where the second addend starts and jumps to the total, modeling the 'start from zero' counting strategy. 

## Intro

The Intro screen allows students to explore a total (less than or equal to 10) by describing the decomposition of that
number based on the location of the counting objects. All representations here are location based where the context can change
but the interaction remains constant.

## Ten

The Ten screen allows students to explore a total (less than or equal to 10) by describing the decomposition of that
number based on the unique attributes of a counting object. This screen includes Attribute, Bead, and Number Line
representations.

## Twenty

The Twenty screen combines representations found in the Intro and Ten screens, but changes the total number to explore to be
between 11 and 20. This is the only screen that contains all possible representations in the sim.

## Sum

The Sum screen builds upon the previous three screens by providing students the opportunity to determine an unknown
whole number in an implied or explicit addition or subtraction problem relating three whole numbers. In this screen the
number bond and bar model are flipped upside down to model putting two numbers together to create a total. The phrase is also 
adjusted to mimic the flip in the number bond (or bar model) to also highlight putting two numbers together. The available representations
on the Sum screen are Bead, Kittens, and Number Line.
