import { forwardRef } from 'react';
import  React from 'react';
import MidiPlayer from 'react-midi-player';

const MidiPlayerWrapper = forwardRef((props, ref) => {
  return <MidiPlayer {...props} forwardedRef={ref} />;
});

export default MidiPlayerWrapper;
