import couplePurpleDiptych from '../assets/images/Couple élégant au jardin.png';
import coupleRomanticDiptych from '../assets/images/Portrait romantique en violet et bleu.png';

export interface StoryChapter {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  content: string;
  editableNote: string;
  imageUrl: string;
  imageAlt: string;
  imageCaption: string;
}

export interface ProgramDay {
  id: string;
  dayNumber: string;
  dateLabel: string;
  title: string;
  time: string;
  address: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
  editableNotice: string;
}

export type GalleryCategory =
  | 'Tous'
  | 'Le Couple'
  | 'Souvenirs'
  | 'Moments importants'
  | 'Préparatifs';

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'Tous'>;
  caption: string;
  imageUrl: string;
  alt: string;
  spanClass: string;
  aspectClass: string;
}

export const WEDDING_IDENTITY = {
  coupleNames: 'Clery & Loriane',
  groomName: 'Clery',
  brideName: 'Loriane',
  datesLabel: '27 & 28 février 2027',
  datesUppercase: '27 & 28 FÉVRIER 2027',
  city: 'Brazzaville',
  country: 'République du Congo',
  locationFull: 'Brazzaville, République du Congo',
  targetIsoDate: '2027-02-27T10:00:00+01:00',
  openingPrelude: 'Il était une fois…',
  centralConcept: 'Notre histoire commence bientôt…',
  tagline: "Une histoire qui s'écrit à deux.",
  threadLine: "Une histoire qui s'écrit à deux, et dont vous faites partie.",
  emotionalSignature:
    "Chaque histoire a un commencement. La nôtre continue de s'écrire, et nous aimerions que vous soyez présents pour en tourner les plus belles pages.",
  closingText:
    "Ce n'est pas simplement une date que nous vous invitons à retenir. C'est le commencement d'un nouveau chapitre, une histoire que nous avons hâte de partager avec vous.",
  closingSignature: 'Avec amour,\nClery & Loriane.',
} as const;

export const WEDDING_ASSETS = {
  invitation: '/src/assets/images/invitation_officielle_v2_1794910938778.jpg',
  originalInvitation: '/assets/aistudio/WhatsApp_Image_2026-11-16_at_21.37.36_005a1fbe.jpeg',
  heroPortrait: '/src/assets/images/couple_hero_portrait_1794908618282.jpg',
  storyWalk: '/src/assets/images/couple_story_walk_1794908619291.jpg',
  couplePurpleDiptych,
  coupleRomanticDiptych,
  preparationFlatlay: '/src/assets/images/preparation_flatlay_1794908619640.jpg',
  ceremonyGarden: '/src/assets/images/ceremony_garden_1794908620548.jpg',
} as const;

/**
 * Chapitres modifiables de l'histoire du couple.
 * Aucun événement personnel n'est inventé : chaque chapitre attend le texte authentique de Clery & Loriane.
 */
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapitre-1',
    numeral: 'Chapitre I',
    title: 'La rencontre',
    subtitle: 'Les premières lignes',
    content:
      "Tout grand récit commence par un instant suspendu. Cet espace est réservé aux mots de Clery et Loriane pour raconter, avec leurs propres souvenirs, le jour où leurs chemins se sont croisés.",
    editableNote: 'Texte personnel du couple à insérer',
    imageUrl: WEDDING_ASSETS.storyWalk,
    imageAlt: 'Clery et Loriane marchant main dans la main sous la lumière dorée',
    imageCaption: 'Premiers pas côte à côte',
  },
  {
    id: 'chapitre-2',
    numeral: 'Chapitre II',
    title: 'Les premiers souvenirs',
    subtitle: 'La complicité qui grandit',
    content:
      "Des conversations prolongées, des éclats de rire et des moments simples devenus précieux. Clery et Loriane partageront ici les souvenirs fondateurs de leur histoire.",
    editableNote: 'Texte personnel du couple à insérer',
    imageUrl: WEDDING_ASSETS.preparationFlatlay,
    imageAlt: 'Détails de papeterie en coton ivoire, sceau doré et roses blanches',
    imageCaption: 'Des souvenirs gravés avec tendresse',
  },
  {
    id: 'chapitre-3',
    numeral: 'Chapitre III',
    title: 'Une évidence',
    subtitle: 'L’accord des cœurs',
    content:
      "Il arrive un moment où l'on comprend que l'on regarde dans la même direction. Ce chapitre accueillera le récit de cet instant où tout est devenu une évidence.",
    editableNote: 'Texte personnel du couple à insérer',
    imageUrl: WEDDING_ASSETS.heroPortrait,
    imageAlt: 'Portrait éditorial de Clery et Loriane dans un jardin botanique',
    imageCaption: 'Deux regards tournés vers demain',
  },
  {
    id: 'chapitre-4',
    numeral: 'Chapitre IV',
    title: 'Une promesse',
    subtitle: 'L’engagement',
    content:
      "Un mot murmuré, un regard sincère et la promesse de bâtir ensemble. Cet espace est prêt à recevoir l'histoire de leur engagement et de la demande.",
    editableNote: 'Texte personnel du couple à insérer',
    imageUrl: WEDDING_ASSETS.invitation,
    imageAlt: 'Invitation officielle botanique et or champagne de Clery et Loriane',
    imageCaption: 'La promesse scellée sur papier',
  },
  {
    id: 'chapitre-5',
    numeral: 'Chapitre V',
    title: "Le début d'une nouvelle aventure",
    subtitle: '27 & 28 février 2027 · Brazzaville',
    content:
      "Bientôt, entourés de leurs familles et de leurs proches à Brazzaville, Clery et Loriane ouvriront un nouveau tome de leur vie. Vous faites désormais partie de cette histoire.",
    editableNote: 'Texte personnel du couple à insérer',
    imageUrl: WEDDING_ASSETS.ceremonyGarden,
    imageAlt: 'Jardin fleuri préparé pour la célébration du mariage',
    imageCaption: 'En route vers février 2027',
  },
];

