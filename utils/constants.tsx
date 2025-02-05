import type {ReactNode} from 'react';

type TContent = {
	subtitle: string;
	title: string;
	tags: string[];
	video?: string;
	images: string[];
	description: ReactNode;
	projectLink: string;
};

export const CASE_CONTENT: Record<string, TContent> = {
	washTrade: {
		subtitle: 'Jumper wash trade',
		title: 'The world’s first wash trading game.',
		tags: ['marketing', 'development', 'design'],
		description: (
			<>
				<span>
					<span className={' font-bold'}>{'The brief:'}</span>&nbsp;
					<span className={''}>
						{'Help Jumper launch their DEX on Solana and take market share from the incumbent Jupiter.'}
					</span>
				</span>
				<br />
				<br />
				<span>
					<span className={'text-xl font-bold'}>{'The solution:'}</span>&nbsp;
					<span className={''}>
						{
							'Since degens love to wash trade, we decided to give them what they wanted. Users could mint a free NFT that starts covered in gunk. By trading on Jumper or completing quests (like um… dumping JUP tokens), users washed their NFT clean for a chance to win a prize.'
						}
					</span>
				</span>
				<br />
				<br />
				<span>
					<span className={'text-xl font-bold'}>{'The result:'}</span>&nbsp;
					<span className={''}>
						{
							'With purely organic media, Jumper saw 20,000 unique wallets trade 60M of volume over the two week campaign.'
						}
					</span>
				</span>
			</>
		),
		images: [
			'/images/yearn.png',
			'/images/yearn.png',
			'/images/yearn.png',
			'/images/yearn.png',
			'/images/yearn.png'
		],
		projectLink: 'https://jumper.exchange/wash/about'
	},
	friendTech: {
		subtitle: 'Friend Tech',
		title: 'Launching crypto’s most hyped SocialFi app.',
		tags: ['marketing'],
		description: (
			<>
				<span>
					<span className={'font-bold'}>{'The brief:'}</span>&nbsp;
					<span className={''}>
						{
							'Racer and the Friend Tech team gave us a simple brief, create two films for their upcoming launch. Blank slate, free reign, uWu.'
						}
					</span>
				</span>
				<br />
				<br />
				<span>
					<span className={'text-xl font-bold'}>{'The solution:'}</span>&nbsp;
					<span className={''}>
						{
							'We designed a new brand world for Friend Tech, and took their illustrated bunny mascot in a new slightly more unhinged direction. We brought that bunny to life in 3d and then let him and his friends loose around Tokyo.'
						}
					</span>
				</span>
				<br />
				<br />
				<span>
					<span className={'text-xl font-bold'}>{'The result:'}</span>&nbsp;
					<span className={''}>
						{
							'Over 1.5m organic views, a mega successful launch, and… just don’t blame us for the token price.'
						}
					</span>
				</span>
			</>
		),
		video: 'FriendTech_teaser_v1_xxnt5t',
		images: ['/images/yearn.png', '/images/yearn.png', '/images/yearn.png'],
		projectLink: 'https://www.friend.tech/'
	},
	yearn: {
		subtitle: 'Yearn',
		title: 'Building one of DeFi’s most loved brands.',
		tags: ['marketing', 'development', 'design'],
		description: (
			<>
				<span>
					{'Help Jumper launch their DEX on Solana and take market share from the incumbent Jupiter.'}
				</span>
				<br />
				<br />
				<span>
					{
						'Since degens love to wash trade, we decided to give them what they wanted. Users could mint a free NFT that starts covered in gunk. By trading on Jumper or completing quests (like um… dumping JUP tokens), users washed their NFT clean for a chance to win a prize.'
					}
				</span>
			</>
		),
		images: ['/images/yearn.png', '/images/yearn.png', '/images/yearn.png', '/images/yearn.png'],
		projectLink: 'https://yearn.finance/'
	},
	jumperWrapped: {
		subtitle: 'Jumper Wrapped',
		title: 'Wrap this, wrap that, why don’t you wrap your head around our Jumper Wrapped campaign.',
		tags: ['marketing', 'development', 'design'],
		description: (
			<span>
				{
					'Spotify wrapped, but for your onchain activities. Designed, developed and shipped for Jumper. Pulling data from every major chain with witty copywriting to help ensure everything is shareable on social.'
				}
			</span>
		),
		images: ['/images/yearn.png', '/images/yearn.png', '/images/yearn.png', '/images/yearn.png'],
		projectLink: 'https://jumper.exchange/wrapped'
	},
	polygon: {
		subtitle: 'Polygon',
		title: 'Bringing Polygon lore to the masses.',
		tags: ['marketing'],
		description: (
			<>
				<span>
					{
						'As one of the largest brands in crypto, Polygon wanted to connect deeper with the crypto natives community, and shill the AggLayer at the same time.'
					}
				</span>
				<br />
				<br />
				<span>
					{
						'We created a series of films that established more degen lore for the brand, and snuck some AggLayer shilling along the way.'
					}
				</span>
			</>
		),
		video: 'In_future_we_bridge_Polygon__v1_bqg0gv',
		images: ['/images/yearn.png', '/images/yearn.png', '/images/yearn.png'],
		projectLink: 'https://polygon.technology/'
	},
	mom: {
		subtitle: 'MOM',
		title: 'Sometimes we just make stuff for fun. Why not.',
		tags: ['marketing'],
		description: (
			<>
				<span>
					{
						'Our MOM account is a place where we experiment with new production styles or just make silly videos for the hell of it. '
					}
				</span>
				<br />
				<br />
				<span>
					{
						'Despite having only 1,500 followers - our videos constantly get 50k+ views because all our creative is optimized to outperform the algo.'
					}
				</span>
				<br />
				<br />
				<span>
					{
						'But the biggest compliment is when our content gets stolen and reposted on content accounts - racking up millions of views [sad emoji].'
					}
				</span>
			</>
		),
		video: 'CT_AI_edit_v1_pggwtw',
		images: ['/images/yearn.png', '/images/yearn.png', '/images/yearn.png', '/images/yearn.png'],
		projectLink: 'https://x.com/built_by_mom'
	}
};
