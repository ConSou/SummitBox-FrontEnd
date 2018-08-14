import React from 'react';

const Info = () => (
  <div className='page-header'>
  <img className='bg-image' alt='mountian top' src={require('../images/Landing3.jpg')} height='100%' width='100%' />
    <header>
        <h2 className="title-dark">SummitBox</h2>
    </header>
  <section className='nav'>
    “A summit book or summit register is a record of visitors to the summit of a mountain, usually one without a maintained trail. It is usually enclosed in a weatherproof, animal-proof metal canister. Some books are maintained in an informal manner by an individual or small group, while others are maintained by a club.”
    SummitBox works as a completely digital summit register allowing users to only access the virtual “box” once the latitude, longitude and altitude as been reached and logged.  As with a traditional summit box the names, trinkets and stories are left to live on the mountain and only those traveling to the summit will ever see them.  SummitBox will allow you to save a timestamped summit log with a name and pictures from the summit in addition to a submittable journal.  From the box you will receive a badge that can be displayed on your profile as a sign of a successful attempt.  Once you have reached the summit the box is unlocked for you to view, read and explore once you are safely down the mountain, access that only people who have summited will have.  Wether you are looking to track your own climbs or looking to follow your mountaineering friends SummitBox is here to both modernize and maintain the tradition of signing your name on the top of Earth’s mountains.
  </section>
  </div>
);

export default Info;