/**
 * Programme modifiable des deux journées.
 * Les horaires et adresses non communiqués restent volontairement ouverts à la mise à jour.
 */
export const PROGRAM_DAYS: ProgramDay[] = [
  {
    id: 'jour-1',
    dayNumber: 'Première journée',
    dateLabel: 'Samedi 27 février 2027',
    title: 'Première journée de célébration',
    time: 'Horaire à confirmer',
    address: 'Lieu à Brazzaville — communiqué prochainement',
    description:
      "Ouverture des festivités réunissant les deux familles et les proches pour célébrer l'union de Clery et Loriane. Le programme détaillé et les horaires précis seront partagés ici très bientôt.",
    imageUrl: WEDDING_ASSETS.storyWalk,
    imageAlt: 'Atmosphère chaleureuse de la première journée',
    editableNotice: 'Détails horaires et adresse modifiables dès confirmation',
  },
  {
    id: 'jour-2',
    dayNumber: 'Deuxième journée',
    dateLabel: 'Dimanche 28 février 2027',
    title: 'Deuxième journée de célébration',
    time: 'Horaire à confirmer',
    address: 'Lieu à Brazzaville — communiqué prochainement',
    description:
      "Suite et apothéose de notre célébration autour d'un moment solennel et d'une réception conviviale sous le ciel de Brazzaville. L'adresse exacte et le déroulé seront précisés prochainement.",
    imageUrl: WEDDING_ASSETS.ceremonyGarden,
    imageAlt: 'Décor de réception en plein air avec roses blanches et feuillages',
    editableNotice: 'Détails horaires et adresse modifiables dès confirmation',
  },
];

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'Tous',
  'Le Couple',
  'Souvenirs',
  'Moments importants',
  'Préparatifs',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Sous la lumière de Brazzaville',
    category: 'Le Couple',
    caption: 'Portrait éditorial — Clery & Loriane dans une lumière dorée de fin d’après-midi.',
    imageUrl: WEDDING_ASSETS.heroPortrait,
    alt: 'Portrait romantique de Clery et Loriane entourés de feuillages',
    spanClass: 'md:col-span-7 md:row-span-2',
    aspectClass: 'aspect-[3/4] md:aspect-auto md:h-full',
  },
  {
    id: 'gal-2',
    title: 'Chemin de verdure',
    category: 'Souvenirs',
    caption: 'Instants spontanés et rires partagés le long d’une allée botanique.',
    imageUrl: WEDDING_ASSETS.storyWalk,
    alt: 'Clery et Loriane marchant ensemble sur un sentier arboré',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-3',
    title: 'Alliances & papier coton',
    category: 'Préparatifs',
    caption: 'Les détails choisis avec soin : soie ivoire, roses blanches et sceau doré.',
    imageUrl: WEDDING_ASSETS.preparationFlatlay,
    alt: 'Alliances dorées, enveloppe scellée et roses blanches sur travertin',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-4',
    title: 'Faire-part botanique',
    category: 'Moments importants',
    caption: 'L’invitation officielle, hommage aux teintes ivoire, vert forêt et or champagne.',
    imageUrl: WEDDING_ASSETS.invitation,
    alt: 'Carte d’invitation officielle de Clery et Loriane',
    spanClass: 'md:col-span-5',
    aspectClass: 'aspect-[3/4]',
  },
  {
    id: 'gal-5',
    title: 'Le jardin des promesses',
    category: 'Moments importants',
    caption: 'L’atmosphère rêvée pour nos tables fleuries et notre réception de février 2027.',
    imageUrl: WEDDING_ASSETS.ceremonyGarden,
    alt: 'Jardin de cérémonie orné d’arches de fleurs blanches et de tables dressées',
    spanClass: 'md:col-span-7',
    aspectClass: 'aspect-[16/10] md:h-full',
  },
  {
    id: 'gal-6',
    title: 'Élégance en violet',
    category: 'Le Couple',
    caption: 'Clery et Loriane partagent un tendre moment dans leurs tenues de cérémonie.',
    imageUrl: WEDDING_ASSETS.couplePurpleDiptych,
    alt: 'Diptyque de Clery et Loriane en costume bleu et tenue violette, dans un jardin.',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-7',
    title: 'Un instant à deux',
    category: 'Le Couple',
    caption: 'Deux portraits complices de Clery et Loriane, entre sourires et douceur.',
    imageUrl: WEDDING_ASSETS.coupleRomanticDiptych,
    alt: 'Diptyque de Clery et Loriane : un portrait rapproché et un moment complice assis.',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]',
  },
];
