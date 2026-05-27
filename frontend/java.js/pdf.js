window.downloadCV = function () {
  const element = document.querySelector(".box");

  html2pdf().from(element).save("CvCodeHub_CV.pdf");
};
