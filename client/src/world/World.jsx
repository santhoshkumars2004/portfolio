import React from 'react';
import Atmosphere from './toon/Atmosphere';
import Grain from './toon/Grain';
import Street from './world/Street';
import Buildings from './world/Buildings';
import StreetProps from './world/StreetProps';
import Player from './game/Player';
import FollowCamera from './game/FollowCamera';
import Zone1Home from './zones/Zone1_Home';
import Zone2CoffeeStall from './zones/Zone2_CoffeeStall';
import Zone3CiscoOffice from './zones/Zone3_CiscoOffice';
import Zone4InternetCafe from './zones/Zone4_InternetCafe';
import Zone5JobBoard from './zones/Zone5_JobBoard';
import Zone6Rooftop from './zones/Zone6_Rooftop';

/**
 * World — the entire 3D scene that lives inside the Canvas: sky & lighting,
 * the continuous street, every zone, the player, the follow camera, and the
 * cel-shading grain pass. One unbroken neighborhood, no loading between zones.
 */
export default function World({ sound, mobile }) {
  return (
    <>
      <Atmosphere />

      {/* the continuous street + set dressing */}
      <Street />
      <Buildings />
      <StreetProps />

      {/* the six zones, laid out left → right along +X */}
      <Zone1Home />
      <Zone2CoffeeStall />
      <Zone3CiscoOffice />
      <Zone4InternetCafe />
      <Zone5JobBoard />
      <Zone6Rooftop />

      {/* hero + camera */}
      <Player sound={sound} />
      <FollowCamera />

      {/* cel-shade post: film grain + vignette (no bloom) */}
      <Grain mobile={mobile} />
    </>
  );
}
