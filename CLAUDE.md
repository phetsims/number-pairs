# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## PhET Project Overview

This is the "Number Pairs" simulation repository, part of the PhET Interactive Simulations project. This is NOT a
conventional monorepo - it's one of over 150 repositories that work together as siblings in the PhET ecosystem.

## Architecture Overview

### Screen Structure

The simulation contains 5 screens (4 active):

- **IntroScreen** (`js/intro/`) - Explores totals ≤10 using location-based representations (apples, butterflies, etc.)
- **TenScreen** (`js/ten/`) - Explores totals ≤10 using attribute, bead, and number line representations
- **TwentyScreen** (`js/twenty/`) - Explores totals 11-20 with all representations combined
- **SumScreen** (`js/sum/`) - Dynamic addition where students can change both addends and total
- **GameScreen** (`js/game/`) - Currently disabled, on hold for PhET-iO design

### Model-View Architecture

#### Core Models

- **`NumberPairsModel`** (`js/common/model/NumberPairsModel.ts`) - Base model with addends, totals, counting objects,
  and representation types
- **`DecompositionModel`** - Used by Intro/Ten/Twenty screens for fixed-total exploration with scenes
- **`SumModel`** - Used by Sum screen where both addends and total are mutable
- **`NumberPairsScene`** - Represents exploration of a specific total with left/right addends

#### Key Model Concepts

- **Counting Objects** (`CountingObject.ts`) - Core interactive elements with multiple position Properties for different
  representations
- **Representation Types** (`RepresentationType.ts`) - Location-based (apples, butterflies), attribute-based (kittens),
  beads, number line
- **Addend Types** - LEFT, RIGHT, INACTIVE (pooled objects not contributing to decomposition)
- **Scenes** - Fixed totals that maintain addend values when switching representations (except Sum screen)

### Data Flow Patterns

#### Observer Pattern with Properties

All model state uses PhET's Property system from axon:

```typescript
this.leftAddendProperty = new NumberProperty(5);
this.totalProperty = new DerivedProperty([leftAddendProperty, rightAddendProperty], (left, right) => left + right);

// Always unlink to prevent memory leaks
const listener = value => { /* ... */ };
property.link(listener);
// Later: property.unlink(listener);
```

#### Observable Arrays

Counting objects are managed through ObservableArrays that automatically sync with model Properties:

- `leftAddendCountingObjectsProperty`
- `rightAddendCountingObjectsProperty`
- `inactiveCountingObjects` (pooled objects)

## Development Commands

### TypeScript Development

```bash
# REQUIRED: Transpile TypeScript to JavaScript (run from this repo directory)
grunt output-js-project --live    # Watch mode for development

# Type checking
grunt type-check

# Linting
grunt lint                         # Check for lint errors  
grunt lint --fix                   # Auto-fix lint errors
```

### Testing & Building

```bash
# No built-in test suite found - this repo relies on PhET's broader testing infrastructure

# Building (run from this repo directory)
grunt                              # Default build for phet brand
grunt --brands=adapted-from-phet   # Build for specific brand
grunt --brands=phet,phet-io        # Build multiple brands
```

### Development Server

```bash
# From chipper/ directory (build tools repo)
grunt dev-server                   # Modern development server across all repos
```

## Key Implementation Details

### Memory Management

- **Static Allocation**: All objects created at startup and exist for simulation lifetime
- **No Dynamic Creation**: No use of `PhetioGroup` or `PhetioCapsule`
- **Critical**: Always unlink Property listeners to prevent memory leaks

### Complex Interactions

#### Bead Representation

- Most complex representation with position saving between scenes
- Beads drag individually but move as groups based on proximity
- Complex collision detection and boundary constraints in `BeadsOnWireNode`

#### Addend Swapping

The `swapAddends()` method demonstrates sophisticated coordination:

- Swaps model values while preserving visual continuity
- Different position calculation strategies per representation type
- Animation system for smooth transitions

#### Scene Management

- Scene changes trigger coordinated updates across all representations
- Position Properties maintained differently per representation (beads save positions, others recalculate)
- Observable array synchronization during transitions

### Listener Order Dependencies

Due to intertwined addend/total relationships, many Properties use `listenerOrderDependency: true`. This is intentional
and necessary for proper firing order.

## File Organization Patterns

### Common Structure

- `js/common/model/` - Shared model classes
- `js/common/view/` - Shared view components
- `js/[screen]/model/` - Screen-specific models
- `js/[screen]/view/` - Screen-specific views

### Key Files

- `number-pairs-main.ts` - Sim entry point with screen initialization
- `NumberPairsConstants.ts` - Layout bounds, colors, ranges
- `NumberPairsQueryParameters.ts` - URL parameter definitions
- `NumberPairsStrings.ts` - Internationalization strings

## PhET-iO Integration

- Extensive instrumentation for external control
- Observable arrays critical for state setting/tracking
- All objects instrumented with tandem system for external access

## VERY IMPORTANT - i18n

- Ground truth strings in ./number-pairs-strings_en.yaml. This is a mixture of YAML for structure and Mozilla Fluent for
  string formatting. Note fluent is used under the `a11y` keys.
- After changing a string in the yaml, `grunt modulify --targets=strings` updates the JSON/TypeScript files accordingly.
- 