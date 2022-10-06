import React from 'react';
import Video from '../src/component/ui/video';
import Benefits from '../src/component/ui/benefits';
import HowStep from '../src/component/common/how-step';

const App = () => {
  return (
    <div className="container">
      <Video />
      <Benefits />
      <HowStep title="How to Buy Tickets?" />
    </div>
  );
};

export default App;
