## What is this?

A simple WYSIWYG ("What You See Is What You Get") editor written in jQuery.  Turn any element into a rich text editor.

## Usage

```javascript
$(document).ready(
 function () {
  $('.myeditor').wysiwyg(options); 
 } 
)
```

## Options
* __linkPrompt (string):__ The message in the link prompt
* __buttons (object):__ Selectors for bold, italic, and link buttons
** __bold__
** __italic__
** __link__