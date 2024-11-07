import React from "react";
import StaggeredFade from "../ui/staggered-heading";
import { AnimatedGroup } from "../ui/animated-group";
const data = [
  {
    heading: "Easy to use",
    description: "Make waitlist in just 1 step",
  },
  {
    heading: "Super easy UI",
    description: "super easy editing",
  },
  {
    heading: "Analytics",
    description: "Get user insights & integrate mail",
  },
];
export default function WhyUs() {
  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-10 min-h-[500px] items-center justify-center">
      <StaggeredFade
        sentence="Why us ! One thing for sure we are cool... "
        className="md:text-3xl"
      />
      <AnimatedGroup
        className="grid grid-cols-2 gap-4 p-8 md:grid-cols-3 "
        preset="scale"
      >
        {data.map((item) => (
          <WhyUsCard key={item.heading} {...item} />
        ))}
      </AnimatedGroup>
    </div>
  );
}
function WhyUsCard({ heading, description }) {
  return (
    <div className="bg-white rounded-2xl px-16 min-w-[28%] py-12 flex flex-col gap-4 text-center text-[#272727]">
      <h3 className="text-2xl font-medium text-[#474747]">{heading}</h3>
      <p>{description}</p>
    </div>
  );
}
