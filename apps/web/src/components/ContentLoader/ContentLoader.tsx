import React from "react";

export default function ContentLoader(props: React.SVGProps<SVGElement>) {
  return (
    <svg className={props.className}>
      <defs>
        <linearGradient id="myGradient" gradientTransform="rotate(20)">
          <stop offset="5%" stopColor="#aaa">
            <animate
              attributeName="stop-color"
              values="#EEEEEE; #CCCCCC; #EEEEEE"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="95%" stopColor="#aaa">
            <animate
              attributeName="stop-color"
              values="#EEEEEE; #DDDDDD; #EEEEEE"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `\n svg {\n \n      }\n\n rect {\n   width: 100%;\n height: 100%;\n x: 0;\n y: 0;\n      }\n      `,
        }}
      />
      <rect fill="url(#myGradient)" width="100%" height="100%" />
    </svg>
  );
}

export function CircularLoader(props: React.SVGProps<SVGElement>) {
  return (
    <svg className={`${props.className} cirular-gradient`}>
      <defs>
        <linearGradient id="circleGradient" gradientTransform="rotate(20)">
          <stop offset="5%" stopColor="#aaa">
            <animate
              attributeName="stop-color"
              values="#EEEEEE; #CCCCCC; #EEEEEE"
              dur="2s"
              repeatCount="indefinite"
            />
          </stop>
          <stop offset="95%" stopColor="#aaa">
            <animate
              attributeName="stop-color"
              values="#EEEEEE; #CCCCCC; #EEEEEE"
              dur="3s"
              repeatCount="indefinite"
            />
          </stop>
        </linearGradient>
      </defs>
      <style
        dangerouslySetInnerHTML={{
          __html: `\n .circular-gradient {\n   width: 100%;\n    height: 100%;   }\n\n circle {\n   r: 50%;\n cx: 50%;\n cy: 50%;\n      }\n      `,
        }}
      />
      <circle fill="url(#circleGradient)" width="100%" height="100%" />
    </svg>
  );
}
