// Copyright 2024, University of Colorado Boulder

/**
 * ESLint configuration for number-pairs.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Michael Kauzmann (PhET Interactive Simulations)
 */

import simEslintConfig from '../perennial-alias/js/eslint/config/sim.eslint.config.mjs';
import banTSCommentConfig from '../perennial-alias/js/eslint/config/util/banTSCommentConfig.mjs';

export default [
  ...simEslintConfig,
  {
    rules: {
      'phet/todo-should-have-issue': 'off'
    }
  },
  ...banTSCommentConfig
];