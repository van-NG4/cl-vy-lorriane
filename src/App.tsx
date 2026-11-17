/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MotionConfig } from 'motion/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { StorySection } from './components/StorySection';
import { CountdownSection } from './components/CountdownSection';
import { InvitationSection } from './components/InvitationSection';
import { ProgramSection } from './components/ProgramSection';
import { GallerySection } from './components/GallerySection';
import { RsvpSection } from './components/RsvpSection';
import { ClosingSection } from './components/ClosingSection';
import { EnvelopeIntro, ScrollProgress } from './components/CinematicMotion';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen flex flex-col bg-[#FBF9F5] text-[#1D2B22]">
        <ScrollProgress />
        <a
          href="#contenu-principal"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#1B3B2B] focus:text-[#FBF9F5]"
        >
          Aller au contenu principal
        </a>

        <Navbar />
        <EnvelopeIntro />

        <main id="contenu-principal" className="flex-1">
          <HeroSection />
          <StorySection />
          <CountdownSection />
          <InvitationSection />
          <ProgramSection />
          <GallerySection />
          <RsvpSection />
          <ClosingSection />
        </main>
      </div>
    </MotionConfig>
  );
}
