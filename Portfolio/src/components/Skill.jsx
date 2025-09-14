import React, { useState, useEffect } from "react";
import styled from "styled-components";
import IconHTML from "../assets/skills/html.svg";
import IconCSS from "../assets/skills/css.svg";
import IconJS from "../assets/skills/js.svg";
import IconReact from "../assets/skills/react.svg";
import IconRQ from "../assets/skills/query.svg";
import IconVite from "../assets/skills/vite.svg";
import IconTailwind from "../assets/skills/tailwind.svg";
import IconVercel from "../assets/skills/vercel.svg";
import IconZustand from "../assets/skills/react.svg";
import IconFigma from "../assets/skills/figma.svg";
import IconPs from "../assets/skills/photoshop.svg";
import IconAi from "../assets/skills/illustrator.svg";

const Section = styled.section`
  scroll-margin-top: 80px;
  padding: 72px 20px;
  background: #f9fafb;
  color: #111111;
`;

const Wrap = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const H2 = styled.h2`
  margin: 0 0 16px;
  font-size: clamp(24px, 4vw, 32px);
  font-weight: 900;
`;

const Lead = styled.p`
  margin: 0 0 12px;
  color: #555555;
  line-height: 1.6;
`;

const Group = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 18px;
  align-items: start;
  padding: 18px 0;
  border-top: 1px solid #eeeeee;
  &:last-of-type { border-bottom: 1px solid #eeeeee; }
`;

const GroupTitle = styled.h3`
  margin: 0;
  font-size: 18px;
  font-weight: 800;
  color: #222222;
`;

const BadgeGrid = styled.ul`
  list-style: none;
  padding: 0; margin: 0;
  display: flex; flex-wrap: wrap;
  gap: 10px;
`;

const Badge = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #fff;
  font-weight: 700;
  font-size: 14px;
  color: #222222;
  box-shadow: 0 4px 12px rgba(0,0,0,.04);

  opacity: ${p => (p.$visible ? 1 : 0)};
  transform: translateY(${p => (p.$visible ? "0" : "20px")});
  transition: all 0.6s ease;
`;

const BadgeIcon = styled.img`
  width: 18px;
  height: 18px;
  object-fit: contain;
  display: inline-block;
`;

const Dot = styled.span`
  width: 6px; height: 6px; border-radius: 999px;
  background: ${p => p.$level === "high" ? "#10b981" : p.$level === "mid"  ? "#f59e0b" : "#9ca3af"};
`;

const Sub = styled.span`
  font-weight: 600;
  color: #666666;
  font-size: 12px;
`;

const skills = {
  frontend: [
    { name: "HTML",        level: "high", icon: IconHTML },
    { name: "CSS",         level: "mid",  icon: IconCSS },
    { name: "JavaScript",  level: "mid",  icon: IconJS },
    { name: "React.js",    level: "mid",  icon: IconReact },
    { name: "React Query", level: "low",  icon: IconRQ },
    { name: "Vite",        level: "mid",  icon: IconVite },
    { name: "Tailwind CSS",level: "low",  icon: IconTailwind },
    { name: "Vercel",      level: "mid",  icon: IconVercel },
    { name: "Zustand",     level: "mid",  icon: IconZustand },
  ],
  design: [
    { name: "Figma",       level: "mid", icon: IconFigma },
    { name: "Photoshop",   level: "mid",  icon: IconPs },
    { name: "Illustrator", level: "mid",  icon: IconAi },
  ],
};

const Legend = styled.div`
  display: flex;
  gap: 14px;
  align-items: center;
  flex-wrap: wrap;
  margin: 0 0 28px;
  color: #666666;
  font-size: 12px;
`;

const LegendItem = ({ label, level }) => (
  <span style={{display:"inline-flex", alignItems:"center", gap:6}}>
    <Dot $level={level} /> {label}
  </span>
);

export default function Skill() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const section = document.getElementById("skill");
      if (!section)
        return;
      const { top } = section.getBoundingClientRect();
      if (top < window.innerHeight - 100)
        setVisible(true);
    };
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const levelText = l => (l === "high" ? "상" : l === "mid" ? "중" : "입문");

  return (
    <Section id="skill" aria-label="Skill set">
      <Wrap>
        <H2>SKILLS</H2>
        <Lead>주요 기술 스택과 도구입니다</Lead>

        <Legend>
          <LegendItem label="상" level="high" />
          <LegendItem label="중" level="mid" />
          <LegendItem label="입문" level="low" />
        </Legend>

        <Group>
          <GroupTitle>Frontend</GroupTitle>
          <div>
            <BadgeGrid>
              {skills.frontend.map(s => (
                <Badge key={s.name} $visible={visible}>
                  <BadgeIcon src={s.icon} alt={`${s.name} 아이콘`} loading="lazy" />
                  {s.name}
                  <Sub>•</Sub>
                  <Dot $level={s.level} aria-hidden />
                  <Sub>{levelText(s.level)}</Sub>
                </Badge>
              ))}
            </BadgeGrid>
          </div>
        </Group>

        <Group>
          <GroupTitle>Design</GroupTitle>
          <BadgeGrid>
            {skills.design.map(s => (
              <Badge key={s.name} $visible={visible}>
                <BadgeIcon src={s.icon} alt={`${s.name} 아이콘`} loading="lazy" />
                {s.name}
                <Sub>•</Sub>
                <Dot $level={s.level} aria-hidden />
                <Sub>{levelText(s.level)}</Sub>
              </Badge>
            ))}
          </BadgeGrid>
        </Group>
      </Wrap>
    </Section>
  );
}