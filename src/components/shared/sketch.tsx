import type React from "react";

export const SketchyHorizontalLine = ({
  className = "",
  width = "100%",
  height = "4",
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 4"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M0,2 Q10,1.5 20,2 T40,1.8 T60,2.2 T80,1.9 T100,2.1 T120,1.8 T140,2.2 T160,1.9 T180,2.1 L200,2"
      stroke="currentColor"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

export const SketchyVerticalLine = ({
  className = "",
  width = "4",
  height = "100%",
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 4 200"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M2,0 Q1.5,10 2,20 T1.8,40 T2.2,60 T1.9,80 T2.1,100 T1.8,120 T2.2,140 T1.9,160 T2.1,180 L2,200"
      stroke="currentColor"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

export const SketchyCornerBracket = ({
  className = "",
  size = 20,
  corner = "top-left" as "top-left" | "top-right" | "bottom-left" | "bottom-right",
}: {
  className?: string;
  size?: number;
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}) => {
  const getPath = () => {
    switch (corner) {
      case "top-left":
        return "M18,2 Q16,1.8 14,2 T10,1.9 T6,2.1 T2,1.8 Q1.8,4 2,6 T1.9,10 T2.1,14 T1.8,18";
      case "top-right":
        return "M2,2 Q4,1.8 6,2 T10,1.9 T14,2.1 T18,1.8 Q18.2,4 18,6 T18.1,10 T17.9,14 T18.2,18";
      case "bottom-left":
        return "M2,18 Q1.8,16 2,14 T1.9,10 T2.1,6 T1.8,2 Q4,1.8 6,2 T10,1.9 T14,2.1 T18,1.8";
      case "bottom-right":
        return "M18,18 Q18.2,16 18,14 T18.1,10 T17.9,6 T18.2,2 Q16,1.8 14,2 T10,1.9 T6,2.1 T2,1.8";
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 20 20" className={className}>
      <path
        d={getPath()}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
};

export const SketchyDashedLine = ({
  className = "",
  width = "100%",
  height = "4",
  direction = "horizontal" as "horizontal" | "vertical",
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
  direction?: "horizontal" | "vertical";
}) => {
  if (direction === "vertical") {
    return (
      <svg
        width={width}
        height={height}
        viewBox="0 0 4 200"
        className={className}
        preserveAspectRatio="none"
      >
        <g
          stroke="currentColor"
          strokeWidth="0.8"
          fill="none"
          strokeLinecap="round"
          opacity="0.7"
        >
          <path d="M2,0 Q1.8,3 2,6" />
          <path d="M2,12 Q2.2,15 2,18" />
          <path d="M2,24 Q1.9,27 2,30" />
          <path d="M2,36 Q2.1,39 2,42" />
          <path d="M2,48 Q1.8,51 2,54" />
          <path d="M2,60 Q2.2,63 2,66" />
          <path d="M2,72 Q1.9,75 2,78" />
          <path d="M2,84 Q2.1,87 2,90" />
          <path d="M2,96 Q1.8,99 2,102" />
          <path d="M2,108 Q2.2,111 2,114" />
          <path d="M2,120 Q1.9,123 2,126" />
          <path d="M2,132 Q2.1,135 2,138" />
          <path d="M2,144 Q1.8,147 2,150" />
          <path d="M2,156 Q2.2,159 2,162" />
          <path d="M2,168 Q1.9,171 2,174" />
          <path d="M2,180 Q2.1,183 2,186" />
          <path d="M2,192 Q1.8,195 2,198" />
        </g>
      </svg>
    );
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 200 4"
      className={className}
      preserveAspectRatio="none"
    >
      <g
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      >
        <path d="M0,2 Q3,1.8 6,2" />
        <path d="M12,2 Q15,2.2 18,2" />
        <path d="M24,2 Q27,1.9 30,2" />
        <path d="M36,2 Q39,2.1 42,2" />
        <path d="M48,2 Q51,1.8 54,2" />
        <path d="M60,2 Q63,2.2 66,2" />
        <path d="M72,2 Q75,1.9 78,2" />
        <path d="M84,2 Q87,2.1 90,2" />
        <path d="M96,2 Q99,1.8 102,2" />
        <path d="M108,2 Q111,2.2 114,2" />
        <path d="M120,2 Q123,1.9 126,2" />
        <path d="M132,2 Q135,2.1 138,2" />
        <path d="M144,2 Q147,1.8 150,2" />
        <path d="M156,2 Q159,2.2 162,2" />
        <path d="M168,2 Q171,1.9 174,2" />
        <path d="M180,2 Q183,2.1 186,2" />
        <path d="M192,2 Q195,1.8 198,2" />
      </g>
    </svg>
  );
};

export const SketchyWavyLine = ({
  className = "",
  width = "100%",
  height = "8",
}: {
  className?: string;
  width?: string | number;
  height?: string | number;
}) => (
  <svg
    width={width}
    height={height}
    viewBox="0 0 200 8"
    className={className}
    preserveAspectRatio="none"
  >
    <path
      d="M0,4 Q5,1.5 10,4 T20,4.2 Q25,6.8 30,4 T40,3.9 Q45,1.2 50,4 T60,4.1 Q65,6.9 70,4 T80,3.8 Q85,1.1 90,4 T100,4.2 Q105,6.7 110,4 T120,3.9 Q125,1.3 130,4 T140,4.1 Q145,6.8 150,4 T160,3.8 Q165,1.2 170,4 T180,4.2 Q185,6.9 190,4 T200,4"
      stroke="currentColor"
      strokeWidth="0.8"
      fill="none"
      strokeLinecap="round"
      opacity="0.7"
    />
  </svg>
);

export const SketchyArrow = ({
  className = "",
  direction = "right" as "right" | "left" | "up" | "down",
  size = 24,
}: {
  className?: string;
  direction?: "right" | "left" | "up" | "down";
  size?: number;
}) => {
  const getPath = () => {
    switch (direction) {
      case "right":
        return "M2,12 Q6,11.8 10,12 T18,11.9 Q19.2,11.8 20,12 Q19.8,11.2 19,10 Q18.2,9.8 17,10 M20,12 Q19.8,12.8 19,14 Q18.2,14.2 17,14";
      case "left":
        return "M22,12 Q18,11.8 14,12 T6,11.9 Q4.8,11.8 4,12 Q4.2,11.2 5,10 Q5.8,9.8 7,10 M4,12 Q4.2,12.8 5,14 Q5.8,14.2 7,14";
      case "up":
        return "M12,22 Q11.8,18 12,14 T11.9,6 Q11.8,4.8 12,4 Q11.2,4.2 10,5 Q9.8,5.8 10,7 M12,4 Q12.8,4.2 14,5 Q14.2,5.8 14,7";
      case "down":
        return "M12,2 Q11.8,6 12,10 T11.9,18 Q11.8,19.2 12,20 Q11.2,19.8 10,19 Q9.8,18.2 10,17 M12,20 Q12.8,19.8 14,19 Q14.2,18.2 14,17";
    }
  };

  return (
    <svg width={size} height={size} viewBox="0 0 24 24" className={className}>
      <path
        d={getPath()}
        stroke="currentColor"
        strokeWidth="0.8"
        fill="none"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
};

export const SketchyBorder = ({
  children,
  className = "",
  variant = "rectangle" as "rectangle" | "rounded",
}: {
  children: React.ReactNode;
  className?: string;
  variant?: "rectangle" | "rounded";
}) => (
  <div className={`relative ${className}`}>
    {children}
    <div className="absolute inset-0 pointer-events-none">
      <svg
        width="100%"
        height="100%"
        className="absolute inset-0"
        preserveAspectRatio="none"
      >
        {variant === "rounded" ? (
          <path
            d="M8,1 Q6,0.8 4,1 T1,0.9 Q0.8,2 1,4 T0.9,8 L0.9,calc(100%-8) Q0.8,calc(100%-6) 1,calc(100%-4) T0.9,calc(100%-1) Q2,calc(100%-0.8) 4,calc(100%-1) T8,calc(100%-0.9) L calc(100%-8),calc(100%-0.9) Q calc(100%-6),calc(100%-0.8) calc(100%-4),calc(100%-1) T calc(100%-1),calc(100%-0.9) Q calc(100%-0.8),calc(100%-2) calc(100%-1),calc(100%-4) T calc(100%-0.9),calc(100%-8) L calc(100%-0.9),8 Q calc(100%-0.8),6 calc(100%-1),4 T calc(100%-0.9),1 Q calc(100%-2),0.8 calc(100%-4),1 T calc(100%-8),0.9 Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        ) : (
          <path
            d="M0,1 Q2,0.8 4,1 T8,0.9 L calc(100%-8),0.9 Q calc(100%-6),0.8 calc(100%-4),1 T calc(100%-1),0.9 Q calc(100%-0.8),2 calc(100%-1),4 T calc(100%-0.9),8 L calc(100%-0.9),calc(100%-8) Q calc(100%-0.8),calc(100%-6) calc(100%-1),calc(100%-4) T calc(100%-0.9),calc(100%-1) Q calc(100%-2),calc(100%-0.8) calc(100%-4),calc(100%-1) T calc(100%-8),calc(100%-0.9) L 8,calc(100%-0.9) Q 6,calc(100%-0.8) 4,calc(100%-1) T 1,calc(100%-0.9) Q 0.8,calc(100%-2) 1,calc(100%-4) T 0.9,calc(100%-8) Z"
            stroke="currentColor"
            strokeWidth="0.8"
            fill="none"
            strokeLinecap="round"
            opacity="0.7"
          />
        )}
      </svg>
    </div>
  </div>
);
