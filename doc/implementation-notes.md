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
users to interact with the decomposition of a total in different ways. The different representations are: location-based
( apples, soccer balls, butterflies, and one cards ), attribute-based ( kittens ), beads, and number line. These
representations are all contained within a rectangle called the "counting area." Inside the counting area users can
interact which each representation by moving or changing "counting objects". Each counting object can become a different
representation, but any data for that representation is still held within the central counting object model.

We use the term "inactive" to describe counting objects that are not currently in the left or right addend arrays. This
term also indicates that the counting objects are not contributing towards data in the model. An array of inactive
counting objects creates a pool that can be pulled from or returned to as counting objects are added or removed.

### Model-View Transform

A model-view transform is used for the beads and number line representations. Both model-view transforms are merely a
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

### Scenes

The Decomposition Screens are the only ones that contain "scenes" in the sim. A scene is a specific total that the user
can explore. Each scene has a unique total, and the left and right addends are mutable. Each scene also tracks which
counting objects are assigned to it through observable arrays. When a scene is selected the counting objects go through
a transition that updates them to the correct addend values according to their assigned array. Scenes do not have a
concept of "inactive" counting objects since the total amount of counting object for the scene never changes.

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
  exploration. Each of these totals is what we refer to as a "scene".
- The `SplitCountingArea` is only found in the decomposition screens as part of the location-based representation. The
  `SplitCountingArea` is divided into two regions (left and right), and as counting objects are moved across the central
  barrier the addend values update accordingly.

## Sum Screen

### Model

See [model.md](https://github.com/phetsims/number-pairs/blob/main/doc/model.md)

`SumModel` is the central model for the "Sum" screen. It does not have any scenes, and unlike the Decomposition Screens
both the `leftAddendProperty` and `totalProperty` are mutable. The `rightAddendProperty` remains derived. There were
many reasons for having the `rightAddendProperty` be derived instead of the `totalProperty`. More details about that
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

## Bead Representation

The Bead Representation is the most complex of all the representations and benefits from more explicit documentation.

The first complication that arises in the Bead Representation is that unlike other representations we save the positions
of the beads from scene to scene. This was a design request, where not having the bead's positions saved created a
jarring experience for the user that we did not find in other representations. One way that we simplified saving the
positions is by only doing so during a scene change. This reduced the amount of calls being made as beads were dragged,
and also reduced the possibility of reentrancy issues.

The second complication is the nature of the bead behavior. The beads need to be draggable individually, but also
drag as a group depending on proximity. Most of this logic is contained in `handleBeadMove` in `BeadsOnWireNode`. This
method ensures that beads do not overlap, stay within the counting area bounds, and update model data as needed
according to each bead's position.

## Game Screen

The Game screen introduces a challenge-based gameplay layer on top of the simulation's existing representation system. Unlike the exploration screens, the Game screen does not use scenes and instead generates challenges dynamically.

### Model

See [model.md](https://github.com/phetsims/number-pairs/blob/main/doc/model.md)

`GameModel` contains an array of 8 `Level` instances, each configured at startup with a challenge type (`bond`, `decompositionEquation`, `sumEquation`, or `numberLine`), input range (`zeroToTen` or `zeroToTwenty`), and a function that generates random `Challenge` instances.

`Challenge` is a simple data class representing `a + b = y` with one component missing. It validates guesses via `isCorrect(guess)`.

`Level` manages state for a single game level including score, current challenge, guessed numbers, and selected guess. It uses `LevelCountingObjectsDelegate` to manage counting objects. The key difference from exploration screens is the **inactive pool pattern**: counting objects exist in three observable arrays (left addend, right addend, and inactive). As the student selects different answers, objects dynamically move between these pools. The delegate uses derived properties to compute addend values from the current challenge and selected guess, then listeners automatically redistribute objects between the arrays. `NumberLineLevel` extends `Level` with additional properties for tick number and addend label visibility.

### View

`GameScreenView` uses a `ToggleNode` to switch between level selection and individual level views, creating level nodes on demand based on type. It manages reward animations via `NumberPairsRewardNode` and `NumberPairsRewardDialog` when the score threshold is reached.

`LevelSelectionNode` displays 8 level buttons in a 2x4 grid using the common-code `LevelSelectionButtonGroup` from the vegas library.

Three level node types extend the base `LevelNode`:
- `BondBarLevelNode` - Shows number bond/bar model with kitten counting area
- `EquationLevelNode` - Shows equation (decomposition or sum format) with kitten counting area
- `NumberLineLevelNode` - Shows interactive number line without traditional counting area

All level nodes share common components: `StatusBar` for level/score display, `AnswerButtonGroup` for number selection with visual feedback (checkmarks, X marks, graying out), and navigation buttons. The `AnswerButtonGroup` uses `BooleanToggleNode` to switch between normal, correct, and incorrect states for each number button.

## PhET-iO

The PhET-iO instrumentation of this simulation is relatively straightforward. All PhetioObjects are created at startup, and
exist for the lifetime of the sim, so there is no sim-specific use of `PhetioGroup` or `PhetioCapsule`. 

`Challenge` instances are created dynamically, and serialized by data-type serialization (see `ChallengeIO`). `Challenge` 
instances are not individually PhET-iO instrumented. 

Another important part of the PhET-iO instrumentation is the use of `ObservableArray`s. The `ObservableArray`s are a 
critical part of state setting and tracking for both sim interactions, and scene changes.

