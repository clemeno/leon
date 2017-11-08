#!/usr/bin/env node
// usage:
// node cache-update-tts.js preset "text"
// will put the result in ../sound-bank/preset/filenameText.mp3
// es/node natives
/* globals require, process, Promise, console */
// import node natives
const https = require( 'https' ), fs = require( 'fs' );
( () => {
  if ( 2 < process.argv.length ) {
    const _argv2 = '' + ( process.argv[ 2 ] || '' ),
      _argv3 = '' + ( process.argv[ 3 ] || '' ),
      // prepare the text to query
      text = encodeURIComponent( _argv3 ),
      // forbidden characters in filename for windows 10
      unsafeFilenameChars = [ '<', '>', ':', '"', '/', '\\', '|', '?', '*' ],
      // sanitize input text for filenameText
      filenameText = _argv3.split( '' ).map( char => -1 < unsafeFilenameChars.indexOf( char ) ? '_' : char ).join( '' ),
      // use presets to reduce to one locale argument
      presets = { 'fr-fr': { in: 'fr-fr', out: 'fr-fr' }, 'fr-jp': { in: 'fr-fr', out: 'ja-jp' } },
      // select the requested preset
      preset = Object.assign( {}, presets[ _argv2 ] );
    // 1/2 get remote file content, 2/2 save to local file
    function grab( _ = { get: '', save: '' } ) {
      if ( _.get && _.save ) {
        const file = fs.createWriteStream( _.save );
        return new Promise( ( resolve, reject ) => {
          // make sure a response is sent only once
          let bResponseSent = false;
          https.
            get( _.get, res => {
              // TODO: 1/2 preserve existing file until 'finish'
              // TODO: 2/2 remove unfinished temp files
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
      save: `../sound-bank/${preset.in.split( '-' )[ 0 ]}-${preset.out.split( '-' )[ 1 ]}/${filenameText}.mp3`
    } ).
      then( res => console.log( 'File updated' ) ).
      catch( e => console.error( e ) );
  }
} )();
