import dynamic from 'next/dynamic'
const Tldraw = dynamic(async () => (await import('tldraw')).Tldraw, { ssr: false })

export default function Draw() {
	return (
			<div style={{ position: 'relative', height: '100%', width: '100%' }}>
				<Tldraw />
			</div>
	)
}
