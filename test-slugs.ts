import { getAllProjectSlugs } from "./lib/sanity";

async function run() {
  const slugs = await getAllProjectSlugs();
  console.log("SLUGS:", slugs);
}

run();
