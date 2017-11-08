#!/usr/bin/env node
// node native
/* globals require, process, Promise, console */
const https = require( 'https' ), fs = require( 'fs' );
( () => {
  if ( 2 < process.argv.length ) {
    const preset = ( {
      'fr-fr': { in: 'fr-fr', out: 'fr-fr' },
      'fr-jp': { in: 'fr-fr', out: 'ja-jp' }
    } )[ process.argv[ 2 ] ],
      text = encodeURIComponent( process.argv[ 3 ] );
    // get remote file content, save to local file
    function grab( _ = { get: '', save: '' } ) {
      if ( _.get && _.save ) {
        const file = fs.createWriteStream( _.save );
        return new Promise( ( resolve, reject ) => {
          // make sure a response is sent only once
          let bResponseSent = false;
          https.
            get( _.get, res => {
              // TODO: preserve existing file until 'finish'
              // TODO: remove unfinished temp files
              res.pipe( file );
              file.on( 'finish', () => file.close( () => {
                if ( !bResponseSent ) {
                  bResponseSent = true;
                  resolve();
                }
              } ) );
            } ).
            on( 'error', err => {
              if ( !bResponseSent ) {
                bResponseSent = true;
                reject( err );
              }
            } );
        } );
      }
    }
    grab( {
      get: `https://translate.google.com/translate_tts?ie=UTF-8&tl=${preset.out}&client=${preset.in}&q=${text}`,
      save: `../sound-bank/${preset.in.split( '-' )[ 0 ]}-${preset.out.split( '-' )[ 1 ]}/${text}.mp3`
    } ).
      then( res => console.log( 'File updated' ) ).
      catch( e => console.error( e ) );
  }
} )();
