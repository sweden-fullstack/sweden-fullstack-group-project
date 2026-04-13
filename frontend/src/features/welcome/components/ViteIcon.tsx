import viteLogo from "@/assets/vite.svg"

export function ViteIcon() {
	return (
		<img
			src={viteLogo}
			alt="vite"
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				margin: "0 auto",
				zIndex: 0,
				top: "107px",
				height: "26px",
				width: "auto",
				transform:
					"perspective(2000px) rotateZ(300deg) rotateX(40deg) rotateY(39deg) scale(0.8)",
			}}
		/>
	)
}
