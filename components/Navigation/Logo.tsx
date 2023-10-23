"use client";

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

type IProps = {
   width?: number;
   height?: number;
};

const Logo: React.FC<IProps> = (props) => {
   const { width = 100, height = 50 } = props;

   const { resolvedTheme } = useTheme();

   let src;

   switch (resolvedTheme) {
      case "light":
         src = "/logo-light.svg";
         break;
      case "dark":
         src = "/logo-dark.svg";
         break;
      default:
         src = "/logo-light.svg";
         break;
   }

   return <Image src={src} width={width} height={height} alt="logo" />;
};

export default Logo;
