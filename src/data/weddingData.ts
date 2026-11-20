const couplePhoto = (name: string) =>
  `/assets/aistudio/gallery/couple/WhatsApp Image 2026-11-20 at ${name}.jpeg`;

export interface StoryChapter {
  id: string;
  numeral: string;
  title: string;
  subtitle: string;
  hook: string;
  content: string;
  conclusion: string;
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
  coupleNames: 'Clevy & Lorriane',
  groomName: 'Clevy',
  brideName: 'Lorriane',
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
  closingSignature: 'Avec amour,\nClevy & Lorriane.',
} as const;

export const WEDDING_ASSETS = {
  invitation: '/src/assets/images/invitation_officielle_v2_1794910938778.jpg',
  originalInvitation: '/assets/aistudio/WhatsApp_Image_2026-11-16_at_21.37.36_005a1fbe.jpeg',
  heroPortrait: couplePhoto('08.05.54'),
  storyWalk: couplePhoto('08.04.06'),
  couplePurpleDiptych: couplePhoto('08.04.22'),
  coupleRomanticDiptych: couplePhoto('08.04.19'),
  preparationFlatlay: '/src/assets/images/preparation_flatlay_1794908619640.jpg',
  ceremonyGarden: '/src/assets/images/ceremony_garden_1794908620548.jpg',
} as const;

/**
 * Chapitres modifiables de l'histoire du couple.
 * Aucun événement personnel n'est inventé : chaque chapitre attend le texte authentique de Clevy & Lorriane.
 */
export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: 'chapitre-1',
    numeral: 'Chapitre I',
    title: 'Tout a commencé dans un bus...',
    subtitle: 'La rencontre',
    hook: 'Un simple trajet, une rencontre inattendue, le début d’une belle histoire.',
    content:
      "Notre histoire a commencé dans un bus, un soir où nous revenions de l'église. C'est là que Clevy trouva le courage d'adresser la parole à Lorriane. On ne savait pas que ce trajet allait marquer le début d'une si belle histoire d'amour.",
    conclusion: 'Un simple trajet, une rencontre inattendue, le début d’une belle histoire.',
    editableNote: 'Texte officiel fourni par le couple',
    imageUrl: couplePhoto('08.04.06'),
    imageAlt: 'Photographie personnelle de Clevy et Lorriane',
    imageCaption: 'Clevy & Lorriane',
  },
  {
    id: 'chapitre-2',
    numeral: 'Chapitre II',
    title: 'Une complicité qui grandit',
    subtitle: 'Notre histoire',
    hook:
      'De la Parole de Dieu aux fous rires partagés, chaque instant a contribué à écrire notre histoire.',
    content:
      'Nous nous souvenons encore de nos premières conversations, qui portaient simplement sur la Parole de Dieu, les bandes et nos activités. Au fil du temps, nous avons appris à partager de merveilleux moments ensemble : des sorties, des promenades, nos fous rires et nos taquineries.',
    conclusion:
      'De la Parole de Dieu aux fous rires partagés, chaque instant a contribué à écrire notre histoire.',
    editableNote: 'Texte officiel fourni par le couple',
    imageUrl: couplePhoto('08.04.19'),
    imageAlt: 'Photographie personnelle de Clevy et Lorriane',
    imageCaption: 'Des souvenirs simples devenus précieux',
  },
  {
    id: 'chapitre-3',
    numeral: 'Chapitre III',
    title: 'Une promesse à célébrer ensemble',
    subtitle: 'Leur engagement',
    hook: 'Deux cœurs, une promesse et un avenir à construire avec Dieu.',
    content:
      "C'est avec une immense joie que nous vous invitons les 27 et 28 février 2027 pour sceller notre amour éternel. Merci de faire partie de nos invités.\n\nLe couple EFEGNENI",
    conclusion:
      'Deux cœurs, une promesse et un avenir à construire avec Dieu.',
    editableNote: 'Informations officielles communiquées par le couple',
    imageUrl: couplePhoto('08.05.54'),
    imageAlt: 'Portrait personnel de Clevy et Lorriane',
    imageCaption: '27 & 28 février 2027',
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
      "Ouverture des festivités réunissant les deux familles et les proches pour célébrer l'union de Clevy et Lorriane. Le programme détaillé et les horaires précis seront partagés ici très bientôt.",
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
    caption: 'Portrait éditorial — Clevy & Lorriane dans une lumière dorée de fin d’après-midi.',
    imageUrl: WEDDING_ASSETS.heroPortrait,
    alt: 'Portrait romantique de Clevy et Lorriane entourés de feuillages',
    spanClass: 'md:col-span-7 md:row-span-2',
    aspectClass: 'aspect-[3/4] md:aspect-auto md:h-full',
  },
  {
    id: 'gal-2',
    title: 'Chemin de verdure',
    category: 'Souvenirs',
    caption: 'Instants spontanés et rires partagés le long d’une allée botanique.',
    imageUrl: WEDDING_ASSETS.storyWalk,
    alt: 'Clevy et Lorriane marchant ensemble sur un sentier arboré',
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
    alt: 'Carte d’invitation officielle de Clevy et Lorriane',
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
    caption: 'Clevy et Lorriane partagent un tendre moment dans leurs tenues de cérémonie.',
    imageUrl: WEDDING_ASSETS.couplePurpleDiptych,
    alt: 'Diptyque de Clevy et Lorriane en costume bleu et tenue violette, dans un jardin.',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-7',
    title: 'Un instant à deux',
    category: 'Le Couple',
    caption: 'Deux portraits complices de Clevy et Lorriane, entre sourires et douceur.',
    imageUrl: WEDDING_ASSETS.coupleRomanticDiptych,
    alt: 'Diptyque de Clevy et Lorriane : un portrait rapproché et un moment complice assis.',
    spanClass: 'md:col-span-6',
    aspectClass: 'aspect-[4/3]',
  },
];
