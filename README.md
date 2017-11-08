# leon
base repo for autonomous cleaning robot with voice control, artificial sentient interactions with human and stuff

## /text-to-speech

### /google-translate-api

The idea in this nodejs script is to use Google translate's TTS service (experimental) to produce the voice corresponding to the text. 

* text: string // input text
* textLocale: string // locale code of the input text
* voiceLocale: string // locale code of the voice generated

```js
https.get( `https://translate.google.com/translate_tts?ie=UTF-8&tl=${voiceLocale}&client=${textLocale}&q=${text}` )
```

e.g. to make a japanese reader pronouce the french 'bonjour': 
```js
https.get( `https://translate.google.com/translate_tts?ie=UTF-8&tl=ja-jp&client=fr-fr&q=bonjour` )
```


