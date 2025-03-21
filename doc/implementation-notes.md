# Number Pairs - Implementation Notes

@author Marla Schulz (PhET Interactive Simulations)

## Introduction

This document contains notes related to the implementation of the "Number Pairs" simulation. This is not an
exhaustive description of the implementation. The intention is to provide a concise high-level overview, and to
supplement the internal documentation (source code comments) and external documentation (design documents).

Before reading this document, please read:

- [model.md](https://github.com/phetsims/number-pairs/blob/main/doc/model.md), a high-level description of the
  simulation model.

## General Considerations

### Terminology

This sim uses different representations referred to as `RepresentationType` in the code. Each representation allows
users to interact with the decomposition of a total in different ways. The different representations are: location
based ( apples, one cards, soccer balls, and butterflies ), attribute based ( kittens ), beads, and number line. These
representations are all contained within a rectangle called the "counting area." Inside the counting area users can
interact which each representation by moving or changing "counting objects". Each counting object can become a different
representation but any data for that representation is still held within the central counting object model.

### Model-View Transform

A model-view transform is used for the beads and number line representations. Both model view transforms are merely a
linear function mapping integer values to the required width of view elements. It was necessary to use the more
heavyweight model-view transform in order to satisfy the API of keyboard and drag listeners, as well as slider in the
case of the number line.

### Memory Management

- Static Allocation: All objects in this sim are allocated at startup and exist for the lifetime of the simulation.
- Listeners: Unless otherwise noted in the code, all uses of link, `addListener`, etc. do NOT need a corresponding
  `unlink`, `removeListener`, etc.

## Decomposition Screens

The first three screens ( "Intro", "Ten", and "Twenty" ) all use the `DecompositionModel` and `DecompositionScreenView`.
Each subclass then defines which representations and total range will be applicable to each screen.

### Model

See [model.md](https://github.com/phetsims/number-pairs/blob/main/doc/model.md)

The central model for the decomposition screens ( "Intro", "Ten", "Twenty" ) is `DecompositionModel`.
`DecompositionModel` contains an array of `NumberPairsScene` that tracks the decomposition of a static total
across a left and right addend. The `leftAddendProperty` is mutable, while `total` is set at startup and readonly, and
`rightAddendProperty` is derived from their difference. This means that all changes to the decomposition of a scene's
total go through the `leftAddendProperty` first before updating the value of the `rightAddendProperty`.

The only representation in which position Properties are tracked between scenes is for the Beads. All other position
Properties are calculated during scene change to maintain as much visual consistency during the change, while also
avoiding overlapping counting objects.

### View

- In
  [DecompositionScreenView](https://github.com/phetsims/number-pairs/blob/main/js/intro/view/DecompositionScreenView.ts),
  `SceneSelectionRadioButtonGroup`
  defines the different totals that a user can explore in a sim and allows users to switch between each total
  exploration.
- The `SplitCountingArea` is only found in the decomposition screens as part of the location representation. The
  `SplitCountingArea` is divided into two regions (left and right), and as counting objects are moved across the central
  barrier the addend values update accordingly.

## Sum Screen

### Model

See [model.md](https://github.com/phetsims/number-pairs/blob/main/doc/model.md)

`SumModel` is the central model for the "Sum" screen. It does not have any scenes, and unlike the Decomposition Screens
both the `leftAddendProperty` and `totalProperty` are mutable. The `rightAddendProperty` remains derived. There were
many reasons for having the `rightAddendProperty` be derived instead of the `totalProperty`. More detail about that
decision can be found in this [issue](https://github.com/phetsims/number-pairs/issues/17).

Due to the intertwined nature of the addends and the total, as well as the fact that now two of the three number
Properties are mutable, there are various places where listener order dependency and reentrancy are needed. Many
Properties are defined with `listenerOrderDependency: true`. Once these relationships were truly tested it became clear
that listener order dependency was an important part of this simulation and explicitly stating that would best for
efficient development and legibility, rather than trying to refactor or restructure the code to avoid such limitations.

### View

In [SumScreenView](https://github.com/phetsims/number-pairs/blob/main/js/intro/view/SumScreenView.ts),
`AddendControlPanel` creates a custom UI component that resembles a Number Spinner. Due to the intertwined nature of the
addend and total number Properties, we were unable to use a common code Number Spinner. This UI component implements
its own sound and keyboard input to mimic a Number Spinner while complying with the necessary API for the sim.

## PhET-iO

The PhET-iO instrumentation of this simulation is relatively straightforward. Everything is created at startup, and
exists for the lifetime of the sim, so there is no sim-specific use of `PhetioGroup` or `PhetioCapsule`. Another
important part of the phet-io instrumentation is the use of `ObservableArray`s. The `ObservableArray`s are a critical
part of state setting and tracking for both sim interactions, and scene changes.
