# Photographies de la galerie

Les photographies réelles sont actuellement chargées depuis :

- `public/assets/aistudio/gallery/Présentation/`
- `public/assets/aistudio/gallery/couple/`
- `public/assets/aistudio/gallery/family/`

Le catalogue centralisé se trouve dans :

- `src/data/gallery.ts`

Pour remplacer une photographie temporaire ou ajouter une nouvelle image :

1. Placez les fichiers optimisés dans `public/gallery/` ou dans un sous-dossier du chapitre.
2. Utilisez idéalement le format WebP pour les miniatures et les aperçus, avec des dimensions raisonnables.
3. Conservez une autre copie haute résolution si nécessaire dans le même dossier.
4. Ajoutez ou modifiez l’entrée correspondante dans `GALLERY_PHOTOS`.
5. Renseignez `src`, `downloadSrc`, `alt`, `chapter`, `caption`, `order` et `featured`.

Pour créer l’archive globale :

1. Préparez un dossier temporaire contenant toutes les photos définitives.
2. Créez un fichier ZIP nommé `album-fiancailles.zip`.
3. Placez l’archive dans `public/downloads/`.

Des archives séparées peuvent être créées dans `public/downloads/` si l’album global devient trop volumineux.
