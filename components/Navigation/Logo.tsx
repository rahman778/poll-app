"use client"

import React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";

type IProps = {
   width?: number;
   height?: number;
};

const Logo: React.FC<IProps> = (props) => {
   const { width = 100, height = 50 } = props;
   
   const { theme } = useTheme();

   return (
      <Image
         src={theme === "light" ? "/logo-light.svg" : "/logo-dark.svg"}
         width={width}
         height={height}
         alt="logo"
      />
   );
};

export default Logo;
