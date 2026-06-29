module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy({ meetings: "meetings" });
  eleventyConfig.addPassthroughCopy({ media: "media" });
  eleventyConfig.addPassthroughCopy({ "src/style.css": "style.css" });

  return {
    dir: {
      input: "src",
      output: "_site",
    },
    pathPrefix: "/OpenChain-Meridian22/",
  };
};
