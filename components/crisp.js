"use client"

import { useEffect } from "react";
import { Crisp } from "crisp-sdk-web";

const CrispChat = () => {
  useEffect(() => {
    Crisp.configure("a71c92a3-8a4d-4e8b-9773-e2c2e1a5e041");
  });

  return null;
}

export default CrispChat;