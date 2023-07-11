import * as Y from 'yjs';
import { WebsocketProvider } from 'y-websocket';
import {
  ySyncPlugin,
  yCursorPlugin,
  yUndoPlugin,
  undo,
  redo,
} from 'y-prosemirror';
import { EditorState } from 'prosemirror-state';
import { schema } from './schema';
import { EditorView } from 'prosemirror-view';
// @ts-ignore
import { exampleSetup } from 'prosemirror-example-setup';
// @ts-ignore
import { keymap } from 'prosemirror-keymap';
import './style.css';
import * as de from 'lib0/decoding';

const aa =
  '0,1,165,2,1,10,146,144,138,161,8,0,7,1,11,112,114,111,115,101,109,105,114,114,111,114,3,9,112,97,114,97,103,114,97,112,104,7,0,146,144,138,161,8,0,3,4,102,105,108,101,7,0,146,144,138,161,8,1,6,4,0,146,144,138,161,8,2,10,229,155,190,231,137,135,46,106,112,103,40,0,146,144,138,161,8,1,6,102,105,108,101,73,100,1,119,44,90,114,56,83,106,77,121,114,103,97,80,117,114,103,76,55,90,54,52,84,71,79,97,119,81,119,99,76,88,112,86,73,82,68,90,50,116,75,77,95,53,120,77,61,40,0,146,144,138,161,8,1,4,115,105,103,110,1,119,4,120,120,120,120,40,0,146,144,138,161,8,1,8,105,109,70,105,108,101,73,100,1,119,3,120,120,120,40,0,146,144,138,161,8,1,5,116,105,116,108,101,1,119,10,229,155,190,231,137,135,46,106,112,103,40,0,146,144,138,161,8,1,12,102,114,111,109,84,105,99,107,101,116,73,100,1,119,44,100,76,56,100,103,112,80,116,106,54,68,118,114,103,88,53,82,111,48,86,72,117,67,50,82,81,69,78,87,74,78,79,81,106,66,119,115,113,85,53,52,82,85,61,40,0,146,144,138,161,8,1,5,101,120,116,114,97,1,118,0,0'.split(
    ','
  );

const uint8aa = Uint8Array.from(aa);
const bb = { arr: uint8aa, pos: 0 };

const ydoc = new Y.Doc();
const provider = new WebsocketProvider(
  'wss://demos.yjs.dev',
  'prosemirror',
  ydoc
);
const type = ydoc.getXmlFragment('prosemirror');

const editor = document.querySelector('#editor');

const prosemirrorView = new EditorView(editor, {
  state: EditorState.create({
    schema,
    plugins: [
      ySyncPlugin(type),
      yCursorPlugin(provider.awareness),
      yUndoPlugin(),
      keymap({
        'Mod-z': undo,
        'Mod-y': redo,
        'Mod-Shift-z': redo,
      }),
    ].concat(exampleSetup({ schema })),
  }),
});

// @ts-ignore
window.example = { provider, ydoc, type, prosemirrorView };
