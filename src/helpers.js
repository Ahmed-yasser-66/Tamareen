import { jsPDF } from 'jspdf';

// Function to draw rounded rectangles
const drawRoundedRect = (doc, x, y, width, height, radius, fillColor) => {
  doc.setFillColor(fillColor);
  doc.roundedRect(x, y, width, height, radius, radius, 'F');
};

export function generatePlanPdf(planDays, planName) {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const trainerName = localStorage.getItem('userName');

  // Set background color for all pages
  doc.setFillColor(34, 40, 49); // #222831
  doc.rect(0, 0, 210, 297, 'F'); // Fill the entire page

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(28);
  doc.setTextColor(238, 238, 238);
  drawRoundedRect(doc, 75, 11, 60, 12, 2, '#0092ca');

  const textWidth = doc.getTextWidth('Tamareen');
  const pageWidth = doc.internal.pageSize.getWidth();
  const centeredX = (pageWidth - textWidth) / 2;

  const websiteURl = `${window.location.origin}`;
  doc.textWithLink('Tamareen', centeredX, 20, {
    url: websiteURl,
  });

  let currentYPosition = 40;

  doc.setFontSize(18);
  doc.text(`- Plan Name : ${planName}`, 10, currentYPosition);
  currentYPosition += 10;
  doc.text(`- Trainer Name : ${trainerName}`, 10, currentYPosition);
  currentYPosition += 20;

  planDays.forEach((day, dayIndex) => {
    // Check if we need to add a new page
    if (currentYPosition > 270) {
      doc.addPage();
      currentYPosition = 40;
      // Set background color for new page
      doc.setFillColor(34, 40, 49); // #222831
      doc.rect(0, 0, 210, 297, 'F');
    }

    // Add Day Header
    doc.setFontSize(30);
    doc.setTextColor(0, 146, 202); // #0092ca
    doc.setFont('helvetica', 'bold');
    doc.text(`Day ${dayIndex + 1} :`, 10, currentYPosition); // Day title

    currentYPosition += 15;

    // Iterate over exercises for each day
    day.forEach((exercise) => {
      // Check if we need to add a new page
      if (currentYPosition > 270) {
        doc.addPage();
        currentYPosition = 40;
        doc.setFillColor(34, 40, 49);
        doc.rect(0, 0, 210, 297, 'F');
      }

      // Set exercise name
      doc.setFontSize(16);
      doc.setTextColor(238, 238, 238);
      doc.text(exercise.name, 20, currentYPosition); // Exercise name

      // Draw background for "Details" link
      drawRoundedRect(doc, 150, currentYPosition - 8, 28, 12, 3, '#0092ca');

      doc.setFontSize(18);
      doc.setTextColor(238, 238, 238);
      const exerciseURL = `${window.location.origin}/app/${exercise.id}`;
      doc.textWithLink('Details', 153, currentYPosition, {
        url: exerciseURL,
      });

      currentYPosition += 20;
    });

    currentYPosition += 10;
  });

  // Save the PDF
  doc.save(`${planName}-Tamareen.pdf`);
}

export function calculateYears(startDate) {
  const start = new Date(startDate);
  const now = new Date();

  let years = now.getFullYear() - start.getFullYear();
  const hasNotHadBirthdayThisYear =
    now.getMonth() < start.getMonth() ||
    (now.getMonth() === start.getMonth() && now.getDate() < start.getDate());

  if (hasNotHadBirthdayThisYear) {
    years--;
  }

  return years;
}
