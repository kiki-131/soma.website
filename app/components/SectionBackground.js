"use client";
import { useEffect } from "react";

export default function SectionBackground() {
  useEffect(() => {
    const sections = document.querySelectorAll("[data-bg]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            document.body.style.transition = "background-color 0.8s ease";
            document.body.style.backgroundColor = entry.target.dataset.bg;
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return null;
}
