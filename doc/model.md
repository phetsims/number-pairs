# Number Pairs - Model Description

@author Marla Schulz (PhET Interactive Simulations)

This document is a high-level description of the model used in PhET's *Number Pairs* simulation.

## Overview

The goal of this simulation is to enhance a student's understanding of decomposing numbers less than or equal to 10 and
20 with multiple dynamically linked representations. This sim includes 4 screens including: Intro, Ten, Twenty, and Sum.

## Total Scenes

All screens except for the sum screen save the total as a "scene", meaning that each exploration is contained within
that total number and the addend values will not be changed when exploring a different total scene. It is important to
note that the exact position of items may be different from how a student left it, but the decomposition of the total
will remain. The sum screen changes this paradigm by allowing students to add and subtract from the counting area
representation. Therefore, the sum screen does not have any "scenes" or features that preserves the decomposition as the
total changes.

## Representations

There are four main representations a student has to interact with a total. Each representation provides different
learning goals and perspective on decomposition. Students interact with the representation in the "counting area".
Representations can be switched below the counting area and all representations are dynamically linked. This means that
a change a student makes in one representation will automatically apply to the other representations keeping the
exploration consistent between the representations.

### Location

In the location representation students can drag counting objects to the "left" or "right" ends of the counting area. As
the counting object crosses the boundary between the two sides the addends change accordingly. There are many images
that students can choose between for the location representation, however there is no difference in behavior between
them.

### Attribute

In the attribute representation students can drag blue and yellow kittens throughout the counting area. The color of
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
labels on the tick marks and jumps.

## Intro

The Intro screen allows students to explore a total (less than or equal to 10) by describing the decomposition of that
number based on the location of the counting objects. All representations here are location based and only the image
changes, not the interaction.

## Ten

The Ten screen allows students to explore a total (less than or equal to 10) by describing the decomposition of that
number based on the unique attributes of a counting object. This screen includes Attribute, Bead, and Number Line
representations.

## Twenty

The twenty screen combines representations found in the Intro and Ten screens, while giving the students the opportunity
to explore totals from 11 through 20. This is the only screen that contains all possible representations in the sim.

## Sum

The Sum screen builds upon the previous three screens by providing students the opportunity to determine an unknown
whole number in an implied or explicit addition or subtraction problem relating three whole numbers. In this screen the
number bond and bar model are flipped upside down and the phrase is also adjusted to put the total at the end of the
phrase instead of at the beginning.
