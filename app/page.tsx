import {
  Collaborations,
  Contact,
  Gallery,
  Hero,
  Impact,
  NameBand,
  Origin,
  Support,
  VisionMission,
  Volunteer,
  WhatWeDo,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      {/* Hero and name band share the first screen. svh = height with mobile browser bars showing. */}
      <div className="flex min-h-svh flex-col">
        <Hero />
        <NameBand />
      </div>
      <Origin />
      <WhatWeDo />
      <VisionMission />
      <Impact />
      <Gallery />
      {/* Hidden for now - restore along with the Team links in content/config.ts. */}
      {/* <Team /> */}
      <Collaborations />
      <Support />
      <Volunteer />
      <Contact />
    </>
  );
}
