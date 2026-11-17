import { jsPDF } from 'jspdf';
import { WEDDING_ASSETS, WEDDING_IDENTITY } from '../data/weddingData';

function triggerDownload(url: string, filename: string): void {
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.rel = 'noopener noreferrer';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export async function downloadInvitationImage(
  imageSrc: string = WEDDING_ASSETS.invitation,
): Promise<void> {
  const response = await fetch(imageSrc);
  if (!response.ok) {
    throw new Error("Impossible de récupérer l'image de l'invitation.");
  }
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  try {
    triggerDownload(objectUrl, 'Invitation-Clery-et-Loriane.jpg');
  } finally {
    setTimeout(() => URL.revokeObjectURL(objectUrl), 1500);
  }
}

function loadImageElement(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error("Chargement de l'invitation échoué."));
    img.src = src;
  });
}

export async function downloadInvitationPdf(
  imageSrc: string = WEDDING_ASSETS.invitation,
): Promise<void> {
  const img = await loadImageElement(imageSrc);

  const canvas = document.createElement('canvas');
  canvas.width = img.naturalWidth;
  canvas.height = img.naturalHeight;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Contexte graphique indisponible.');
  }
  ctx.drawImage(img, 0, 0);
  const dataUrl = canvas.toDataURL('image/jpeg', 0.96);

  const isLandscape = img.naturalWidth > img.naturalHeight;
  const pdf = new jsPDF({
    orientation: isLandscape ? 'landscape' : 'portrait',
    unit: 'mm',
    format: 'a4',
    compress: true,
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();

  // Warm ivory archival backdrop (#FBF9F5)
  pdf.setFillColor(251, 249, 245);
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Delicate champagne gold hairline frame
  pdf.setDrawColor(184, 147, 82);
  pdf.setLineWidth(0.35);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);

  // Fit image with generous margins, preserving exact aspect ratio (zero distortion)
  const maxImgWidth = pageWidth - 32;
  const maxImgHeight = pageHeight - 50;
  const ratio = img.naturalWidth / img.naturalHeight;

  let drawWidth = maxImgWidth;
  let drawHeight = drawWidth / ratio;
  if (drawHeight > maxImgHeight) {
    drawHeight = maxImgHeight;
    drawWidth = drawHeight * ratio;
  }

  const x = (pageWidth - drawWidth) / 2;
  const y = (pageHeight - drawHeight) / 2 - 4;

  pdf.addImage(dataUrl, 'JPEG', x, y, drawWidth, drawHeight, undefined, 'FAST');

  // Subtle archival caption below invitation
  pdf.setTextColor(27, 59, 43);
  pdf.setFont('times', 'italic');
  pdf.setFontSize(10.5);
  pdf.text(
    `${WEDDING_IDENTITY.coupleNames}  ·  ${WEDDING_IDENTITY.datesLabel}  ·  ${WEDDING_IDENTITY.locationFull}`,
    pageWidth / 2,
    y + drawHeight + 10,
    { align: 'center' },
  );

  pdf.save('Invitation-Mariage-Clery-et-Loriane.pdf');
}

export function getGoogleCalendarUrl(): string {
  const params = new URLSearchParams({
    action: 'TEMPLATE',
    text: 'Mariage de Clery & Loriane',
    dates: '20270227/20270301',
    location: 'Brazzaville, République du Congo',
    details:
      "Célébration du mariage de Clery & Loriane les 27 et 28 février 2027 à Brazzaville. Une histoire qui s'écrit à deux, et dont vous faites partie.",
  });
  return `https://calendar.google.com/calendar/render?${params.toString()}`;
}

export function downloadWeddingIcs(): void {
  const icsLines = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Clery et Loriane//Mariage 2027//FR',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:mariage-clery-loriane-2027@brazzaville',
    'DTSTAMP:20261117T000000Z',
    'DTSTART;VALUE=DATE:20270227',
    'DTEND;VALUE=DATE:20270301',
    'SUMMARY:Mariage de Clery & Loriane',
    'LOCATION:Brazzaville, République du Congo',
    "DESCRIPTION:Célébration du mariage de Clery & Loriane les 27 et 28 février 2027 à Brazzaville. Une histoire qui s'écrit à deux.",
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ];

  const blob = new Blob([icsLines.join('\r\n')], {
    type: 'text/calendar;charset=utf-8',
  });
  const url = URL.createObjectURL(blob);
  try {
    triggerDownload(url, 'Mariage-Clery-et-Loriane-2027.ics');
  } finally {
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  }
}
