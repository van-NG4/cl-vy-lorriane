import { motion } from 'motion/react';
import { Building2, HeartHandshake, Church, Wine } from 'lucide-react';
import { OrnamentalDivider } from './BotanicalOrnament';
import type { LucideIcon } from 'lucide-react';

interface ProgramEvent {
	time: string;
	title: string;
	location?: string;
	address?: string;
	description: string;
	icon: LucideIcon;
}

interface ProgramDay {
	id: string;
	eyebrow: string;
	date: string;
	events: ProgramEvent[];
}

const PROGRAM_DAYS: ProgramDay[] = [
	{
		id: 'samedi',
		eyebrow: 'JOUR 1',
		date: 'Samedi 27 février 2027',
		events: [
			{
				time: '09 H 00',
				title: 'Mariage officiel',
				location: 'Mairie de Kintélé',
				description:
					'La célébration officielle de notre union devant les autorités civiles.',
				icon: Building2,
			},
			{
				time: '14 H 00',
				title: 'Mariage coutumier',
				address: 'Numéro 69, rue Bouenza, à Talangaï (arrêt Liberté).',
				description:
					'Un moment de tradition, de famille et de célébration autour de notre union.',
				icon: HeartHandshake,
			},
		],
	},
	{
		id: 'dimanche',
		eyebrow: 'JOUR 2',
		date: 'Dimanche 28 février 2027',
		events: [
			{
				time: '13 H 00',
				title: 'Mariage religieux',
				location: 'Église El-Bethel Tabernacle',
				address:
					'Rue Ngoma Casimir n°1, arrêt Sadea (Palmier), quartier Diata.',
				description:
					'Nous nous retrouverons pour célébrer notre alliance dans la foi et placer notre foyer sous la grâce de Dieu.',
				icon: Church,
			},
			{
				time: '16 H 00',
				title: 'Apéritif',
				description:
					'Un moment de convivialité et de partage pour prolonger ensemble la joie de cette belle célébration.',
				icon: Wine,
			},
		],
	},
] ;

export function ProgramSection() {
	return (
		<section
			id="programme"
			className="py-20 sm:py-28 bg-[#F5EFE4] border-y border-[#A94F32]/15"
		>
			<div className="max-w-6xl mx-auto px-5 sm:px-8">
				<motion.div
					initial={{ opacity: 0, y: 16 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, amount: 0.35 }}
					transition={{ duration: 0.7 }}
					className="mx-auto max-w-3xl text-center"
				>
					<p className="text-xs uppercase tracking-[0.24em] text-[#A94F32]">
						Deux journées d’exception
					</p>
					<h2 className="mt-3 font-display text-4xl sm:text-5xl font-medium text-[#432B24]">
						Programme relatif aux différentes étapes du mariage
					</h2>
					<OrnamentalDivider className="mt-7" />
				</motion.div>

				<div className="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
					{PROGRAM_DAYS.map((day, dayIndex) => (
						<motion.article
							key={day.id}
							initial={{ opacity: 0, y: 24 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true, amount: 0.15 }}
							transition={{ duration: 0.75, delay: dayIndex * 0.12 }}
							className="group relative bg-[#FFFDF9] border border-[#A94F32]/20 px-5 py-7 sm:px-8 sm:py-9"
						>
							<div className="border-b border-[#D96B32]/35 pb-6">
								<p className="text-xs uppercase tracking-[0.22em] text-[#A94F32]">
									{day.eyebrow}
								</p>
								<h3 className="mt-2 font-display text-3xl sm:text-4xl text-[#432B24]">
									{day.date}
								</h3>
							</div>

							<div className="relative mt-7">
								<div className="absolute left-[21px] sm:left-[23px] top-9 bottom-9 w-px origin-top bg-[#D96B32]/55" />
								{day.events.map((event, eventIndex) => {
									const Icon = event.icon;
									return (
										<motion.div
											key={`${day.id}-${event.time}`}
											initial={{ opacity: 0, x: -12 }}
											whileInView={{ opacity: 1, x: 0 }}
											viewport={{ once: true, amount: 0.35 }}
											transition={{
												duration: 0.55,
												delay: dayIndex * 0.12 + eventIndex * 0.12,
											}}
											className="relative grid grid-cols-[44px_minmax(0,1fr)] sm:grid-cols-[48px_minmax(0,1fr)] gap-4 sm:gap-5 pb-8 last:pb-0"
										>
											<div className="relative z-10 flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full border border-[#D96B32]/45 bg-[#FFFDF9] text-[#A94F32] transition-colors duration-300 group-hover:border-[#A94F32]">
												<Icon
													className="h-5 w-5"
													strokeWidth={1.5}
													aria-hidden="true"
												/>
											</div>
											<div className="pt-1 transition-transform duration-300 group-hover:translate-x-1">
												<p className="font-display text-2xl sm:text-[28px] text-[#D96B32] leading-none">
													{event.time}
												</p>
												<h4 className="mt-2 text-sm sm:text-base uppercase tracking-[0.13em] font-bold text-[#432B24]">
													{event.title}
												</h4>
												{event.location && (
													<p className="mt-3 text-[15px] font-semibold text-[#5A382B]">
														Lieu : {event.location}
													</p>
												)}
												{event.address && (
													<p className="mt-1 text-sm leading-relaxed text-[#5A382B]">
														Adresse : {event.address}
													</p>
												)}
												<p className="mt-3 text-[15px] leading-7 text-[#526157]">
													« {event.description} »
												</p>
											</div>
										</motion.div>
									);
								})}
							</div>
						</motion.article>
					))}
				</div>

				<p className="mt-9 text-center text-sm italic text-[#A94F32]">
					NB : Les heures peuvent être modifiées.
				</p>
			</div>
		</section>
	);
}
