export type GalleryChapterId =
  | 'avant-promesse'
  | 'grand-jour'
  | 'promesse'
  | 'joie-partagee'
  | 'avenir';

export interface GalleryPhoto {
  id: string;
  src: string;
  downloadSrc: string;
  alt: string;
  chapter: GalleryChapterId;
  caption: string;
  order: number;
  featured: boolean;
}

export const GALLERY_CHAPTERS: Array<{
  id: GalleryChapterId;
  numeral: string;
  title: string;
  introduction: string;
}> = [
  {
    id: 'avant-promesse',
    numeral: 'CHAPITRE 01',
    title: 'Avant la promesse',
    introduction: 'Les détails, les préparatifs et les instants qui précèdent la célébration.',
  },
  {
    id: 'grand-jour',
    numeral: 'CHAPITRE 02',
    title: 'Le grand jour',
    introduction: 'Les premiers instants de cette journée devenue mémorable.',
  },
  {
    id: 'promesse',
    numeral: 'CHAPITRE 03',
    title: 'La promesse',
    introduction: 'Les regards, les gestes et les émotions qui donnent tout leur sens à cette union.',
  },
  {
    id: 'joie-partagee',
    numeral: 'CHAPITRE 04',
    title: 'La joie partagée',
    introduction: 'Famille, proches et sourires réunis pour célébrer ensemble.',
  },
  {
    id: 'avenir',
    numeral: 'CHAPITRE 05',
    title: 'Et maintenant, l’avenir',
    introduction: 'Portraits, complicité et premier regard tourné vers la suite de l’histoire.',
  },
];

const coupleNames = [
  '08.04.01','08.04.02','08.04.03 (1)','08.04.03','08.04.04','08.04.05','08.04.06 (1)','08.04.06','08.04.07','08.04.08','08.04.09','08.04.10 (1)','08.04.10 (2)','08.04.10','08.04.11','08.04.12 (1)','08.04.12','08.04.13','08.04.15 (1)','08.04.15','08.04.16 (1)','08.04.16 (2)','08.04.16','08.04.18 (1)','08.04.18','08.04.19 (1)','08.04.19 (2)','08.04.19','08.04.20','08.04.21','08.04.22 (1)','08.04.22 (2)','08.04.22','08.04.23 (1)','08.04.23 (2)','08.04.23','08.05.06 (1)','08.05.06','08.05.53 (1)','08.05.53','08.05.54 (1)','08.05.54',
];

const familyNames = [...coupleNames];
const presentationNames = ['08.01.20 (1)','08.01.20','08.01.21 (1)','08.01.21','08.01.22','08.01.23'];

function toPhoto(folder: string, name: string, chapter: GalleryChapterId, order: number, featured = false): GalleryPhoto {
  const src = `/assets/aistudio/gallery/${folder}/WhatsApp Image 2026-11-20 at ${name}.jpeg`;
  return {
    id: `${folder}-${name.replace(/[^a-z0-9]/gi, '-').toLowerCase()}-${order}`,
    src,
    downloadSrc: src,
    alt: 'Photographie des fiançailles de Clevy et Lorriane',
    chapter,
    caption: '',
    order,
    featured,
  };
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  ...presentationNames.map((name, index) => toPhoto('Présentation', name, 'avant-promesse', index + 1, index === 0)),
  ...coupleNames.map((name, index) => toPhoto('couple', name, index < 10 ? 'grand-jour' : index < 24 ? 'promesse' : 'avenir', index + 7, index === 11)),
  ...familyNames.map((name, index) => toPhoto('family', name, 'joie-partagee', index + 49, index === 0)),
];
