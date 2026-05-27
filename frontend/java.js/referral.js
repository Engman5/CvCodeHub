window.shareApp = function () {
  navigator.share({
    title: "CvCodeHub",

    text: "Create professional CVs easily",

    url: window.location.href,
  });
};
