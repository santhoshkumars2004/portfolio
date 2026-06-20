// Bridge so world interactions (cat, duck) can trigger one-shot sounds without
// prop-drilling the audio kit. WorldExperience assigns `sfx.kit` once ready.
export const sfx = { kit: null };
