import reactLogo from "@/assets/react.svg"

export default function ReactIcon() {
	return (
		<img
			src={reactLogo}
			alt="Framework Logo"
			style={{
				position: "absolute",
				insetInlineStart: 0,
				left: 0,
				right: 0,
				margin: "0 auto",
				zIndex: 1,
				top: "34px",
				height: "28px",
				width: "auto",
				display: "block",
				transform:
					"perspective(2000px) rotateZ(300deg) rotateX(44deg) rotateY(39deg) scale(1.4)",
			}}
		/>
	)
}
