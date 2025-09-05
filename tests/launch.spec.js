// Copyright 2025, University of Colorado Boulder

/**
 * Test that the number-pairs simulation launches successfully.
 * This test listens for console messages and page errors to determine success or failure.
 *
 * @author Sam Reid (PhET Interactive Simulations)
 */
import { expect, test } from '@playwright/test';

test( 'simulation launches successfully', async ( { page } ) => {
  let errorThrown = false;
  let errorMessage = '';
  let successMessageReceived = false;

  // Set up logging capture in the page BEFORE navigation
  await page.addInitScript( () => {
    window.phetTestLogs = [];
    window.phetTestComplete = false;
    window.phetTestError = false;
    window.phetTestErrorMessage = '';

    const originalLog = console.log;
    console.log = ( ...args ) => {
      const message = args.join( ' ' );
      window.phetTestLogs.push( message );
      if ( message === 'sim launched successfully' ) {
        window.phetTestComplete = true;
      }
      originalLog.apply( console, args );
    };
  } );

  // Listen for console messages
  page.on( 'console', msg => {
    if ( msg.text() === 'sim launched successfully' ) {
      successMessageReceived = true;
    }
  } );

  // Listen for page errors and capture them immediately
  page.on( 'pageerror', error => {
    console.error( 'Page error:', error.message );
    errorThrown = true;
    errorMessage = error.message;
    // Set error flag in page context
    page.evaluate( msg => {
      window.phetTestError = true;
      window.phetTestErrorMessage = msg;
    }, error.message ).catch( () => {} );
  } );

  // Navigate to the simulation
  await page.goto( 'http://localhost/number-pairs/number-pairs_en.html?brand=phet&ea&debugger' );

  // Wait for either success message or error, with fast failure on error
  try {
    await page.waitForFunction(
      () => {
        // Return true if we have success OR if we have an error (to exit immediately)
        return window.phetTestComplete || window.phetTestError;
      },
      {},
      {
        timeout: 25000,
        polling: 100
      }
    );
  }
  catch( timeoutError ) {
    // Timeout occurred - get console messages for debugging
    const allConsoleMessages = await page.evaluate( () => {
      return {
        logs: window.phetTestLogs || [],
        hasError: window.phetTestError,
        errorMessage: window.phetTestErrorMessage
      };
    } );
    console.log( 'Timeout waiting for simulation. State:', allConsoleMessages );
    throw new Error( 'Timeout waiting for simulation to complete' );
  }

  // Check what happened
  const finalState = await page.evaluate( () => {
    return {
      hasSuccessMessage: window.phetTestComplete,
      hasError: window.phetTestError,
      errorMessage: window.phetTestErrorMessage,
      allLogs: window.phetTestLogs || []
    };
  } );

  // If there was an error, fail immediately with the error message
  if ( errorThrown || finalState.hasError ) {
    const error = errorMessage || finalState.errorMessage || 'Unknown error occurred';
    throw new Error( `Simulation failed with error: ${error}` );
  }

  // Assert success
  expect( finalState.hasSuccessMessage || successMessageReceived ).toBe( true );
} );